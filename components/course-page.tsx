"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { BookOpen, Lock, CheckCircle, Clock, Award, ChevronRight, ArrowLeft, Menu } from "lucide-react"
import { ZkCertMinter } from "@/components/zk-cert-minter"
import { useProgress } from "@/lib/progress-context"
import { useAuth } from "@/lib/auth-context"
import { courseContent, getAllTracks } from "@/lib/course-content"
import { useRouter, useSearchParams } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function CoursePage() {
  const [selectedModule, setSelectedModule] = useState("module-1")
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showZkCertMinter, setShowZkCertMinter] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { progress, updateProgress, getModuleStatus, isModuleUnlocked } = useProgress()
  const { user, updateUserStats } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const tracks = getAllTracks()

  // Get module from URL params or default to first module
  useEffect(() => {
    const moduleParam = searchParams.get("module")
    if (moduleParam && courseContent.find((m) => m.id === moduleParam)) {
      setSelectedModule(moduleParam)
    }
  }, [searchParams])

  const currentModule = courseContent.find((m) => m.id === selectedModule)
  const moduleStatus = getModuleStatus(selectedModule)
  const isUnlocked = isModuleUnlocked(selectedModule)

  const handleModuleSelect = (moduleId: string) => {
    if (isModuleUnlocked(moduleId)) {
      setSelectedModule(moduleId)
      setShowQuiz(false)
      setQuizCompleted(false)
      setSelectedAnswers({})
      setSidebarOpen(false)
      router.push(`/courses?module=${moduleId}`)
    }
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
    if (moduleStatus === "not_started") {
      updateProgress(selectedModule, "in_progress")
    }
  }

  const handleQuizSubmit = () => {
    if (!currentModule) return

    // Calculate score
    let correctAnswers = 0
    currentModule.quiz.forEach((question, index) => {
      const userAnswer = selectedAnswers[`question_${index}`]
      if (userAnswer !== undefined && Number.parseInt(userAnswer) === question.correct) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / currentModule.quiz.length) * 100)
    setQuizScore(score)

    if (score >= 70) {
      setQuizCompleted(true)
      updateProgress(selectedModule, "completed", score)

      // Award XP and sats
      const xpGained = 100 + (score - 70) * 2
      const satsGained = 1000 + (score - 70) * 50
      updateUserStats(xpGained, satsGained)
    } else {
      alert(`Score: ${score}%. You need 70% to pass. Please try again!`)
      setSelectedAnswers({})
    }
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [`question_${questionIndex}`]: answerIndex,
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-orange-400" />
      case "not_started":
        return <BookOpen className="h-5 w-5 text-purple-400" />
      default:
        return <Lock className="h-5 w-5 text-gray-400" />
    }
  }

  const getTrackColor = (track: string) => {
    const colors: Record<string, string> = {
      beginner: "from-green-500 to-emerald-600",
      intermediate: "from-blue-500 to-cyan-600",
      builder: "from-purple-500 to-pink-600",
      citrea: "from-orange-500 to-red-600",
    }
    return colors[track] || "from-gray-500 to-gray-600"
  }

  if (!currentModule) {
    return <div>Module not found</div>
  }

  // Mobile Course Navigation
  const MobileCourseNav = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-20 left-4 z-40 bg-black/50 text-white hover:bg-purple-800/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gray-900 border-purple-700 p-0">
        <div className="p-4 border-b border-purple-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push("/dashboard")
              setSidebarOpen(false)
            }}
            className="text-purple-200 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <h2 className="text-white text-lg font-bold">Course Tracks</h2>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {tracks.map((track) => (
            <div key={track.id} className="space-y-2">
              <h3 className="text-white font-semibold text-sm">{track.title}</h3>
              <p className="text-purple-300 text-xs mb-3">{track.description}</p>

              <div className="space-y-2">
                {track.modules.map((module) => {
                  const moduleStatus = getModuleStatus(module.id)
                  const isUnlocked = isModuleUnlocked(module.id)

                  return (
                    <button
                      key={module.id}
                      onClick={() => handleModuleSelect(module.id)}
                      disabled={!isUnlocked}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedModule === module.id
                          ? "bg-pink-500/20 border border-pink-400/30"
                          : !isUnlocked
                            ? "bg-gray-800/30 cursor-not-allowed"
                            : "bg-purple-900/30 hover:bg-purple-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isUnlocked ? getStatusIcon(moduleStatus) : <Lock className="h-5 w-5 text-gray-400" />}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${!isUnlocked ? "text-gray-400" : "text-white"}`}>
                            {module.title}
                          </p>
                          <p className="text-xs text-purple-300 truncate">{module.zkCert}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex">
          {/* Desktop Course Navigation */}
          <div className="hidden md:block w-80 bg-black/30 border-r border-purple-700 p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="text-purple-200 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>

            <h2 className="text-white text-xl font-bold mb-6">Course Tracks</h2>

            <div className="space-y-6">
              {tracks.map((track) => (
                <div key={track.id} className="space-y-2">
                  <h3 className="text-white font-semibold text-sm">{track.title}</h3>
                  <p className="text-purple-300 text-xs mb-3">{track.description}</p>

                  <div className="space-y-2">
                    {track.modules.map((module) => {
                      const moduleStatus = getModuleStatus(module.id)
                      const isUnlocked = isModuleUnlocked(module.id)

                      return (
                        <button
                          key={module.id}
                          onClick={() => handleModuleSelect(module.id)}
                          disabled={!isUnlocked}
                          className={`w-full p-3 rounded-lg text-left transition-colors ${
                            selectedModule === module.id
                              ? "bg-pink-500/20 border border-pink-400/30"
                              : !isUnlocked
                                ? "bg-gray-800/30 cursor-not-allowed"
                                : "bg-purple-900/30 hover:bg-purple-800/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isUnlocked ? getStatusIcon(moduleStatus) : <Lock className="h-5 w-5 text-gray-400" />}
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${!isUnlocked ? "text-gray-400" : "text-white"}`}>
                                {module.title}
                              </p>
                              <p className="text-xs text-purple-300">{module.zkCert}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Course Navigation */}
          <MobileCourseNav />

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
            <div className="max-w-4xl mx-auto">
              {!isUnlocked ? (
                <Card className="bg-gray-800/50 border-gray-600">
                  <CardContent className="pt-6 text-center p-4 md:p-6">
                    <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Module Locked</h3>
                    <p className="text-gray-400 text-sm">Complete the previous module to unlock this content.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Course Header - Mobile optimized */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className={`bg-gradient-to-r ${getTrackColor(currentModule.track)} text-white text-xs`}>
                        {currentModule.track} Track
                      </Badge>
                      <Badge variant="outline" className="border-green-400 text-green-400 text-xs">
                        {currentModule.id}
                      </Badge>
                      {moduleStatus === "completed" && <Badge className="bg-green-500 text-white text-xs">Completed</Badge>}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentModule.title}</h1>
                    <p className="text-purple-200 text-sm md:text-base">{currentModule.objective}</p>
                    <Progress value={moduleStatus === "completed" ? 100 : showQuiz ? 75 : 25} className="mt-4 h-2" />
                  </div>

                  {!showQuiz ? (
                    /* Lesson Content - Mobile optimized */
                    <Card className="bg-white/95 mb-6">
                      <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                          <BookOpen className="h-5 w-5" />
                          Lesson Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose max-w-none p-4 md:p-6 pt-0">
                        <div className="whitespace-pre-line text-gray-800 leading-relaxed text-sm md:text-base">{currentModule.lesson}</div>
                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
                          <Button onClick={handleStartQuiz} className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto">
                            {moduleStatus === "completed" ? "Retake Quiz" : "Take Quiz"}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    /* Quiz Section - Mobile optimized */
                    <Card className="bg-purple-900/20 border-purple-400/30">
                      <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                          <Award className="h-5 w-5 text-orange-400" />
                          Module Quiz
                        </CardTitle>
                        <CardDescription className="text-purple-200 text-sm">
                          Answer all questions correctly (70%+) to earn your zkCert
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                        {currentModule.quiz.map((question, questionIndex) => (
                          <div key={questionIndex} className="space-y-3 md:space-y-4">
                            <h3 className="text-white font-medium text-sm md:text-base">
                              {questionIndex + 1}. {question.question}
                            </h3>
                            <RadioGroup
                              value={selectedAnswers[`question_${questionIndex}`] || ""}
                              onValueChange={(value) => handleAnswerChange(questionIndex, value)}
                              className="space-y-2"
                            >
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-start space-x-2">
                                  <RadioGroupItem
                                    value={optionIndex.toString()}
                                    id={`q${questionIndex}-${optionIndex}`}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`q${questionIndex}-${optionIndex}`}
                                    className="text-purple-200 cursor-pointer text-sm leading-relaxed flex-1"
                                  >
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}

                        {!quizCompleted ? (
                          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                            <Button
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(selectedAnswers).length < currentModule.quiz.length}
                              className="bg-orange-500 hover:bg-orange-600 flex-1 sm:flex-none"
                            >
                              Submit Quiz
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowQuiz(false)}
                              className="border-purple-400 text-purple-400 hover:bg-purple-400/10 flex-1 sm:flex-none"
                            >
                              Back to Lesson
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Card className="bg-green-500/20 border-green-400/30">
                              <CardContent className="pt-4 md:pt-6 p-4 md:p-6">
                                <div className="text-center space-y-4">
                                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                                  <h3 className="text-white font-bold text-lg">Congratulations! 🎉</h3>
                                  <p className="text-green-200 text-sm">You scored {quizScore}% and completed the module!</p>
                                  <Button
                                    onClick={() => setShowZkCertMinter(true)}
                                    className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto"
                                  >
                                    <Award className="mr-2 h-4 w-4" />
                                    Mint zkCertificate
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            <ZkCertMinter
                              moduleData={{
                                id: currentModule.id,
                                title: currentModule.title,
                                objective: currentModule.objective,
                                zkCert: currentModule.zkCert,
                                track: currentModule.track,
                              }}
                              quizScore={quizScore}
                              userId={user?.id || "demo_user"}
                              isOpen={showZkCertMinter}
                              onClose={() => setShowZkCertMinter(false)}
                              onMintComplete={(result) => {
                                console.log("Certificate minted:", result)
                                // Find next module and navigate to it
                                const currentIndex = courseContent.findIndex((m) => m.id === selectedModule)
                                if (currentIndex >= 0 && currentIndex < courseContent.length - 1) {
                                  const nextModule = courseContent[currentIndex + 1]
                                  if (isModuleUnlocked(nextModule.id)) {
                                    router.push(`/courses?module=${nextModule.id}`)
                                  }
                                }
                              }}
                            />
                          </>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}