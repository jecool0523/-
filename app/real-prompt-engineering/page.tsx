"use client"

import { useState } from "react"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MissionPanel } from "@/components/real-prompt/mission-panel"
import { InteractionPanel } from "@/components/real-prompt/interaction-panel"
import { ResultsPanel } from "@/components/real-prompt/results-panel"
import { generateImage } from "@/app/actions/generate-image"
import { useToast } from "@/hooks/use-toast"

const stages = [
  {
    id: 1,
    title: "제로샷 프롬프팅",
    description: "AI와의 첫 만남",
  },
  {
    id: 2,
    title: "구체성과 제약조건",
    description: "구체적인 키워드의 힘",
  },
  {
    id: 3,
    title: "퓨샷 프롬프팅",
    description: "예시로 AI 가르치기",
  },
  {
    id: 4,
    title: "역할 부여",
    description: "AI에게 역할 부여하기",
  },
  {
    id: 5,
    title: "사고의 연쇄",
    description: "단계별로 생각하기",
  },
]

export default function RealPromptEngineeringPage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [userInput, setUserInput] = useState<any>({})
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)
  const [exampleData, setExampleData] = useState<{ prompt: string; image: string } | null>(null)

  const progress = (currentStage / stages.length) * 100

  const handleNext = () => {
    if (currentStage < stages.length) {
      setCurrentStage(currentStage + 1)
      setUserInput({})
      setGeneratedResult(null)
    }
  }

  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1)
      setUserInput({})
      setGeneratedResult(null)
    }
  }

  const { toast } = useToast()

  const handleGenerate = async (input: any) => {
    setUserInput(input)

    if (currentStage === 3 && input.isExample) {
      const prompt = input.prompt || ""
      console.log("[v0] Generating example image with prompt:", prompt)

      const result = await generateImage(prompt)

      if (result.success && result.imageUrl) {
        setExampleData({ prompt, image: result.imageUrl })
      } else {
        toast({
          title: "이미지 생성 실패",
          description: result.error || "이미지를 생성하는 중 오류가 발생했습니다.",
          variant: "destructive",
        })
      }
      return
    }

    // Build prompt from input based on stage
    let prompt = ""
    if (currentStage === 1) {
      prompt = input.prompt || ""
    } else if (currentStage === 2) {
      prompt = input.prompt || ""
    } else if (currentStage === 3) {
      prompt = input.prompt || ""
    } else if (currentStage === 4) {
      prompt = `You are a ${input.role}. ${input.request}`
    } else if (currentStage === 5) {
      prompt = input.chatMessages?.[input.chatMessages.length - 1]?.content || ""
    }

    console.log("[v0] Generating image with prompt:", prompt)

    const result = await generateImage(prompt)

    if (result.success && result.imageUrl) {
      setGeneratedResult(result.imageUrl)
    } else {
      toast({
        title: "이미지 생성 실패",
        description: result.error || "이미지를 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      setGeneratedResult(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">리얼 프롬프트 엔지니어링</h1>
              <p className="text-sm text-muted-foreground">
                단계 {currentStage}: {stages[currentStage - 1].title}
              </p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              메인 메뉴로 돌아가기
            </Button>
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">학습 진행도</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% 완료</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content - 3 Panel Layout */}
      <div className="container mx-auto grid grid-cols-1 gap-6 p-6 lg:grid-cols-[320px_1fr_400px]">
        {/* Left Panel - Mission */}
        <MissionPanel
          stage={currentStage}
          onPrevious={currentStage > 1 ? handlePrevious : undefined}
          onNext={currentStage < stages.length ? handleNext : undefined}
        />

        {/* Center Panel - Interaction */}
        <InteractionPanel
          stage={currentStage}
          userInput={userInput}
          onGenerate={handleGenerate}
          exampleData={exampleData}
        />

        {/* Right Panel - Results */}
        <ResultsPanel stage={currentStage} result={generatedResult} userInput={userInput} exampleData={exampleData} />
      </div>
    </div>
  )
}
