"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Zap, Shield, Award, BookOpen, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WalletConnector } from "@/components/wallet-connector"
import { useAuth } from "@/lib/auth-context"

export function LandingPage() {
  const [showWalletConnector, setShowWalletConnector] = useState(false)
  const [email, setEmail] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      setShowWalletConnector(true)
    }
  }

  const handleNewsletterSignup = () => {
    if (email) {
      // Mock newsletter signup
      alert(`Thanks for subscribing with ${email}!`)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Learn Bitcoin.
                  <br />
                  <span className="text-pink-400">Earn zkCerts.</span>
                  <br />
                  Join the Future.
                </h1>
                <p className="text-xl text-purple-200 max-w-lg">
                  Master Bitcoin with interactive quests and get certified using zero-knowledge proofs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg"
                  onClick={handleGetStarted}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {user ? "Go to Dashboard" : "Connect Wallet to Begin"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-300 text-purple-100 hover:bg-purple-800 px-8 py-4 text-lg"
                  onClick={() => router.push("/courses")}
                >
                  Explore Courses
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-12 w-12 text-white" />
                  </div>
                  <p className="text-purple-200">Afro-futurist Bitcoin Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Your journey to Bitcoin mastery in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-purple-900/50 border-purple-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Learn Interactive Bitcoin Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 text-center">
                  Progress through comprehensive modules from beginner to advanced Bitcoin concepts
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/50 border-purple-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Complete Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 text-center">
                  Test your knowledge with interactive quizzes and unlock the next level
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/50 border-purple-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Earn zkCerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200 text-center">
                  Get verifiable certificates on Bitcoin using zero-knowledge proofs
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured zkCerts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured zkCerts</h2>
            <p className="text-purple-200 text-lg">Verifiable achievements powered by zero-knowledge proofs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bitcoin Origins Scholar", hash: "0x1a2b3c...", track: "Beginner" },
              { name: "Wallet Guardian", hash: "0x4d5e6f...", track: "Beginner" },
              { name: "Lightning Privacy Adept", hash: "0x7g8h9i...", track: "Intermediate" },
              { name: "Citrea Pioneer", hash: "0xjklmno...", track: "Advanced" },
            ].map((cert, index) => (
              <Card key={index} className="bg-gradient-to-br from-purple-800/50 to-pink-900/30 border-pink-400/30">
                <CardHeader>
                  <Badge className="bg-pink-500 text-white w-fit">{cert.track}</Badge>
                  <CardTitle className="text-white text-sm">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-purple-200 text-xs">Proof Hash:</p>
                    <p className="text-pink-400 font-mono text-xs">{cert.hash}</p>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      zkVerified ✓
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Powered By</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {["Citrea", "HER DAO"].map((partner) => (
              <div key={partner} className="text-purple-200 font-semibold text-lg">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Stay Updated</h4>
              <p className="text-purple-200">Get notified about new courses and features</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-300"
                />
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleNewsletterSignup}>
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/courses" className="text-purple-200 hover:text-pink-400">
                  Courses
                </Link>
                <Link href="/wallet" className="text-purple-200 hover:text-pink-400">
                  Wallet
                </Link>
                <Link href="/blog" className="text-purple-200 hover:text-pink-400">
                  Blog
                </Link>
                <Link href="/github" className="text-purple-200 hover:text-pink-400">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-12 pt-8 text-center">
            <p className="text-purple-300">© 2024 Proof of Learn. Powered by Citrea ZK-Rollups.</p>
          </div>
        </div>
      </footer>

      <WalletConnector isOpen={showWalletConnector} onClose={() => setShowWalletConnector(false)} />
    </div>
  )
}