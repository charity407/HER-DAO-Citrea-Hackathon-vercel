"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sidebar } from "@/components/sidebar"
import { Award, Download, ExternalLink, Star, Shield, Zap, Loader2 } from "lucide-react"
import { downloadCertificateMetadata } from "@/lib/certificate-storage"
import { useCitrea } from "@/hooks/use-citrea"

export function ZkCertViewer() {
  const [selectedCert, setSelectedCert] = useState(null)
  const { verifyCertificate } = useCitrea()
  const [verifyingCerts, setVerifyingCerts] = useState<Set<number>>(new Set())

  const zkCerts = [
    {
      id: 1,
      name: "Bitcoin Origins Scholar",
      track: "Beginner",
      completionDate: "2024-01-15",
      zkProofHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      txHash: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      description: "Mastered the fundamentals of Bitcoin's creation and philosophy",
      skills: ["Bitcoin History", "Decentralization", "Digital Scarcity"],
      color: "from-green-500 to-emerald-700",
      hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      id: 2,
      name: "Wallet Guardian",
      track: "Beginner",
      completionDate: "2024-01-20",
      zkProofHash: "0x2b3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef",
      txHash: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      description: "Expert in Bitcoin wallet security and custody practices",
      skills: ["Private Keys", "Seed Phrases", "Hardware Wallets"],
      color: "from-blue-500 to-cyan-700",
      hash: "0x2b3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      id: 3,
      name: "Bitcoin Safety Advocate",
      track: "Beginner",
      completionDate: "2024-01-25",
      zkProofHash: "0x3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef12",
      txHash: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      description: "Skilled in identifying and avoiding cryptocurrency scams",
      skills: ["Scam Detection", "Security Practices", "Risk Management"],
      color: "from-red-500 to-pink-700",
      hash: "0x3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef12",
    },
  ]

  const handleVerifyCertificate = async (cert: any, index: number) => {
    setVerifyingCerts((prev) => new Set(prev).add(index))

    try {
      const isValid = await verifyCertificate(cert.id.toString(), cert.zkProofHash)
      console.log(`Certificate ${cert.id} verification:`, isValid)
    } catch (error) {
      console.error("Verification failed:", error)
    } finally {
      setVerifyingCerts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Your zkCertificates</h1>
              <p className="text-purple-200">Verifiable achievements powered by zero-knowledge proofs</p>
            </div>

            {/* Stats - Enhanced text contrast and responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              <Card className="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 border-2 border-orange-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">Total zkCerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold text-white">{zkCerts.length}</div>
                  <p className="text-purple-800 text-xs">Verified on Bitcoin</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">Tracks Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold text-white">1</div>
                  <p className="text-purple-800 text-xs">Beginner Track</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm font-medium">Skills Mastered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl lg:text-2xl font-bold text-white">9</div>
                  <p className="text-purple-800 text-xs">Unique competencies</p>
                </CardContent>
              </Card>
            </div>

            {/* zkCerts Grid - Enhanced contrast and responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {zkCerts.map((cert, index) => (
                <Card
                  key={cert.id}
                  className={`bg-gradient-to-br ${cert.color}/20 border-2 border-transparent hover:border-pink-400/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center`}
                      >
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-pink-600 text-white border-pink-400">{cert.track}</Badge>
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-pink-300 transition-colors">
                      {cert.name}
                    </CardTitle>
                    <CardDescription className="text-white/90">{cert.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-white/80 text-xs mb-2">Skills Demonstrated:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-purple-300 text-purple-100 bg-purple-900/30 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-300" />
                        <span className="text-green-300 text-xs font-medium">zkVerified</span>
                      </div>
                      <p className="text-white/80 text-xs">
                        Completed: {new Date(cert.completionDate).toLocaleDateString()}
                      </p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">View Certificate</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-2 border-purple-400/50 max-w-2xl backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle className="text-white flex items-center gap-2">
                            <div
                              className={`w-8 h-8 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center`}
                            >
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            {cert.name}
                          </DialogTitle>
                          <DialogDescription className="text-purple-100">
                            Zero-knowledge certificate details and verification
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Certificate Preview */}
                          <div
                            className={`p-6 bg-gradient-to-br ${cert.color}/30 rounded-lg border-2 border-purple-400/50`}
                          >
                            <div className="text-center space-y-4">
                              <div
                                className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center mx-auto`}
                              >
                                <Star className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-xl">{cert.name}</h3>
                                <p className="text-purple-100">{cert.description}</p>
                              </div>
                              <Badge className="bg-green-600 text-white border-green-400">
                                <Shield className="mr-1 h-3 w-3" />
                                zkVerified on Bitcoin
                              </Badge>
                            </div>
                          </div>

                          {/* Technical Details */}
                          <div className="space-y-4">
                            <div>
                              <label className="text-purple-200 text-sm font-medium">zkProof Hash:</label>
                              <div className="bg-black/50 p-3 rounded-lg mt-1 border border-purple-400/30">
                                <code className="text-pink-300 text-xs font-mono break-all">{cert.zkProofHash}</code>
                              </div>
                            </div>

                            <div>
                              <label className="text-purple-200 text-sm font-medium">Bitcoin Transaction:</label>
                              <div className="bg-black/50 p-3 rounded-lg mt-1 flex items-center justify-between border border-purple-400/30">
                                <code className="text-green-300 text-xs font-mono">{cert.txHash}</code>
                                <Button size="sm" variant="ghost" className="text-green-300 hover:text-green-200">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3">
                            <Button
                              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                              onClick={() =>
                                downloadCertificateMetadata({
                                  id: cert.id.toString(),
                                  userId: "user_123",
                                  moduleId: `module-${cert.id}`,
                                  zkProofHash: cert.hash,
                                  txHash: cert.hash,
                                  metadata: {
                                    name: cert.name,
                                    description: cert.description,
                                    image: "",
                                    attributes: cert.skills.map((skill) => ({ trait_type: "Skill", value: skill })),
                                    external_url: "",
                                  },
                                  mintedAt: new Date().toISOString(),
                                  verified: true,
                                })
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </Button>
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => handleVerifyCertificate(cert, index)}
                              disabled={verifyingCerts.has(index)}
                            >
                              {verifyingCerts.has(index) ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Verifying...
                                </>
                              ) : (
                                <>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Verify on Citrea
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coming Soon - Enhanced contrast */}
            <Card className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-400/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-pink-300 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">More zkCerts Coming Soon!</h3>
                <p className="text-purple-100 mb-4">Continue your learning journey to unlock advanced certificates</p>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">Continue Learning</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
