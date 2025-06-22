"use client"

// Bitcoin wallet integration for Hiro, Xverse, and other wallets
export interface WalletInfo {
  name: string
  icon: string
  installed: boolean
  connector: WalletConnector
}

export interface WalletConnector {
  connect(): Promise<{ address: string; publicKey: string }>
  disconnect(): Promise<void>
  signMessage(message: string): Promise<string>
  getBalance(): Promise<number>
  sendTransaction(to: string, amount: number): Promise<string>
}

class HiroWalletConnector implements WalletConnector {
  async connect() {
    if (typeof window === "undefined" || !window.HiroWalletProvider) {
      throw new Error("Hiro Wallet not installed")
    }

    try {
      const response = await window.HiroWalletProvider.connect()
      return {
        address: response.addresses.mainnet,
        publicKey: response.publicKey,
      }
    } catch (error) {
      throw new Error("Failed to connect to Hiro Wallet")
    }
  }

  async disconnect() {
    if (window.HiroWalletProvider) {
      await window.HiroWalletProvider.disconnect()
    }
  }

  async signMessage(message: string) {
    if (!window.HiroWalletProvider) {
      throw new Error("Hiro Wallet not connected")
    }

    const response = await window.HiroWalletProvider.signMessage(message)
    return response.signature
  }

  async getBalance() {
    // Mock balance - in real implementation, query the wallet
    return 0.00125
  }

  async sendTransaction(to: string, amount: number) {
    if (!window.HiroWalletProvider) {
      throw new Error("Hiro Wallet not connected")
    }

    const response = await window.HiroWalletProvider.sendTransfer({
      recipient: to,
      amount: amount * 100000000, // Convert to satoshis
    })

    return response.txid
  }
}

class XverseWalletConnector implements WalletConnector {
  async connect() {
    if (typeof window === "undefined" || !window.XverseProviders?.BitcoinProvider) {
      throw new Error("Xverse Wallet not installed")
    }

    try {
      const response = await window.XverseProviders.BitcoinProvider.connect()
      return {
        address: response.addresses[0].address,
        publicKey: response.addresses[0].publicKey,
      }
    } catch (error) {
      throw new Error("Failed to connect to Xverse Wallet")
    }
  }

  async disconnect() {
    if (window.XverseProviders?.BitcoinProvider) {
      await window.XverseProviders.BitcoinProvider.disconnect()
    }
  }

  async signMessage(message: string) {
    if (!window.XverseProviders?.BitcoinProvider) {
      throw new Error("Xverse Wallet not connected")
    }

    const response = await window.XverseProviders.BitcoinProvider.signMessage(message)
    return response.signature
  }

  async getBalance() {
    // Mock balance - in real implementation, query the wallet
    return 0.00089
  }

  async sendTransaction(to: string, amount: number) {
    if (!window.XverseProviders?.BitcoinProvider) {
      throw new Error("Xverse Wallet not connected")
    }

    const response = await window.XverseProviders.BitcoinProvider.sendBitcoin({
      address: to,
      amount: amount * 100000000, // Convert to satoshis
    })

    return response.txid
  }
}

// Mock wallet for development
class MockWalletConnector implements WalletConnector {
  private connected = false
  private address = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  async connect() {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.connected = true
    return {
      address: this.address,
      publicKey: "0x" + Math.random().toString(16).substr(2, 64),
    }
  }

  async disconnect() {
    this.connected = false
  }

  async signMessage(message: string) {
    if (!this.connected) throw new Error("Wallet not connected")
    // Mock signature
    return "0x" + Math.random().toString(16).substr(2, 128)
  }

  async getBalance() {
    return 0.00125
  }

  async sendTransaction(to: string, amount: number) {
    if (!this.connected) throw new Error("Wallet not connected")
    // Mock transaction
    return "0x" + Math.random().toString(16).substr(2, 64)
  }
}

export const getAvailableWallets = (): WalletInfo[] => {
  const wallets: WalletInfo[] = [
    {
      name: "Hiro Wallet",
      icon: "🔥",
      installed: typeof window !== "undefined" && !!window.HiroWalletProvider,
      connector: new HiroWalletConnector(),
    },
    {
      name: "Xverse",
      icon: "⚡",
      installed: typeof window !== "undefined" && !!window.XverseProviders?.BitcoinProvider,
      connector: new XverseWalletConnector(),
    },
    {
      name: "Mock Wallet",
      icon: "🧪",
      installed: true,
      connector: new MockWalletConnector(),
    },
  ]

  return wallets
}

// Wallet context and hook
export interface WalletState {
  connected: boolean
  address: string | null
  balance: number
  connector: WalletConnector | null
}

export const useWallet = () => {
  // This would be implemented as a React context
  // For now, returning mock state
  return {
    wallet: {
      connected: true,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      balance: 0.00125,
      connector: new MockWalletConnector(),
    } as WalletState,
    connect: async (walletName: string) => {
      console.log("Connecting to", walletName)
    },
    disconnect: async () => {
      console.log("Disconnecting wallet")
    },
    signMessage: async (message: string) => {
      return "0x" + Math.random().toString(16).substr(2, 128)
    },
  }
}

// Extend window type for wallet providers
declare global {
  interface Window {
    HiroWalletProvider?: any
    XverseProviders?: {
      BitcoinProvider?: any
    }
  }
}
