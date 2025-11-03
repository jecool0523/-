"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DrawingCanvas } from "@/components/block-coding/drawing-canvas"
import { SentenceAssemblyTray } from "@/components/block-coding/sentence-assembly-tray"
import { BlockLibrary } from "@/components/block-coding/block-library"
import { ResultsPanel } from "@/components/block-coding/results-panel"
import { AiGuidePanel } from "@/components/block-coding/ai-guide-panel"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { generateImage } from "@/app/actions/generate-image"
import { useToast } from "@/hooks/use-toast"

export default function PromptBlockCodingPage() {
  const [drawnSubject, setDrawnSubject] = useState<string | null>(null)
  const [assembledBlocks, setAssembledBlocks] = useState<{
    adjectives: string[]
    subject: string | null
    action: string | null
    location: string | null
  }>({
    adjectives: [],
    subject: null,
    action: null,
    location: null,
  })
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<"drawing" | "assembly" | "results">("drawing")

  const { toast } = useToast()

  const handleDrawingComplete = (subject: string) => {
    setDrawnSubject(subject)
    setAssembledBlocks((prev) => ({ ...prev, subject }))
    setCurrentStep("assembly")
  }

  const handleBlockDrop = (type: "adjectives" | "subject" | "action" | "location", value: string) => {
    setAssembledBlocks((prev) => {
      if (type === "adjectives") {
        return { ...prev, adjectives: [...prev.adjectives, value] }
      }
      return { ...prev, [type]: value }
    })
  }

  const handleBlockRemove = (type: "adjectives" | "subject" | "action" | "location", index?: number) => {
    setAssembledBlocks((prev) => {
      if (type === "adjectives" && index !== undefined) {
        return {
          ...prev,
          adjectives: prev.adjectives.filter((_, i) => i !== index),
        }
      }
      return { ...prev, [type]: null }
    })
  }

  const getAssembledPrompt = () => {
    const parts: string[] = []

    if (assembledBlocks.location) {
      parts.push(assembledBlocks.location)
    }

    if (assembledBlocks.adjectives.length > 0) {
      parts.push(assembledBlocks.adjectives.join(", "))
    }

    if (assembledBlocks.subject) {
      parts.push(assembledBlocks.subject)
    }

    if (assembledBlocks.action) {
      parts.push(assembledBlocks.action)
    }

    return parts.length > 0 ? `A drawing of ${parts.join(" ")}` : ""
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setCurrentStep("results")

    const prompt = getAssembledPrompt()
    console.log("[v0] Generating image with prompt:", prompt)

    const result = await generateImage(prompt)

    if (result.success && result.imageUrl) {
      setGeneratedImage(result.imageUrl)
    } else {
      toast({
        title: "이미지 생성 실패",
        description: result.error || "이미지를 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }

    setIsGenerating(false)
  }

  const handleReset = () => {
    setDrawnSubject(null)
    setAssembledBlocks({
      adjectives: [],
      subject: null,
      action: null,
      location: null,
    })
    setGeneratedImage(null)
    setCurrentStep("drawing")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - AI Guide */}
        <AiGuidePanel currentStep={currentStep} />

        {/* Center Panel - Main Interaction */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            <Link href="/">
              <Button variant="ghost" className="mb-4 gap-2">
                <ArrowLeft className="h-4 w-4" />
                메인 메뉴로 돌아가기
              </Button>
            </Link>

            <div className="space-y-6">
              {/* Drawing Canvas */}
              {currentStep === "drawing" && <DrawingCanvas onComplete={handleDrawingComplete} />}

              {/* Sentence Assembly Tray */}
              {(currentStep === "assembly" || currentStep === "results") && (
                <SentenceAssemblyTray
                  blocks={assembledBlocks}
                  onBlockRemove={handleBlockRemove}
                  assembledPrompt={getAssembledPrompt()}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  canGenerate={!!assembledBlocks.subject}
                />
              )}

              {/* Block Library */}
              {currentStep === "assembly" && <BlockLibrary onBlockDrop={handleBlockDrop} />}
            </div>
          </div>
        </main>

        {/* Right Panel - Results */}
        <ResultsPanel
          assembledPrompt={getAssembledPrompt()}
          generatedImage={generatedImage}
          isGenerating={isGenerating}
          onReset={handleReset}
          show={currentStep === "results"}
        />
      </div>
    </div>
  )
}
