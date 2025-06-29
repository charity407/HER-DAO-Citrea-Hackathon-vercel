// @bolt Dynamic SDK Provider Component
"use client"

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"
import { dynamicConfig } from "@/lib/dynamic-config"

interface DynamicProviderProps {
  children: React.ReactNode
}

export function DynamicProvider({ children }: DynamicProviderProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: dynamicConfig.environmentId,
        walletConnectors: dynamicConfig.walletConnectors,
        walletConnectorExtensions: dynamicConfig.walletConnectorExtensions,
        initialAuthenticationMode: dynamicConfig.initialAuthenticationMode,
        cssOverrides: dynamicConfig.cssOverrides,
        events: dynamicConfig.events,
      }}
    >
      {children}
    </DynamicContextProvider>
  )
}