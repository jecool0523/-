import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

import { Acme as V0_Font_Acme, Geist, Geist_Mono } from "next/font/google"

const _acme = V0_Font_Acme({ subsets: ["latin"], weight: ["400"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "프롬프트 엔지니어링 학습 플랫폼",
  description: "디지털 약자를 위한 프롬프트 엔지니어링 교육 서비스",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
