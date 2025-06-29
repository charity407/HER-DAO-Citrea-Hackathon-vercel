"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sidebar } from "@/components/sidebar"
import { BracketsIcon as Bridge, ArrowRight, CheckCircle, Clock, AlertTriangle, ExternalLink, Info } from "lucide-react"

export function BridgeUI() {
  const [bridgeAmount, setBridgeAmount] = useState("")
  const [bridgeStatus, setBridgeStatus] = useState("idle") // idle, pending, step1, step2, completed
  const [txHash, setTxHash] = useState("")

  const handleBridge = () => {
    setBridgeStatus("step1")
    setTxHash("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")

    // Simulate bridge process
    setTimeout(() => setBridgeStatus("step2"), 3000)
    setTimeout(() => setBridgeStatus("completed"), 8000)
  }

  const getBridgeStepStatus = (step: number) => {
    if (bridgeStatus === "idle") return "pending"
    if (step === 1 && ["step1", "step2", "completed"].includes(bridgeStatus)) return "completed"
    if (step === 2 && bridgeStatus === "step1") return "current"
    if (step === 2 && ["step2", "completed"].includes(bridgeStatus)) return "completed"
    if (step === 3 && bridgeStatus === "step2") return "current"
    if (step === 3 && bridgeStatus === "completed") return "completed"
    return "pending"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Bridge BTC to Citrea</h1>
              <p className="text-purple-200 text-sm md:text-base">Bridge your Bitcoin to Citrea's ZK-Rollup using Clementine</p>
            </div>

            {/* Testnet Warning */}
            <Alert className="mb-6 md:mb-8 bg-yellow-500/10 border-yellow-500/30">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-200">
                <strong>Testnet Only:</strong> This bridge is currently running on Bitcoin testnet. Use testnet BTC
                only. Get testnet coins from the{" "}
                <a href="#" className="text-yellow-400 hover:underline">
                  faucet
                </a>
                .
              </AlertDescription>
            </Alert>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Bridge Form */}
              <Card className="bg-black/30 border-purple-700">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <Bridge className="h-5 w-5 text-pink-400" />
                    Bridge to Citrea
                  </CardTitle>
                  <CardDescription className="text-purple-200 text-sm">
                    Convert BTC to cBTC on Citrea's ZK-Rollup
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                  {/* From Section */}
                  <div className="space-y-3">
                    <Label className="text-white text-sm">From: Bitcoin Network</Label>
                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-400/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">₿</span>
                          </div>
                          <span className="text-white font-medium text-sm">Bitcoin</span>
                        </div>
                        <Badge className="bg-orange-500 text-white text-xs">Mainnet</Badge>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-white text-sm">
                          Amount
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.001"
                          value={bridgeAmount}
                          onChange={(e) => setBridgeAmount(e.target.value)}
                          className="bg-black/30 border-orange-400/30 text-white placeholder:text-orange-300 text-sm"
                        />
                        <p className="text-white text-xs font-medium">Available: 0.00125 BTC</p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-pink-400" />
                    </div>
                  </div>

                  {/* To Section */}
                  <div className="space-y-3">
                    <Label className="text-white text-sm">To: Citrea Network</Label>
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                          </div>
                          <span className="text-white font-medium text-sm">Citrea</span>
                        </div>
                        <Badge className="bg-purple-500 text-white text-xs">ZK-Rollup</Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white text-sm">You will receive</Label>
                        <div className="p-3 bg-black/30 rounded border border-purple-400/30">
                          <span className="text-white font-mono text-sm">
                            {bridgeAmount ? `${bridgeAmount} cBTC` : "0.000 cBTC"}
                          </span>
                        </div>
                        <p className="text-white text-xs font-medium">1:1 conversion ratio</p>
                      </div>
                    </div>
                  </div>

                  {/* Bridge Button */}
                  <Button
                    onClick={handleBridge}
                    disabled={!bridgeAmount || bridgeStatus !== "idle"}
                    className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50"
                  >
                    {bridgeStatus === "idle" ? "Bridge to Citrea" : "Bridging..."}
                  </Button>

                  {/* Fee Info */}
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-white font-medium">Bridge Fees:</p>
                        <p className="text-white">• Bitcoin network fee: ~1000 sats</p>
                        <p className="text-white">• Citrea bridge fee: 0.1%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bridge Status */}
              <Card className="bg-black/30 border-purple-700">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white text-lg md:text-xl">Bridge Status</CardTitle>
                  <CardDescription className="text-purple-200 text-sm">Track your bridge transaction progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                  {bridgeStatus === "idle" ? (
                    <div className="text-center py-8">
                      <Bridge className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      <p className="text-purple-200 text-sm">Enter an amount to start bridging</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Progress Steps */}
                      <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              getBridgeStepStatus(1) === "completed"
                                ? "bg-green-500"
                                : getBridgeStepStatus(1) === "current"
                                  ? "bg-orange-500"
                                  : "bg-gray-600"
                            }`}
                          >
                            {getBridgeStepStatus(1) === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <span className="text-white text-sm">1</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">BTC Transaction Sent</p>
                            <p className="text-purple-300 text-xs">
                              {getBridgeStepStatus(1) === "completed"
                                ? "Transaction confirmed on Bitcoin network"
                                : "Waiting for Bitcoin transaction..."}
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              getBridgeStepStatus(2) === "completed"
                                ? "bg-green-500"
                                : getBridgeStepStatus(2) === "current"
                                  ? "bg-orange-500"
                                  : "bg-gray-600"
                            }`}
                          >
                            {getBridgeStepStatus(2) === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : getBridgeStepStatus(2) === "current" ? (
                              <Clock className="h-4 w-4 text-white animate-spin" />
                            ) : (
                              <span className="text-white text-sm">2</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">Processing on Citrea</p>
                            <p className="text-purple-300 text-xs">
                              {getBridgeStepStatus(2) === "completed"
                                ? "ZK proof generated and verified"
                                : getBridgeStepStatus(2) === "current"
                                  ? "Generating zero-knowledge proof..."
                                  : "Waiting for Bitcoin confirmation..."}
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              getBridgeStepStatus(3) === "completed"
                                ? "bg-green-500"
                                : getBridgeStepStatus(3) === "current"
                                  ? "bg-orange-500"
                                  : "bg-gray-600"
                            }`}
                          >
                            {getBridgeStepStatus(3) === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : getBridgeStepStatus(3) === "current" ? (
                              <Clock className="h-4 w-4 text-white animate-spin" />
                            ) : (
                              <span className="text-white text-sm">3</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">cBTC Received</p>
                            <p className="text-purple-300 text-xs">
                              {getBridgeStepStatus(3) === "completed"
                                ? "cBTC successfully minted to your wallet"
                                : "Waiting for processing..."}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <Progress
                        value={
                          bridgeStatus === "step1"
                            ? 33
                            : bridgeStatus === "step2"
                              ? 66
                              : bridgeStatus === "completed"
                                ? 100
                                : 0
                        }
                        className="h-2"
                      />

                      {/* Transaction Hash */}
                      {txHash && (
                        <div className="space-y-2">
                          <Label className="text-white text-sm">Transaction Hash:</Label>
                          <div className="flex items-center gap-2 p-3 bg-purple-900/20 rounded-lg">
                            <code className="text-purple-300 text-xs font-mono flex-1 truncate">{txHash}</code>
                            <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Success Message */}
                      {bridgeStatus === "completed" && (
                        <Alert className="bg-green-500/10 border-green-500/30">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertDescription className="text-green-200">
                            <strong>Bridge Complete!</strong> Your cBTC is now available in your Citrea wallet.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Info Cards - Dark purple/plum text for high contrast */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/30">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-purple-900 text-lg font-bold">About Citrea Bridge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 md:p-6 pt-0">
                  <p className="text-purple-900 text-sm font-medium">
                    Citrea's bridge uses zero-knowledge proofs to securely move Bitcoin to a ZK-rollup, enabling faster
                    transactions and smart contract functionality while maintaining Bitcoin's security.
                  </p>
                  <div className="space-y-2">
                    <p className="text-purple-800 text-xs font-bold">• Trustless bridging via ZK proofs</p>
                    <p className="text-purple-800 text-xs font-bold">• 1:1 BTC to cBTC conversion</p>
                    <p className="text-purple-800 text-xs font-bold">• Powered by Clementine protocol</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-purple-900 text-lg font-bold">Coming Soon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 md:p-6 pt-0">
                  <p className="text-purple-900 text-sm font-medium">
                    Enhanced bridge features and mainnet launch are coming soon. Sign up to be notified when these
                    features become available.
                  </p>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">Get Notified</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}