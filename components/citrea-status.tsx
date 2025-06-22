"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCitrea } from "@/hooks/use-citrea"
import { CheckCircle, AlertCircle, Loader2, Zap } from "lucide-react"

export function CitreaStatus() {
  const { isInitialized, isLoading, error } = useCitrea()

  const getStatusInfo = () => {
    if (isLoading) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-400" />,
        status: "Connecting",
        description: "Initializing Citrea SDK...",
        badgeColor: "bg-blue-500",
      }
    }

    if (error) {
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-400" />,
        status: "Error",
        description: error,
        badgeColor: "bg-red-500",
      }
    }

    if (isInitialized) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        status: "Connected",
        description: "Ready to mint zkCertificates",
        badgeColor: "bg-green-500",
      }
    }

    return {
      icon: <AlertCircle className="h-4 w-4 text-gray-400" />,
      status: "Disconnected",
      description: "Not connected to Citrea network",
      badgeColor: "bg-gray-500",
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Card className="bg-black/30 border-purple-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2 text-sm">
          <Zap className="h-4 w-4 text-pink-400" />
          Citrea Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {statusInfo.icon}
            <span className="text-white text-sm">{statusInfo.status}</span>
          </div>
          <Badge className={`${statusInfo.badgeColor} text-white text-xs`}>{statusInfo.status}</Badge>
        </div>

        <p className="text-purple-300 text-xs">{statusInfo.description}</p>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertCircle className="h-3 w-3 text-red-500" />
            <AlertDescription className="text-red-200 text-xs">
              Failed to connect to Citrea. zkCert minting may not work properly.
            </AlertDescription>
          </Alert>
        )}

        {isInitialized && (
          <div className="text-xs text-green-300">
            ✓ ZK proof generation ready
            <br />✓ Certificate minting enabled
          </div>
        )}
      </CardContent>
    </Card>
  )
}
