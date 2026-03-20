import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { EnterpriseProvider } from "@/lib/enterprise-context"
import { Providers } from "./providers"
import { ChunkErrorRecovery } from "@/components/chunk-error-recovery"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Intelligent Console",
  description: "Spyne Intelligent Console for Dealer Operations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        <Providers>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light" disableTransitionOnChange>
          <EnterpriseProvider>
            <ChunkErrorRecovery />
            {children}
            <Toaster />
          </EnterpriseProvider>
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
