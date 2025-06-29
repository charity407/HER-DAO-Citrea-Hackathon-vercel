// @bolt Dynamic SDK Wallet Authentication Component
"use client"

import { useState, useEffect } from "react"
import { DynamicWidget, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Wallet, CheckCircle, AlertCircle, Loader2, Zap, Shield, Bitcoin } from "lucide-react"
import { extractWalletInfo, saveWalletSession, type WalletUser } from "@/lib/dynamic-config"
import { useAuth } from "@/lib/auth-context"

interface DynamicWalletAuthProps {
  onSuccess?: (walletUser: WalletUser) => void
  onError?: (error: string) => void
  showOnboarding?: boolean
  redirectToDashboard?: boolean
}

export function DynamicWalletAuth({ 
  onSuccess, 
  onError, 
  showOnboarding = true,
  redirectToDashboard = true 
}: DynamicWalletAuthProps) {
  const { user, primaryWallet, handleLogOut } = useDynamicContext()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()
  const { signIn } = useAuth()
  
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStep, setConnectionStep] = useState(0)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // @bolt Handle successful wallet connection
  useEffect(() => {
    const handleWalletConnection = async () => {
      if (isLoggedIn && user && primaryWallet) {
        try {
          setIsConnecting(true)
          setConnectionStep(1)

          // @bolt Extract wallet information
          const walletUser = extractWalletInfo(user)
          if (!walletUser) {
            throw new Error("Failed to extract wallet information")
          }

          setConnectionStep(2)

          // @bolt Save session data
          saveWalletSession(walletUser)

          setConnectionStep(3)

          // @bolt Sign in to our app's auth system
          await signIn(walletUser.walletAddress)

          setConnectionStep(4)

          // @bolt Show onboarding for new users
          if (showOnboarding) {
            setShowOnboardingModal(true)
          }

          // @bolt Call success callback
          onSuccess?.(walletUser)

          // @bolt Redirect to dashboard
          if (redirectToDashboard) {
            setTimeout(() => {
              router.push("/dashboard")
            }, showOnboarding ? 3000 : 1000)
          }

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Connection failed"
          setError(errorMessage)
          onError?.(errorMessage)
        } finally {
          setIsConnecting(false)
        }
      }
    }

    handleWalletConnection()
  }, [isLoggedIn, user, primaryWallet, signIn, onSuccess, onError, showOnboarding, redirectToDashboard, router])

  // @bolt Handle logout
  const handleDisconnect = async () => {
    try {
      await handleLogOut()
      setError(null)
      setConnectionStep(0)
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  // @bolt Connection steps for progress tracking
  const getConnectionStepInfo = () => {
    const steps = [
      { title: "Connecting Wallet", description: "Establishing connection..." },
      { title: "Verifying Identity", description: "Confirming wallet ownership..." },
      { title: "Creating Session", description: "Setting up your account..." },
      { title: "Finalizing Setup", description: "Preparing your dashboard..." },
    ]
    return steps[connectionStep] || steps[0]
  }

  // @bolt Supported wallets display
  const supportedWallets = [
    { name: "Xverse", icon: "⚡", description: "Bitcoin & Ordinals wallet" },
    { name: "Hiro", icon: "🔥", description: "Stacks & Bitcoin wallet" },
    { name: "Leather", icon: "🧳", description: "Bitcoin & Stacks wallet" },
    { name: "UniSat", icon: "🌟", description: "Bitcoin & Ordinals wallet" },
  ]

  if (isLoggedIn && user) {
    return (
      <div className="space-y-6">
        {/* Connected Wallet Display */}
        <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-400/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Wallet Connected
            </CardTitle>
            <CardDescription className="text-green-200">
              Successfully connected to {primaryWallet?.connector?.name || "Bitcoin wallet"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Address:</p>
                <p className="text-green-300 font-mono text-sm">
                  {primaryWallet?.address?.slice(0, 8)}...{primaryWallet?.address?.slice(-8)}
                </p>
              </div>
              <Badge className="bg-green-500 text-white">Connected</Badge>
            </div>
            
            {isConnecting && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="text-white text-sm">{getConnectionStepInfo().title}</span>
                </div>
                <Progress value={(connectionStep + 1) * 25} className="h-2" />
                <p className="text-purple-200 text-xs">{getConnectionStepInfo().description}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={() => router.push("/dashboard")}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isConnecting}
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400/10"
                disabled={isConnecting}
              >
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Modal */}
        <Dialog open={showOnboardingModal} onOpenChange={setShowOnboardingModal}>
          <DialogContent className="bg-gray-900 border-purple-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-pink-400" />
                Welcome to Proof of Learn!
              </DialogTitle>
              <DialogDescription className="text-purple-200">
                Your Bitcoin wallet is now connected. Start your learning journey!
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Bitcoin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-bold">Ready to Learn Bitcoin!</h3>
                <p className="text-purple-200 text-sm">
                  Complete courses, earn sats, and get verifiable zkCertificates
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white">Wallet connected securely</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white">Ready to earn Bitcoin rewards</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white">zkCertificate minting enabled</span>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setShowOnboardingModal(false)
                  router.push("/dashboard")
                }}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Start Learning
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Connection Interface */}
      <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-400/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white flex items-center justify-center gap-2 text-xl">
            <Wallet className="h-6 w-6 text-pink-400" />
            Connect Your Bitcoin Wallet
          </CardTitle>
          <CardDescription className="text-purple-200">
            Connect your Bitcoin wallet to start learning and earning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dynamic Widget */}
          <div className="flex justify-center">
            <DynamicWidget />
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Security Notice */}
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">Secure Connection</p>
                <p className="text-blue-200 text-xs mt-1">
                  Your private keys never leave your wallet. We only request your public address for identification.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Wallets */}
      <Card className="bg-black/30 border-purple-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Supported Bitcoin Wallets</CardTitle>
          <CardDescription className="text-purple-200">
            Choose from these popular Bitcoin wallets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportedWallets.map((wallet) => (
              <div
                key={wallet.name}
                className="flex items-center gap-3 p-3 bg-purple-900/30 rounded-lg border border-purple-400/30"
              >
                <span className="text-2xl">{wallet.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">{wallet.name}</p>
                  <p className="text-purple-300 text-xs">{wallet.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-400/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">Why Connect Your Wallet?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Bitcoin className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Earn Real Bitcoin</p>
                <p className="text-orange-200 text-xs">Get rewarded with sats for completing courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">zkCertificates</p>
                <p className="text-purple-200 text-xs">Get verifiable credentials on Bitcoin L2</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-pink-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Track Progress</p>
                <p className="text-pink-200 text-xs">Save your learning progress and achievements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// @bolt Hook for wallet authentication state
export function useWalletAuth() {
  const { user, primaryWallet } = useDynamicContext()
  const isLoggedIn = useIsLoggedIn()
  
  return {
    isConnected: isLoggedIn && !!user && !!primaryWallet,
    user,
    wallet: primaryWallet,
    walletAddress: primaryWallet?.address,
    walletType: primaryWallet?.connector?.name,
  }
}