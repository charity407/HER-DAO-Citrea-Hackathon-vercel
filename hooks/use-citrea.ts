"use client"

import { useState, useEffect, useCallback } from "react"
import { getCitreaSDK, type ZkCertData, type MintResult, type ZkProof } from "@/lib/citrea-sdk"

export interface UseCitreaReturn {
  isInitialized: boolean
  isLoading: boolean
  error: string | null
  mintCertificate: (certData: ZkCertData) => Promise<MintResult>
  verifyCertificate: (certificateId: string, zkProofHash: string) => Promise<boolean>
  clearError: () => void
}

export const useCitrea = (): UseCitreaReturn => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sdk = getCitreaSDK()

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        setIsLoading(true)
        await sdk.initialize()
        setIsInitialized(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Citrea SDK")
      } finally {
        setIsLoading(false)
      }
    }

    initializeSDK()
  }, [sdk])

  const mintCertificate = useCallback(
    async (certData: ZkCertData): Promise<MintResult> => {
      if (!isInitialized) {
        throw new Error("Citrea SDK not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        // Step 1: Generate ZK proof
        console.log("Step 1: Generating ZK proof...")
        const zkProof: ZkProof = await sdk.generateZkProof(certData)

        // Step 2: Mint certificate with proof
        console.log("Step 2: Minting certificate...")
        const result = await sdk.mintCertificate(certData, zkProof)

        if (!result.success) {
          throw new Error(result.error || "Failed to mint certificate")
        }

        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to mint certificate"
        setError(errorMessage)
        return {
          success: false,
          error: errorMessage,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [isInitialized, sdk],
  )

  const verifyCertificate = useCallback(
    async (certificateId: string, zkProofHash: string): Promise<boolean> => {
      if (!isInitialized) {
        throw new Error("Citrea SDK not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        const isValid = await sdk.verifyCertificate(certificateId, zkProofHash)
        return isValid
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to verify certificate")
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [isInitialized, sdk],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isInitialized,
    isLoading,
    error,
    mintCertificate,
    verifyCertificate,
    clearError,
  }
}
