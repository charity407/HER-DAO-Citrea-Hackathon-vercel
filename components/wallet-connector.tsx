"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAvailableWallets } from "@/lib/wallet-connector"
import { useAuth } from "@/lib/auth-context"
import { Wallet, AlertCircle, Loader2, CheckCircle } from "lucide-react"

interface WalletConnectorProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletConnector({ isOpen, onClose }: WalletConnectorProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const availableWallets = getAvailableWallets()

  const handleConnect = async (walletName: string, connector: any) => {
    try {
      setConnecting(walletName)
      setError(null)

      // Connect to wallet
      const { address } = await connector.connect()

      // Sign in with the wallet address
      await signIn(address)

      // Close dialog on success
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setConnecting(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-white">Connect Wallet</DialogTitle>
          <DialogDescription className="text-purple-200">
            Choose a Bitcoin wallet to connect and start learning
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {availableWallets.map((wallet) => (
            <Button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name, wallet.connector)}
              disabled={connecting !== null}
              className="w-full justify-start gap-3 bg-purple-900/30 hover:bg-purple-800/50 border border-purple-700"
            >
              {connecting === wallet.name ? (
                <Loader2 className="h-5 w-5 animate-spin text-pink-400" />
              ) : wallet.installed ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <Wallet className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex-1 text-left">
                <div className="text-white font-medium">{wallet.name}</div>
                <div className="text-purple-300 text-sm">{wallet.installed ? "Ready to connect" : "Not installed"}</div>
              </div>
              <span className="text-2xl">{wallet.icon}</span>
            </Button>
          ))}
        </div>

        <div className="text-center text-purple-300 text-sm">
          Don't have a Bitcoin wallet?{" "}
          <a
            href="https://wallet.hiro.so"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            Get Hiro Wallet
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
