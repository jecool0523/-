"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, MessageSquare, Lightbulb, Zap } from "lucide-react"

interface OnboardingViewProps {
  onStart: () => void
}

export function OnboardingView({ onStart }: OnboardingViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome to AI Learning</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the power of Artificial Intelligence through interactive conversations
          </p>
        </div>

        {/* What is AI Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is AI?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Artificial Intelligence (AI) is technology that enables computers to perform tasks that typically require
            human intelligence. AI can understand language, recognize patterns, make decisions, and learn from
            experience. Think of it as a smart assistant that can help you solve problems, answer questions, and create
            content.
          </p>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Natural Conversations</h3>
              <p className="text-sm text-gray-600">Chat naturally with AI just like talking to a friend</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Smart Assistance</h3>
              <p className="text-sm text-gray-600">Get help with writing, learning, and problem-solving</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Instant Responses</h3>
              <p className="text-sm text-gray-600">Receive real-time answers and creative solutions</p>
            </div>
          </div>
        </Card>

        {/* Applications Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Can You Use AI?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Learning & Education</h4>
                <p className="text-sm text-gray-600">Get explanations, study help, and practice questions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Writing & Content</h4>
                <p className="text-sm text-gray-600">Draft emails, essays, and creative stories</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Problem Solving</h4>
                <p className="text-sm text-gray-600">Brainstorm ideas and find creative solutions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Daily Tasks</h4>
                <p className="text-sm text-gray-600">Plan schedules, organize information, and more</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning with AI
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-gray-500">Begin your interactive conversation to explore AI capabilities</p>
        </div>
      </div>
    </div>
  )
}
