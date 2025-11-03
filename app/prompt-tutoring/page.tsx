"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { JourneyMap } from "@/components/prompt-tutoring/journey-map"
import { MissionPanel } from "@/components/prompt-tutoring/mission-panel"
import { WorkspacePanel } from "@/components/prompt-tutoring/workspace-panel"
import { ResultsPanel } from "@/components/prompt-tutoring/results-panel"
import { generateImage } from "@/app/actions/generate-image"
import { useToast } from "@/hooks/use-toast"

export default function PromptTutoringPage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [stageData, setStageData] = useState({
    stage1: { drawing: "", name: "" },
    stage2: { descriptors: ["", ""] },
    stage3: { context: "" },
    stage4: { emotion: "" },
    stage5: { fullPrompt: "" },
  })
  const [aiOutput, setAiOutput] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const { toast } = useToast()

  const handleStageComplete = async (data: any) => {
    setIsGenerating(true)

    // Update stage data
    setStageData((prev) => ({
      ...prev,
      [`stage${currentStage}`]: data,
    }))

    // Build prompt from stage data
    let prompt = ""
    if (currentStage === 1) {
      prompt = data.name || ""
    } else if (currentStage === 2) {
      prompt = `${data.descriptors.filter(Boolean).join(" ")} ${stageData.stage1.name}`
    } else if (currentStage === 3) {
      prompt = `${stageData.stage2.descriptors.filter(Boolean).join(" ")} ${stageData.stage1.name} ${data.context}`
    } else if (currentStage === 4) {
      prompt = `${stageData.stage2.descriptors.filter(Boolean).join(" ")} ${stageData.stage1.name} ${stageData.stage3.context} with ${data.emotion} emotion`
    } else if (currentStage === 5) {
      prompt = data.fullPrompt || ""
    }

    console.log("[v0] Generating image with prompt:", prompt)

    const result = await generateImage(prompt)

    if (result.success && result.imageUrl) {
      setAiOutput(result.imageUrl)
    } else {
      toast({
        title: "이미지 생성 실패",
        description: result.error || "이미지를 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      setAiOutput(null)
    }

    setIsGenerating(false)
  }

  const handleNextStage = () => {
    if (currentStage < 5) {
      setCurrentStage(currentStage + 1)
      setAiOutput(null)
    }
  }

  const totalProgress = (currentStage / 5) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <JourneyMap currentStage={currentStage} progress={totalProgress} />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <MissionPanel currentStage={currentStage} />
          </div>

          <div className="lg:col-span-6">
            <WorkspacePanel
              currentStage={currentStage}
              stageData={stageData}
              onSubmit={handleStageComplete}
              isGenerating={isGenerating}
            />
          </div>

          <div className="lg:col-span-3">
            <ResultsPanel
              currentStage={currentStage}
              aiOutput={aiOutput}
              isGenerating={isGenerating}
              onNextStage={handleNextStage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
