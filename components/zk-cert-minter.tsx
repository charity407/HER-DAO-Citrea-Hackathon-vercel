"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCitrea } from "@/hooks/use-citrea"
import { type ZkCertData, formatZkProofHash, generateCertificateMetadata } from "@/lib/citrea-sdk"
import { storeZkCertificate } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { Award, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink, Sparkles } from "lucide-react"

interface ZkCertMinterProps {
  moduleData: {
    id: string
    title: string
    objective: string
    zkCert: string
    track: string
  }
  quizScore: number
  userId: string
  onMintComplete?: (result: any) => void
  isOpen: boolean
  onClose: () => void
}

export function ZkCertMinter({ moduleData, quizScore, userId, onMintComplete, isOpen, onClose }: ZkCertMinterProps) {
  const [mintingStep, setMintingStep] = useState<"idle" | "generating" | "minting" | "completed" | "error">("idle")
  const [mintResult, setMintResult] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  const { mintCertificate, isLoading, error, clearError } = useCitrea()
  const { user } = useAuth()

  const handleMintCertificate = async () => {
    try {
      clearError()
      setMintingStep("generating")
      setProgress(20)

      // Prepare certificate data
      const certData: ZkCertData = {
        moduleId: moduleData.id,
        userId: userId,
        completionDate: new Date().toISOString(),
        quizScore: quizScore,
        skillsProven: getSkillsForModule(moduleData.id),
        courseTrack: moduleData.track,
        walletAddress: user?.wallet_address,
      }

      // Generate certificate metadata
      const metadata = generateCertificateMetadata(certData, moduleData)

      setProgress(40)
      setMintingStep("minting")

      // Mint the certificate
      const result = await mintCertificate(certData)

      if (result.success) {
        setProgress(100)
        setMintingStep("completed")
        setMintResult({
          ...result,
          metadata,
          certData,
        })

        // Store certificate in database
        try {
          await storeZkCertificate({
            user_id: userId,
            module_id: moduleData.id,
            certificate_name: moduleData.zkCert,
            zk_proof_hash: result.zkProofHash!,
            tx_hash: result.txHash!,
            ipfs_hash: result.ipfsHash,
            minted_at: new Date().toISOString(),
            verified: true,
          })
        } catch (dbError) {
          console.error("Failed to store certificate in database:", dbError)
          // Continue anyway - the certificate was minted successfully
        }

        onMintComplete?.(result)
      } else {
        setMintingStep("error")
        setMintResult({ error: result.error })
      }
    } catch (err) {
      setMintingStep("error")
      setMintResult({ error: err instanceof Error ? err.message : "Unknown error" })
    }
  }

  const getSkillsForModule = (moduleId: string): string[] => {
    const skillsMap: Record<string, string[]> = {
      "module-1": ["Bitcoin History", "Decentralization", "Digital Scarcity"],
      "module-2": ["Private Keys", "Seed Phrases", "Hardware Wallets"],
      "module-3": ["Scam Detection", "Security Practices", "Risk Management"],
      "module-4": ["Transaction Structure", "Address Types", "Fee Estimation"],
      "module-5": ["UTXO Model", "Transaction Inputs/Outputs", "Cryptographic Conditions"],
      "module-6": ["Lightning Network", "Payment Channels", "Privacy Techniques"],
      "module-7": ["Fee Estimation", "Mempool Analysis", "Transaction Priority"],
      "module-8": ["Bitcoin Script", "PSBT", "Multi-signature"],
      "module-9": ["Wallet Architecture", "API Integration", "Key Management"],
      "module-10": ["ZK Rollups", "STARKs", "Layer 2 Scaling"],
      "module-11": ["zkApps", "Zero-Knowledge Proofs", "Micropayments"],
    }
    return skillsMap[moduleId] || ["Bitcoin Knowledge"]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getMintingStepInfo = () => {
    switch (mintingStep) {
      case "generating":
        return {
          title: "Generating ZK Proof",
          description: "Creating zero-knowledge proof of your course completion...",
          icon: <Loader2 className="h-6 w-6 animate-spin text-blue-400" />,
        }
      case "minting":
        return {
          title: "Minting Certificate",
          description: "Submitting your zkCert to Citrea network...",
          icon: <Loader2 className="h-6 w-6 animate-spin text-purple-400" />,
        }
      case "completed":
        return {
          title: "Certificate Minted!",
          description: "Your zkCert has been successfully created and verified.",
          icon: <CheckCircle className="h-6 w-6 text-green-400" />,
        }
      case "error":
        return {
          title: "Minting Failed",
          description: "There was an error minting your certificate.",
          icon: <AlertCircle className="h-6 w-6 text-red-400" />,
        }
      default:
        return {
          title: "Ready to Mint",
          description: "Generate your verifiable zkCertificate on Citrea.",
          icon: <Award className="h-6 w-6 text-orange-400" />,
        }
    }
  }

  const stepInfo = getMintingStepInfo()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-purple-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-400" />
            Mint zkCertificate
          </DialogTitle>
          <DialogDescription className="text-purple-200">
            Create a verifiable zero-knowledge certificate for completing {moduleData.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Preview */}
          <Card className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 border-orange-400/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{moduleData.zkCert}</CardTitle>
                    <CardDescription className="text-orange-200">{moduleData.title}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white">{moduleData.track}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-orange-200">Quiz Score:</span>
                  <span className="text-white font-medium">{quizScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-200">Skills Proven:</span>
                  <span className="text-white font-medium">{getSkillsForModule(moduleData.id).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-200">Completion Date:</span>
                  <span className="text-white font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minting Status */}
          <Card className="bg-black/30 border-purple-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {stepInfo.icon}
                {stepInfo.title}
              </CardTitle>
              <CardDescription className="text-purple-200">{stepInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mintingStep !== "idle" && mintingStep !== "error" && <Progress value={progress} className="h-2" />}

              {error && (
                <Alert className="bg-red-500/10 border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              {mintResult?.error && (
                <Alert className="bg-red-500/10 border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">{mintResult.error}</AlertDescription>
                </Alert>
              )}

              {mintingStep === "completed" && mintResult && (
                <div className="space-y-4">
                  <Alert className="bg-green-500/10 border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-200">
                      <strong>Success!</strong> Your zkCertificate has been minted and verified on Citrea.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div>
                      <label className="text-purple-300 text-sm font-medium">Certificate ID:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-black/30 rounded text-green-400 text-xs font-mono">
                          {mintResult.certificateId}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(mintResult.certificateId)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-300 text-sm font-medium">ZK Proof Hash:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-black/30 rounded text-pink-400 text-xs font-mono">
                          {formatZkProofHash(mintResult.zkProofHash)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(mintResult.zkProofHash)}
                          className="text-pink-400 hover:text-pink-300"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-300 text-sm font-medium">Transaction Hash:</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-black/30 rounded text-blue-400 text-xs font-mono">
                          {formatZkProofHash(mintResult.txHash)}
                        </code>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {mintingStep === "idle" && (
                  <Button
                    onClick={handleMintCertificate}
                    disabled={isLoading}
                    className="flex-1 bg-pink-500 hover:bg-pink-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      <>
                        <Award className="mr-2 h-4 w-4" />
                        Mint zkCertificate
                      </>
                    )}
                  </Button>
                )}

                {mintingStep === "completed" && (
                  <>
                    <Button onClick={onClose} className="flex-1 bg-green-500 hover:bg-green-600">
                      View Certificate
                    </Button>
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                      Share Achievement
                    </Button>
                  </>
                )}

                {mintingStep === "error" && (
                  <Button
                    onClick={() => {
                      setMintingStep("idle")
                      setProgress(0)
                      clearError()
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Try Again
                  </Button>
                )}

                <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  {mintingStep === "completed" ? "Close" : "Cancel"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
