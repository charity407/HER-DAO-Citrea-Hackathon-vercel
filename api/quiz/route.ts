import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { getModuleById } from "@/lib/course-content"

export async function POST(request: NextRequest) {
  try {
    const { userId, moduleId, answers } = await request.json()

    if (!userId || !moduleId || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get module content to check answers
    const module = getModuleById(moduleId)
    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    // Calculate score
    let correctAnswers = 0
    const totalQuestions = module.quiz.length

    module.quiz.forEach((question, index) => {
      const userAnswer = answers[`question_${index}`]
      if (userAnswer !== undefined && Number.parseInt(userAnswer) === question.correct) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= 70 // 70% passing grade

    // Store quiz attempt
    const { data: quizAttempt, error: quizError } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: userId,
        module_id: moduleId,
        answers,
        score,
        passed,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (quizError) {
      console.error("Quiz storage error:", quizError)
      return NextResponse.json({ error: "Failed to store quiz attempt" }, { status: 500 })
    }

    // Update module progress if passed
    if (passed) {
      const { error: progressError } = await supabase.from("module_progress").upsert({
        user_id: userId,
        module_id: moduleId,
        status: "completed",
        quiz_score: score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (progressError) {
        console.error("Progress update error:", progressError)
      }

      // Award XP and sats
      const xpGained = 100 + (score - 70) * 2 // Base 100 XP + bonus for higher scores
      const satsEarned = 1000 + (score - 70) * 50 // Base 1000 sats + bonus

      const { error: rewardError } = await supabase.rpc("update_user_rewards", {
        user_id: userId,
        xp_gained: xpGained,
        sats_gained: satsEarned,
      })

      if (rewardError) {
        console.error("Reward update error:", rewardError)
      }
    }

    return NextResponse.json({
      success: true,
      score,
      passed,
      correctAnswers,
      totalQuestions,
      quizAttemptId: quizAttempt.id,
    })
  } catch (error) {
    console.error("Quiz API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const moduleId = searchParams.get("moduleId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    let query = supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })

    if (moduleId) {
      query = query.eq("module_id", moduleId)
    }

    const { data: attempts, error } = await query

    if (error) {
      console.error("Quiz fetch error:", error)
      return NextResponse.json({ error: "Failed to fetch quiz attempts" }, { status: 500 })
    }

    return NextResponse.json({ attempts })
  } catch (error) {
    console.error("Quiz API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
