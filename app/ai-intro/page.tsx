"use client"

import { useState } from "react"
import { OnboardingView } from "@/components/ai-intro/onboarding-view"
import { ChatView } from "@/components/ai-intro/chat-view"

export default function AIIntroPage() {
  const [showChat, setShowChat] = useState(false)

  if (!showChat) {
    return <OnboardingView onStart={() => setShowChat(true)} />
  }

  return <ChatView />
}
