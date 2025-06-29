"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, BookOpen, Award, BracketsIcon as Bridge, Wallet, Settings, Zap, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CitreaStatus } from "@/components/citrea-status"
import { useAuth } from "@/lib/auth-context"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Courses", href: "/courses" },
    { icon: Award, label: "zkCerts", href: "/zkcerts" },
    { icon: Bridge, label: "Bridge BTC", href: "/bridge" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    setOpen(false)
  }

  const handleNavigation = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden md:flex w-64 bg-black/50 border-r border-purple-700 p-6 flex-col h-screen">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">Proof of Learn</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/courses" && pathname.startsWith("/courses"))

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-pink-500/20 text-pink-400 border-pink-400/30"
                    : "text-white hover:text-white hover:bg-purple-800/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      {user && (
        <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
          <div className="text-white text-sm font-medium mb-2">{user.username || `User ${user.id.slice(0, 8)}`}</div>
          <div className="text-white/80 text-xs mb-3">
            {user.wallet_address.slice(0, 8)}...{user.wallet_address.slice(-8)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full text-white hover:text-white hover:bg-purple-800/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}

      {/* Wallet Status */}
      <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
        <div className="text-white text-sm font-medium mb-2">Wallet Status</div>
        <Badge className="bg-green-500 text-white mb-2">Connected</Badge>
        <div className="text-white/80 text-xs">Balance: 0.00125 BTC</div>
      </div>

      {/* Citrea Status */}
      <div className="mt-4">
        <CitreaStatus />
      </div>
    </div>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50 bg-black/50 text-white hover:bg-purple-800/50"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gray-900 border-purple-700 p-0">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-purple-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Proof of Learn</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href === "/courses" && pathname.startsWith("/courses"))

              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive
                      ? "bg-pink-500/20 text-pink-400 border-pink-400/30"
                      : "text-white hover:text-white hover:bg-purple-800/50"
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* User Info */}
          {user && (
            <div className="p-6 border-t border-purple-700">
              <div className="p-4 bg-purple-900/30 rounded-lg mb-4">
                <div className="text-white text-sm font-medium mb-2">{user.username || `User ${user.id.slice(0, 8)}`}</div>
                <div className="text-white/80 text-xs mb-3">
                  {user.wallet_address.slice(0, 8)}...{user.wallet_address.slice(-8)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="w-full text-white hover:text-white hover:bg-purple-800/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Wallet Status */}
              <div className="p-4 bg-purple-900/30 rounded-lg mb-4">
                <div className="text-white text-sm font-medium mb-2">Wallet Status</div>
                <Badge className="bg-green-500 text-white mb-2">Connected</Badge>
                <div className="text-white/80 text-xs">Balance: 0.00125 BTC</div>
              </div>

              {/* Citrea Status */}
              <CitreaStatus />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}