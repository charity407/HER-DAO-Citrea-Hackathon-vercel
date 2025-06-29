// @bolt Dynamic SDK configuration for Bitcoin wallet authentication
"use client"

import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin"

export const dynamicConfig = {
  // Get your environment ID from https://app.dynamic.xyz
  environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "01234567-89ab-cdef-0123-456789abcdef",
  
  walletConnectors: [BitcoinWalletConnectors],
  
  // @bolt Configure supported Bitcoin wallets
  walletConnectorExtensions: [
    {
      key: "xverse",
      name: "Xverse",
    },
    {
      key: "hiro", 
      name: "Hiro Wallet",
    },
    {
      key: "leather",
      name: "Leather",
    },
    {
      key: "unisat",
      name: "UniSat",
    }
  ],

  // @bolt Customize the authentication flow
  initialAuthenticationMode: "connect-only",
  
  // @bolt Session and user management
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  
  // @bolt UI customization for HER DAO theme
  cssOverrides: `
    .dynamic-widget-inline-controls {
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
      border-radius: 12px;
      border: 2px solid rgba(236, 72, 153, 0.3);
    }
    
    .dynamic-widget-inline-controls__connect-button {
      background: linear-gradient(135deg, #ec4899 0%, #7c3aed 100%);
      color: white;
      font-weight: 600;
      border-radius: 8px;
      padding: 12px 24px;
      border: none;
      transition: all 0.3s ease;
    }
    
    .dynamic-widget-inline-controls__connect-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
    }
    
    .dynamic-modal {
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(10px);
    }
    
    .dynamic-modal-content {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      border: 2px solid rgba(139, 92, 246, 0.3);
      border-radius: 16px;
    }
  `,

  // @bolt Events for tracking and analytics
  events: {
    onAuthSuccess: (args: any) => {
      console.log("🎉 Wallet connected successfully:", args);
      // @bolt Track successful authentication
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "wallet_connected", {
          wallet_type: args.primaryWallet?.connector?.name,
          user_id: args.user?.userId,
        });
      }
    },
    onLogout: (args: any) => {
      console.log("👋 User logged out:", args);
      // @bolt Clear local session data
      if (typeof window !== "undefined") {
        localStorage.removeItem("proofoflearn_user");
        localStorage.removeItem("proofoflearn_progress");
      }
    },
    onAuthFailure: (args: any) => {
      console.error("❌ Authentication failed:", args);
      // @bolt Track failed authentication attempts
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "wallet_connection_failed", {
          error: args.reason,
        });
      }
    }
  }
};

// @bolt Type definitions for wallet data
export interface WalletUser {
  userId: string;
  walletAddress: string;
  walletType: string;
  connectedAt: string;
  lastActivity: string;
}

// @bolt Helper function to extract wallet info
export const extractWalletInfo = (user: any): WalletUser | null => {
  if (!user || !user.primaryWallet) return null;
  
  return {
    userId: user.userId,
    walletAddress: user.primaryWallet.address,
    walletType: user.primaryWallet.connector?.name || "Unknown",
    connectedAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
  };
};

// @bolt Session storage helpers
export const saveWalletSession = (walletUser: WalletUser) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("proofoflearn_wallet_session", JSON.stringify(walletUser));
    localStorage.setItem("proofoflearn_last_login", new Date().toISOString());
  }
};

export const getWalletSession = (): WalletUser | null => {
  if (typeof window === "undefined") return null;
  
  try {
    const session = localStorage.getItem("proofoflearn_wallet_session");
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Failed to parse wallet session:", error);
    return null;
  }
};

export const clearWalletSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("proofoflearn_wallet_session");
    localStorage.removeItem("proofoflearn_last_login");
  }
};