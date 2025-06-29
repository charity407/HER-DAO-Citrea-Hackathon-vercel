"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sidebar } from "@/components/sidebar"
import { Wallet, Send, Download, Copy, ExternalLink, Zap, Gift, History, RefreshCw } from "lucide-react"

export function WalletPanel() {
  const [connectedWallet, setConnectedWallet] = useState("Alby")
  const [btcBalance] = useState(0.00125)
  const [cbtcBalance] = useState(0.0008)
  const [satsEarned] = useState(15420)
  const [pendingSats] = useState(2500)

  const transactions = [
    {
      id: 1,
      type: "reward",
      amount: 1500,
      description: "Module 3 Completion",
      date: "2024-01-25",
      status: "confirmed",
    },
    {
      id: 2,
      type: "reward",
      amount: 2000,
      description: "Module 2 Completion",
      date: "2024-01-20",
      status: "confirmed",
    },
    { id: 3, type: "send", amount: -5000, description: "Tip to @bitcoiner", date: "2024-01-18", status: "confirmed" },
    {
      id: 4,
      type: "reward",
      amount: 1800,
      description: "Module 1 Completion",
      date: "2024-01-15",
      status: "confirmed",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Wallet</h1>
              <p className="text-purple-200 text-sm md:text-base">Manage your Bitcoin and rewards</p>
            </div>

            {/* Wallet Status - Mobile optimized */}
            <Card className="mb-6 md:mb-8 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-400/50 backdrop-blur-sm">
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                      <Wallet className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-white text-lg md:text-xl">{connectedWallet} Wallet</CardTitle>
                      <CardDescription className="text-white text-sm">Connected & Synced</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-white hover:bg-green-400/20 bg-green-900/20 flex-1 sm:flex-none"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-400 text-white hover:bg-purple-400/20 bg-purple-900/20 flex-1 sm:flex-none"
                    >
                      Switch Wallet
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Balance Cards - Dark purple/plum text for high contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
              <Card className="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 border-2 border-orange-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-purple-900 text-sm font-bold">BTC Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-purple-900">{btcBalance} BTC</div>
                  <p className="text-purple-800 text-xs font-bold">≈ ${(btcBalance * 45000).toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-2 border-blue-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-purple-900 text-sm font-bold">cBTC Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-purple-900">{cbtcBalance} cBTC</div>
                  <p className="text-purple-800 text-xs font-bold">Citrea Network</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-purple-900 text-sm font-bold">Sats Earned</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-purple-900">{satsEarned.toLocaleString()}</div>
                  <p className="text-purple-800 text-xs font-bold">From learning rewards</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Wallet Interface - Mobile optimized tabs */}
            <Tabs defaultValue="rewards" className="space-y-4 md:space-y-6">
              <TabsList className="bg-black/50 border-2 border-purple-400/50 backdrop-blur-sm p-1 w-full grid grid-cols-4 h-auto">
                <TabsTrigger
                  value="rewards"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs p-2"
                >
                  <Gift className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Rewards</span>
                </TabsTrigger>
                <TabsTrigger
                  value="send"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs p-2"
                >
                  <Send className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </TabsTrigger>
                <TabsTrigger
                  value="receive"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs p-2"
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Receive</span>
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs p-2"
                >
                  <History className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rewards">
                <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Gift className="h-5 w-5 text-orange-300" />
                      Learning Rewards
                    </CardTitle>
                    <CardDescription className="text-white/90 text-sm">
                      Claim your sats earned from completing modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-orange-600/20 rounded-lg border-2 border-orange-400/50 gap-4">
                      <div className="flex-1">
                        <p className="text-purple-900 font-bold text-sm md:text-base">Pending Rewards</p>
                        <p className="text-purple-900 text-xl md:text-2xl font-bold">{pendingSats.toLocaleString()} sats</p>
                      </div>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
                        <Zap className="mr-2 h-4 w-4" />
                        Claim All
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-medium text-sm md:text-base">Recent Earnings</h4>
                      {transactions
                        .filter((tx) => tx.type === "reward")
                        .slice(0, 3)
                        .map((tx) => (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg border border-purple-400/30 gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-8 h-8 bg-green-600/30 rounded-full flex items-center justify-center border border-green-400/50 flex-shrink-0">
                                <Gift className="h-4 w-4 text-green-300" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-white text-sm font-medium truncate">{tx.description}</p>
                                <p className="text-purple-200 text-xs">{tx.date}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-green-300 font-medium text-sm">+{tx.amount} sats</p>
                              <Badge className="bg-green-600 text-white text-xs">Claimed</Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="send">
                <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Send className="h-5 w-5 text-blue-300" />
                      Send Bitcoin
                    </CardTitle>
                    <CardDescription className="text-purple-100 text-sm">
                      Send BTC or tip other learners via Lightning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-white text-sm">
                        Recipient
                      </Label>
                      <Input
                        id="recipient"
                        placeholder="Bitcoin address or Lightning invoice"
                        className="bg-purple-900/50 border-2 border-purple-400/50 text-white placeholder:text-purple-300 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-white text-sm">
                        Amount (sats)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="1000"
                        className="bg-purple-900/50 border-2 border-purple-400/50 text-white placeholder:text-purple-300 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="memo" className="text-white text-sm">
                        Memo (optional)
                      </Label>
                      <Input
                        id="memo"
                        placeholder="Great job on the course!"
                        className="bg-purple-900/50 border-2 border-purple-400/50 text-white placeholder:text-purple-300 text-sm"
                      />
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Send className="mr-2 h-4 w-4" />
                      Send Payment
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="receive">
                <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Download className="h-5 w-5 text-green-300" />
                      Receive Bitcoin
                    </CardTitle>
                    <CardDescription className="text-purple-100 text-sm">
                      Generate an address or invoice to receive payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                    <div className="text-center space-y-4">
                      <div className="w-40 h-40 md:w-48 md:h-48 bg-white/90 rounded-lg mx-auto flex items-center justify-center border-2 border-gray-300">
                        <p className="text-gray-600 text-sm">QR Code</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white text-sm">Your Bitcoin Address</Label>
                        <div className="flex gap-2">
                          <Input
                            value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                            readOnly
                            className="bg-purple-900/50 border-2 border-purple-400/50 text-white font-mono text-xs md:text-sm flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400 text-green-200 hover:bg-green-400/20 bg-green-900/20 flex-shrink-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <Button
                        variant="outline"
                        className="border-purple-400 text-purple-200 hover:bg-purple-400/20 bg-purple-900/20 text-sm"
                      >
                        Generate New Address
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-400 text-blue-200 hover:bg-blue-400/20 bg-blue-900/20 text-sm"
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Lightning Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <History className="h-5 w-5 text-purple-300" />
                      Transaction History
                    </CardTitle>
                    <CardDescription className="text-purple-100 text-sm">
                      View all your Bitcoin transactions and rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3">
                      {transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 md:p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors border border-purple-400/30 gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border flex-shrink-0 ${
                                tx.type === "reward"
                                  ? "bg-green-600/30 border-green-400/50"
                                  : "bg-blue-600/30 border-blue-400/50"
                              }`}
                            >
                              {tx.type === "reward" ? (
                                <Gift className="h-4 w-4 md:h-5 md:w-5 text-green-300" />
                              ) : (
                                <Send className="h-4 w-4 md:h-5 md:w-5 text-blue-300" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-white font-medium text-sm truncate">{tx.description}</p>
                              <p className="text-purple-200 text-xs">{tx.date}</p>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-2 md:gap-3 flex-shrink-0">
                            <div>
                              <p className={`font-medium text-sm ${tx.amount > 0 ? "text-green-300" : "text-red-300"}`}>
                                {tx.amount > 0 ? "+" : ""}
                                {tx.amount.toLocaleString()} sats
                              </p>
                              <Badge
                                className={`text-xs ${
                                  tx.status === "confirmed" ? "bg-green-600 text-white" : "bg-yellow-600 text-black"
                                }`}
                              >
                                {tx.status}
                              </Badge>
                            </div>
                            <Button size="sm" variant="ghost" className="text-purple-300 hover:text-purple-100 p-1">
                              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}