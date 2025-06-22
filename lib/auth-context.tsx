"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { signInWithWallet, type UserProfile } from "@/lib/supabase"

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signIn: (walletAddress: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserStats: (xp: number, sats: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem("proofoflearn_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Session check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (walletAddress: string) => {
    try {
      setLoading(true)

      // Mock signature for demo
      const signature = "mock_signature_" + Math.random().toString(36)

      const { user: authUser, error } = await signInWithWallet(walletAddress, signature)

      if (error) throw error

      if (authUser) {
        setUser(authUser)
        localStorage.setItem("proofoflearn_user", JSON.stringify(authUser))
      }
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("proofoflearn_user")
  }

  const updateUserStats = (xp: number, sats: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        total_xp: user.total_xp + xp,
        sats_earned: user.sats_earned + sats,
        last_activity: new Date().toISOString(),
      }
      setUser(updatedUser)
      localStorage.setItem("proofoflearn_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUserStats }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
