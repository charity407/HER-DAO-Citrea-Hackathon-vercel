"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/sidebar"
import { Award, Zap, Bell, ChevronRight, Star, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useProgress } from "@/lib/progress-context"
import { useRouter } from "next/navigation"
import { courseContent } from "@/lib/course-content"
import { getUserCertificates } from "@/lib/supabase"

export function Dashboard() {
  const { user } = useAuth()
  const { progress, getCompletedModules, getTotalXP, getSatsEarned, loading: progressLoading } = useProgress()
  const router = useRouter()
  const [certificates, setCertificates] = useState<any[]>([])
  const [certsLoading, setCertsLoading] = useState(true)

  const completedModules = getCompletedModules()
  const totalXP = getTotalXP()
  const satsEarned = getSatsEarned()

  // Load certificates from database
  useEffect(() => {
    const loadCertificates = async () => {
      if (!user) return

      try {
        const userCerts = await getUserCertificates(user.id)
        setCertificates(userCerts)
      } catch (error) {
        console.error("Failed to load certificates:", error)
      } finally {
        setCertsLoading(false)
      }
    }

    loadCertificates()
  }, [user])

  // Find next module to complete
  const nextModule = courseContent.find((module) => {
    const moduleProgress = progress[module.id]
    return !moduleProgress || moduleProgress.status !== "completed"
  })

  const recentCerts = certificates.slice(-3).map((cert) => {
    const module = courseContent.find((m) => m.id === cert.module_id)
    return {
      name: cert.certificate_name,
      date: new Date(cert.minted_at).toLocaleDateString(),
      track: module?.track || "Unknown",
    }
  })

  const notifications = [
    { type: "achievement", message: "New zkCert earned: Bitcoin Origins Scholar!", time: "2h ago" },
    {
      type: "progress",
      message: `You're on a ${user?.current_streak || 1}-day learning streak!`,
      time: "1d ago",
    },
    { type: "reward", message: "1,500 sats earned from Module 3", time: "2d ago" },
  ]

  const handleContinueLearning = () => {
    if (nextModule) {
      router.push(`/courses?module=${nextModule.id}`)
    } else {
      router.push("/courses")
    }
  }

  if (progressLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading your progress...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.username || "Bitcoin Learner"}! 🚀
              </h1>
              <p className="text-purple-200 text-sm md:text-base">Ready to continue your Bitcoin journey?</p>
            </div>

            {/* Stats Grid - Mobile optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
              <Card className="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 border-2 border-orange-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-white text-xs md:text-sm font-medium">Sats Earned</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-white">{satsEarned.toLocaleString()}</div>
                  <p className="text-orange-200 text-xs">From learning</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-600/30 to-purple-600/30 border-2 border-pink-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-white text-xs md:text-sm font-medium">XP Points</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-white">{totalXP}</div>
                  <Progress value={(totalXP % 1000) / 10} className="mt-2 h-1 md:h-2" />
                  <p className="text-purple-200 text-xs">
                    {Math.round((completedModules.length / courseContent.length) * 100)}% complete
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-white text-xs md:text-sm font-medium">Courses</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-white">
                    {completedModules.length}/{courseContent.length}
                  </div>
                  <p className="text-green-200 text-xs">
                    {Math.round((completedModules.length / courseContent.length) * 100)}% complete
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-2 border-blue-400/50 backdrop-blur-sm">
                <CardHeader className="pb-2 p-3 md:p-6">
                  <CardTitle className="text-white text-xs md:text-sm font-medium">Streak</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-white">{user?.current_streak || 1} days</div>
                  <p className="text-blue-200 text-xs">Keep it up! 🔥</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              {/* Next Mission - Mobile optimized */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <Card className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-2 border-pink-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Zap className="h-5 w-5 text-pink-300" />
                      Your Next Mission
                    </CardTitle>
                    <CardDescription className="text-purple-200 text-sm">Continue your Bitcoin education journey</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white font-semibold text-sm md:text-base">
                          {nextModule ? nextModule.title : "All modules completed!"}
                        </h3>
                        <p className="text-purple-200 text-xs md:text-sm mt-1">
                          {nextModule ? nextModule.objective : "Congratulations on completing all available modules!"}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <Badge className="bg-orange-600 text-white border-orange-400 text-xs">
                          {nextModule ? `${nextModule.track} Track` : "Complete"}
                        </Badge>
                        <Button 
                          className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto text-sm" 
                          onClick={handleContinueLearning}
                        >
                          {nextModule ? "Continue Learning" : "Review Courses"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent zkCerts - Mobile optimized */}
                <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Award className="h-5 w-5 text-orange-300" />
                      Recent zkCerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3">
                      {certsLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-purple-300" />
                        </div>
                      ) : recentCerts.length > 0 ? (
                        recentCerts.map((cert, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg border border-purple-400/30"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Star className="h-4 w-4 md:h-5 md:w-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-white font-medium text-sm truncate">{cert.name}</p>
                                <p className="text-purple-200 text-xs">{cert.date}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-orange-400 text-orange-200 bg-orange-900/20 text-xs ml-2 flex-shrink-0">
                              {cert.track}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Award className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                          <p className="text-purple-100 text-sm md:text-base">No certificates earned yet</p>
                          <p className="text-purple-300 text-xs md:text-sm">Complete your first module to earn a zkCert!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications - Mobile optimized */}
              <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <Bell className="h-5 w-5 text-blue-300" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-3 md:space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={index} className="p-3 bg-purple-800/30 rounded-lg border border-purple-400/30">
                        <p className="text-white text-xs md:text-sm">{notification.message}</p>
                        <p className="text-white/80 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}