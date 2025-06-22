"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { courseContent } from "@/lib/course-content"
import { useAuth } from "@/lib/auth-context"
import { getUserProgress, updateModuleProgress, updateUserXP } from "@/lib/supabase"

interface ModuleProgress {
  moduleId: string
  status: "not_started" | "in_progress" | "completed"
  quizScore?: number
  completedAt?: string
  zkCertId?: string
}

interface ProgressContextType {
  progress: Record<string, ModuleProgress>
  updateProgress: (moduleId: string, status: ModuleProgress["status"], quizScore?: number, zkCertId?: string) => void
  getModuleStatus: (moduleId: string) => ModuleProgress["status"]
  isModuleUnlocked: (moduleId: string) => boolean
  getCompletedModules: () => string[]
  getTotalXP: () => number
  getSatsEarned: () => number
  loading: boolean
  refreshProgress: () => Promise<void>
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({})
  const [loading, setLoading] = useState(true)

  const loadProgress = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const dbProgress = await getUserProgress(user.id)

      // Convert database progress to our format
      const progressMap: Record<string, ModuleProgress> = {}

      // Initialize all modules as not_started
      courseContent.forEach((module) => {
        progressMap[module.id] = {
          moduleId: module.id,
          status: "not_started",
        }
      })

      // Update with actual progress from database
      dbProgress.forEach((item) => {
        progressMap[item.module_id] = {
          moduleId: item.module_id,
          status: item.status as ModuleProgress["status"],
          quizScore: item.quiz_score || undefined,
          completedAt: item.completed_at || undefined,
          zkCertId: item.zk_cert_id || undefined,
        }
      })

      setProgress(progressMap)
    } catch (error) {
      console.error("Failed to load progress:", error)
      // Fallback to localStorage if database fails
      const savedProgress = localStorage.getItem("proofoflearn_progress")
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProgress()
  }, [user])

  const updateProgress = async (
    moduleId: string,
    status: ModuleProgress["status"],
    quizScore?: number,
    zkCertId?: string,
  ) => {
    if (!user) return

    const newProgress = {
      ...progress,
      [moduleId]: {
        moduleId,
        status,
        quizScore,
        zkCertId,
        completedAt: status === "completed" ? new Date().toISOString() : undefined,
      },
    }

    setProgress(newProgress)

    // Save to localStorage as backup
    localStorage.setItem("proofoflearn_progress", JSON.stringify(newProgress))

    try {
      // Update database
      await updateModuleProgress(user.id, moduleId, status, quizScore, zkCertId)

      // Award XP and sats if completed
      if (status === "completed" && quizScore) {
        const xpGained = 100 + Math.max(0, (quizScore - 70) * 2)
        const satsGained = 1000 + Math.max(0, (quizScore - 70) * 50)
        await updateUserXP(user.id, xpGained, satsGained)
      }

      // Unlock next module if this one is completed
      if (status === "completed") {
        const currentModuleIndex = courseContent.findIndex((m) => m.id === moduleId)
        if (currentModuleIndex >= 0 && currentModuleIndex < courseContent.length - 1) {
          const nextModule = courseContent[currentModuleIndex + 1]
          if (newProgress[nextModule.id]?.status === "not_started") {
            newProgress[nextModule.id] = {
              moduleId: nextModule.id,
              status: "not_started",
            }
            setProgress({ ...newProgress })
            localStorage.setItem("proofoflearn_progress", JSON.stringify(newProgress))
          }
        }
      }
    } catch (error) {
      console.error("Failed to update progress in database:", error)
      // Progress is still updated locally, so user can continue
    }
  }

  const getModuleStatus = (moduleId: string): ModuleProgress["status"] => {
    return progress[moduleId]?.status || "not_started"
  }

  const isModuleUnlocked = (moduleId: string): boolean => {
    // First module is always unlocked
    if (moduleId === "module-1") return true

    // Find the previous module
    const currentIndex = courseContent.findIndex((m) => m.id === moduleId)
    if (currentIndex <= 0) return true

    const previousModule = courseContent[currentIndex - 1]
    return getModuleStatus(previousModule.id) === "completed"
  }

  const getCompletedModules = (): string[] => {
    return Object.values(progress)
      .filter((p) => p.status === "completed")
      .map((p) => p.moduleId)
  }

  const getTotalXP = (): number => {
    return user?.total_xp || getCompletedModules().length * 100
  }

  const getSatsEarned = (): number => {
    return user?.sats_earned || getCompletedModules().length * 1000
  }

  const refreshProgress = async () => {
    await loadProgress()
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        getModuleStatus,
        isModuleUnlocked,
        getCompletedModules,
        getTotalXP,
        getSatsEarned,
        loading,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
