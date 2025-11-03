"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lightbulb, ArrowLeft, ArrowRight } from "lucide-react"

interface MissionPanelProps {
  stage: number
  onPrevious?: () => void
  onNext?: () => void
}

const missionContent = {
  1: {
    title: "1단계: 아이디어 시각화",
    description: "그리고 싶은 걸 그리고 이름을 알려줘!",
    mascotMessage: "안녕! 그림을 그리고 이름을 알려주면, 내가 예시 없이도 바로 만들어줄게! 이게 제로 샷(Zero-Shot)이야.",
    tips: ["간단한 도형이나 물체를 그려보세요", "그린 것의 이름을 입력하세요", "AI가 즉시 이해하고 생성합니다"],
  },
  2: {
    title: "2단계: 아이디어 구체화",
    description: "AI에게 더 자세히 알려주자!",
    mascotMessage: "'반짝이는', '빨간', '3개'처럼 구체적인 단어를 추가하면 AI가 더 정확하게 만들어줘!",
    tips: ["색상, 크기, 수량을 명시하세요", "질감이나 분위기를 설명하세요", "위치나 배경을 추가하세요"],
  },
  3: {
    title: "3단계: 예시를 통한 설명",
    description: "AI에게 예시를 보여주자!",
    mascotMessage: "'행복한 동그라미' 예시처럼, '슬픈 삼각형'을 가르쳐주면 AI가 패턴을 배워!",
    tips: ["먼저 예시를 확인하세요", "비슷한 패턴으로 새로운 것을 만드세요", "AI가 예시에서 학습합니다"],
  },
  4: {
    title: "4단계: AI에게 역할 부여",
    description: "AI에게 역할을 주자!",
    mascotMessage: "AI에게 '최고의 요리사' 같은 역할을 주면 전문가처럼 답해줘!",
    tips: ["AI의 역할을 명확히 정의하세요", "전문가, 선생님, 예술가 등", "역할에 맞는 요청을 하세요"],
  },
  5: {
    title: "5단계: 단계별 구상",
    description: "단계별로 생각하자!",
    mascotMessage: "복잡한 것은 한 번에 말하기 어려워. 내 질문에 차근차근 답해줘!",
    tips: ["AI의 질문에 하나씩 답하세요", "각 단계가 모여 완성됩니다", "복잡한 프롬프트를 쉽게 만들 수 있어요"],
  },
}

export function MissionPanel({ stage, onPrevious, onNext }: MissionPanelProps) {
  const content = missionContent[stage as keyof typeof missionContent]

  return (
    <Card className="flex h-fit flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{content.title}</h2>
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </div>
      </div>

      {/* AI Mascot */}
      <div className="flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="flex-1 rounded-lg bg-orange-50 p-4 dark:bg-orange-950/20">
          <p className="text-sm font-medium text-orange-900 dark:text-orange-100">AI 마스코트</p>
          <p className="mt-1 text-sm text-orange-800 dark:text-orange-200">{content.mascotMessage}</p>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">학습 포인���</h3>
        <ul className="space-y-2">
          {content.tips.map((tip, index) => (
            <li key={index} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-auto space-y-2">
        {onPrevious && (
          <Button variant="outline" className="w-full bg-transparent" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전 단계
          </Button>
        )}
        {onNext && (
          <Button className="w-full" onClick={onNext}>
            다음 단계
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
