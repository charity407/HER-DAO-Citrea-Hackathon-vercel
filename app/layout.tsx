import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { ProgressProvider } from "@/lib/progress-context"
import { DynamicProvider } from "@/components/dynamic-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Proof of Learn - Bitcoin Education Platform",
  description: "Learn Bitcoin. Earn zkCerts. Join the Future.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicProvider>
          <AuthProvider>
            <ProgressProvider>{children}</ProgressProvider>
          </AuthProvider>
        </DynamicProvider>
      </body>
    </html>
  )
}