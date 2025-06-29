"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/lib/auth-context"
import {
  Settings,
  User,
  Wallet,
  Bell,
  Shield,
  Zap,
  Download,
  Trash2,
  ExternalLink,
  Moon,
  Sun,
  Globe,
} from "lucide-react"

export function SettingsPage() {
  const { user, signOut } = useAuth()
  const [username, setUsername] = useState(user?.username || "")
  const [notifications, setNotifications] = useState({
    courseCompletion: true,
    zkCertMinting: true,
    satsEarned: true,
    weeklyDigest: false,
    marketingEmails: false,
  })
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: false,
    showCertificates: true,
  })
  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    currency: "sats",
    autoClaimRewards: true,
    soundEffects: true,
  })

  const handleSaveProfile = () => {
    // In real implementation, update user profile in database
    console.log("Saving profile:", { username })
    alert("Profile updated successfully!")
  }

  const handleExportData = () => {
    const userData = {
      profile: user,
      progress: JSON.parse(localStorage.getItem("proofoflearn_progress") || "{}"),
      certificates: JSON.parse(localStorage.getItem("zkCertificates") || "[]"),
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `proofoflearn-data-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In real implementation, delete user data from database
      localStorage.clear()
      signOut()
      alert("Account deleted successfully.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-purple-200 text-sm md:text-base">Manage your account and learning preferences</p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
              <TabsList className="bg-black/50 border-2 border-purple-400/50 backdrop-blur-sm p-1 w-full overflow-x-auto">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs md:text-sm"
                >
                  <User className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="wallet"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs md:text-sm"
                >
                  <Wallet className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Wallet</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs md:text-sm"
                >
                  <Bell className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs md:text-sm"
                >
                  <Shield className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white text-xs md:text-sm"
                >
                  <Settings className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Preferences</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="grid gap-4 md:gap-6">
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Profile Information</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">
                        Update your personal information and learning profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white text-sm">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          className="bg-purple-900/50 border-2 border-purple-400/50 text-white placeholder:text-purple-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white text-sm">Wallet Address</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={user?.wallet_address || ""}
                            readOnly
                            className="bg-gray-800/50 border-2 border-gray-600/50 text-gray-300 font-mono text-sm"
                          />
                          <Badge className="bg-green-600 text-white">Connected</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm">Total XP</Label>
                          <div className="text-xl md:text-2xl font-bold text-white">{user?.total_xp || 0}</div>
                        </div>
                        <div>
                          <Label className="text-white text-sm">Sats Earned</Label>
                          <div className="text-xl md:text-2xl font-bold text-white">{user?.sats_earned || 0}</div>
                        </div>
                      </div>

                      <Button
                        onClick={handleSaveProfile}
                        className="bg-pink-600 hover:bg-pink-700 text-white w-full md:w-auto"
                      >
                        Save Profile
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet">
                <div className="grid gap-4 md:gap-6">
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Wallet Settings</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">
                        Manage your Bitcoin wallet connections and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-green-600/20 rounded-lg border-2 border-green-400/50 gap-4">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-8 w-8 text-green-300" />
                          <div>
                            <p className="text-white font-medium text-sm md:text-base">Primary Wallet</p>
                            <p className="text-white text-sm">Alby Wallet - Connected</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-green-400 text-white hover:bg-green-400/20 w-full md:w-auto"
                        >
                          Disconnect
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Auto-claim Rewards</Label>
                            <p className="text-white text-sm">Automatically claim sats when earned</p>
                          </div>
                          <Switch
                            checked={preferences.autoClaimRewards}
                            onCheckedChange={(checked) =>
                              setPreferences((prev) => ({ ...prev, autoClaimRewards: checked }))
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white text-sm">Default Currency Display</Label>
                          <Select
                            value={preferences.currency}
                            onValueChange={(value) => setPreferences((prev) => ({ ...prev, currency: value }))}
                          >
                            <SelectTrigger className="bg-purple-900/50 border-2 border-purple-400/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-400/50">
                              <SelectItem value="sats">Satoshis (sats)</SelectItem>
                              <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                              <SelectItem value="usd">US Dollar (USD)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Zap className="mr-2 h-4 w-4" />
                        Connect Lightning Wallet
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <div className="grid gap-4 md:gap-6">
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Notification Preferences</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">
                        Choose what notifications you want to receive
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Course Completion</Label>
                            <p className="text-white text-sm">Get notified when you complete a module</p>
                          </div>
                          <Switch
                            checked={notifications.courseCompletion}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, courseCompletion: checked }))
                            }
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">zkCert Minting</Label>
                            <p className="text-white text-sm">Notifications about certificate minting status</p>
                          </div>
                          <Switch
                            checked={notifications.zkCertMinting}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, zkCertMinting: checked }))
                            }
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Sats Earned</Label>
                            <p className="text-white text-sm">Get notified when you earn sats</p>
                          </div>
                          <Switch
                            checked={notifications.satsEarned}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, satsEarned: checked }))
                            }
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Weekly Digest</Label>
                            <p className="text-white text-sm">Weekly summary of your learning progress</p>
                          </div>
                          <Switch
                            checked={notifications.weeklyDigest}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, weeklyDigest: checked }))
                            }
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Marketing Emails</Label>
                            <p className="text-white text-sm">Updates about new features and courses</p>
                          </div>
                          <Switch
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) =>
                              setNotifications((prev) => ({ ...prev, marketingEmails: checked }))
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <div className="grid gap-4 md:gap-6">
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Privacy Settings</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">
                        Control what information is visible to other users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Show Profile</Label>
                            <p className="text-white text-sm">Make your profile visible to other learners</p>
                          </div>
                          <Switch
                            checked={privacy.showProfile}
                            onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showProfile: checked }))}
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Show Progress</Label>
                            <p className="text-white text-sm">Display your learning progress publicly</p>
                          </div>
                          <Switch
                            checked={privacy.showProgress}
                            onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showProgress: checked }))}
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Show Certificates</Label>
                            <p className="text-white text-sm">Allow others to view your zkCertificates</p>
                          </div>
                          <Switch
                            checked={privacy.showCertificates}
                            onCheckedChange={(checked) =>
                              setPrivacy((prev) => ({ ...prev, showCertificates: checked }))
                            }
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-600/20 rounded-lg border-2 border-yellow-400/50">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-yellow-300 mt-0.5" />
                          <div>
                            <p className="text-white font-medium text-sm">Privacy Notice</p>
                            <p className="text-white text-xs mt-1">
                              Your wallet address and zkCertificate proofs are always cryptographically verifiable
                              on-chain, regardless of these privacy settings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Data Management */}
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Data Management</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">Export or delete your account data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-600/20 rounded-lg border border-blue-400/30 gap-4">
                        <div>
                          <p className="text-white font-medium text-sm">Export Data</p>
                          <p className="text-white text-sm">Download all your learning data and certificates</p>
                        </div>
                        <Button
                          onClick={handleExportData}
                          variant="outline"
                          className="border-blue-400 text-white hover:bg-blue-400/20 w-full md:w-auto"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-red-600/20 rounded-lg border border-red-400/30 gap-4">
                        <div>
                          <p className="text-white font-medium text-sm">Delete Account</p>
                          <p className="text-white text-sm">Permanently delete your account and all data</p>
                        </div>
                        <Button
                          onClick={handleDeleteAccount}
                          variant="outline"
                          className="border-red-400 text-white hover:bg-red-400/20 w-full md:w-auto"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <div className="grid gap-4 md:gap-6">
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">App Preferences</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">Customize your learning experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label className="text-white text-sm">Theme</Label>
                          <Select
                            value={preferences.theme}
                            onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
                          >
                            <SelectTrigger className="bg-purple-900/50 border-2 border-purple-400/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-400/50">
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  Dark
                                </div>
                              </SelectItem>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  Light
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white text-sm">Language</Label>
                          <Select
                            value={preferences.language}
                            onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
                          >
                            <SelectTrigger className="bg-purple-900/50 border-2 border-purple-400/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-400/50">
                              <SelectItem value="en">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  English
                                </div>
                              </SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <Label className="text-white text-sm">Sound Effects</Label>
                            <p className="text-white text-sm">Play sounds for achievements and interactions</p>
                          </div>
                          <Switch
                            checked={preferences.soundEffects}
                            onCheckedChange={(checked) =>
                              setPreferences((prev) => ({ ...prev, soundEffects: checked }))
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Preferences */}
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">Learning Preferences</CardTitle>
                      <CardDescription className="text-purple-100 text-sm">
                        Customize your educational experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm">Difficulty Level</Label>
                          <Select defaultValue="intermediate">
                            <SelectTrigger className="bg-purple-900/50 border-2 border-purple-400/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-400/50">
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white text-sm">Quiz Attempts</Label>
                          <Select defaultValue="unlimited">
                            <SelectTrigger className="bg-purple-900/50 border-2 border-purple-400/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-400/50">
                              <SelectItem value="1">1 Attempt</SelectItem>
                              <SelectItem value="3">3 Attempts</SelectItem>
                              <SelectItem value="unlimited">Unlimited</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* About */}
                  <Card className="bg-black/40 border-2 border-purple-400/50 backdrop-blur-sm">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-white text-lg md:text-xl">About Proof of Learn</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white text-sm">Version</p>
                          <p className="text-white font-mono text-sm">v1.0.0</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">Network</p>
                          <p className="text-white text-sm">Bitcoin Testnet</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">zkRollup</p>
                          <p className="text-white text-sm">Citrea Testnet</p>
                        </div>
                        <div>
                          <p className="text-white text-sm">Build</p>
                          <p className="text-white font-mono text-sm">2024.01.25</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="border-purple-400 text-white hover:bg-purple-400/20"
                          size="sm"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Documentation
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-400 text-white hover:bg-purple-400/20"
                          size="sm"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-400 text-white hover:bg-purple-400/20"
                          size="sm"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}