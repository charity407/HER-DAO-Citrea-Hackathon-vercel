"use client"

import { createClient } from "@supabase/supabase-js"

// Provide fallback values for development when environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

// Only create the client if we have valid environment variables
export const supabase = supabaseUrl.includes("placeholder") || supabaseAnonKey.includes("placeholder")
  ? null
  : createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  wallet_address: string
  username?: string
  created_at: string
  updated_at: string
  total_xp: number
  sats_earned: number
  current_streak: number
  last_activity: string
}

export interface ModuleProgress {
  id: string
  user_id: string
  module_id: string
  status: "not_started" | "in_progress" | "completed"
  quiz_score?: number
  completed_at?: string
  zk_cert_id?: string
  created_at: string
  updated_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  module_id: string
  answers: Record<string, any>
  score: number
  passed: boolean
  attempt_number: number
  completed_at: string
}

export interface ZkCertificate {
  id: string
  user_id: string
  module_id: string
  certificate_name: string
  zk_proof_hash: string
  tx_hash: string
  ipfs_hash?: string
  minted_at: string
  verified: boolean
}

// Helper function to check if Supabase is available
export const isSupabaseAvailable = (): boolean => {
  return supabase !== null
}

// Auth functions
export const signInWithWallet = async (walletAddress: string, signature: string) => {
  try {
    if (!isSupabaseAvailable()) {
      // Mock response for development when Supabase is not configured
      const mockUser: UserProfile = {
        id: `user_${Date.now()}`,
        wallet_address: walletAddress,
        username: `User ${walletAddress.slice(0, 8)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        total_xp: 0,
        sats_earned: 0,
        current_streak: 1,
        last_activity: new Date().toISOString(),
      }
      return { user: mockUser, error: null }
    }

    // Verify wallet signature first (simplified for demo)
    const isValidSignature = await verifyWalletSignature(walletAddress, signature)

    if (!isValidSignature) {
      throw new Error("Invalid wallet signature")
    }

    // Check if user exists
    let { data: user, error } = await supabase!
      .from("user_profiles")
      .select("*")
      .eq("wallet_address", walletAddress)
      .single()

    if (error && error.code !== "PGRST116") {
      throw error
    }

    // Create user if doesn't exist
    if (!user) {
      const { data: newUser, error: createError } = await supabase!
        .from("user_profiles")
        .insert({
          wallet_address: walletAddress,
          total_xp: 0,
          sats_earned: 0,
          current_streak: 0,
          last_activity: new Date().toISOString(),
        })
        .select()
        .single()

      if (createError) throw createError
      user = newUser
    }

    // Update last activity
    await supabase!.from("user_profiles").update({ last_activity: new Date().toISOString() }).eq("id", user.id)

    return { user, error: null }
  } catch (error) {
    console.error("Sign in error:", error)
    return { user: null, error }
  }
}

export const verifyWalletSignature = async (address: string, signature: string): Promise<boolean> => {
  // Mock signature verification - in real implementation, verify the signature
  // using the wallet's public key and the signed message
  console.log("Verifying signature for:", address)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true // Mock verification
}

// User progress functions
export const getUserProgress = async (userId: string) => {
  if (!isSupabaseAvailable()) {
    // Return mock progress for development
    return []
  }

  const { data, error } = await supabase!
    .from("module_progress")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export const updateModuleProgress = async (
  userId: string,
  moduleId: string,
  status: "in_progress" | "completed",
  quizScore?: number,
  zkCertId?: string,
) => {
  if (!isSupabaseAvailable()) {
    // Mock response for development
    return { id: "mock_progress", user_id: userId, module_id: moduleId, status }
  }

  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === "completed") {
    updateData.completed_at = new Date().toISOString()
    updateData.quiz_score = quizScore
    updateData.zk_cert_id = zkCertId
  }

  const { data, error } = await supabase!
    .from("module_progress")
    .upsert({
      user_id: userId,
      module_id: moduleId,
      ...updateData,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Quiz functions
export const submitQuizAttempt = async (
  userId: string,
  moduleId: string,
  answers: Record<string, any>,
  score: number,
  passed: boolean,
) => {
  if (!isSupabaseAvailable()) {
    // Mock response for development
    return {
      id: "mock_quiz_attempt",
      user_id: userId,
      module_id: moduleId,
      score,
      passed,
      attempt_number: 1,
    }
  }

  // Get attempt number
  const { count } = await supabase!
    .from("quiz_attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("module_id", moduleId)

  const attemptNumber = (count || 0) + 1

  const { data, error } = await supabase!
    .from("quiz_attempts")
    .insert({
      user_id: userId,
      module_id: moduleId,
      answers,
      score,
      passed,
      attempt_number: attemptNumber,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Certificate functions
export const storeZkCertificate = async (certificate: Omit<ZkCertificate, "id">) => {
  if (!isSupabaseAvailable()) {
    // Mock response for development
    return {
      id: "mock_certificate",
      ...certificate,
    }
  }

  const { data, error } = await supabase!.from("zk_certificates").insert(certificate).select().single()

  if (error) throw error
  return data
}

export const getUserCertificates = async (userId: string) => {
  if (!isSupabaseAvailable()) {
    // Return mock certificates for development
    return []
  }

  const { data, error } = await supabase!
    .from("zk_certificates")
    .select("*")
    .eq("user_id", userId)
    .order("minted_at", { ascending: false })

  if (error) throw error
  return data
}

// XP and rewards functions
export const updateUserXP = async (userId: string, xpGained: number, satsEarned: number) => {
  if (!isSupabaseAvailable()) {
    // Mock response for development
    return { success: true }
  }

  const { data, error } = await supabase!.rpc("update_user_rewards", {
    user_id: userId,
    xp_gained: xpGained,
    sats_gained: satsEarned,
  })

  if (error) throw error
  return data
}