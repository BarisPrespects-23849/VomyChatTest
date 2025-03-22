import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SettingsProvider } from "@/contexts/settings-context"
import { AuthProvider } from "@/contexts/auth-context"
import { AppLayout } from "@/components/layout/app-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vomy Chat - Connect, Share, and Thrive Together!",
  description: "A modern Linktree alternative for creators and businesses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="theme-transition">
      <head>
        {/* Preload critical CSS to prevent FOUC (Flash of Unstyled Content) */}
        <link rel="preload" href="/globals.css" as="style" />
        {/* Meta tag to ensure proper dark mode detection */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} theme-transition theme-stable-layout`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          forcedTheme={undefined}
        >
          <AuthProvider>
            <SettingsProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
        <div id="dialog-portal-root" />
      </body>
    </html>
  )
}



import './globals.css'