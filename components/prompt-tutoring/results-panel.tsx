"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, ArrowRight, Loader2 } from "lucide-react"

interface ResultsPanelProps {
  currentStage: number
  aiOutput: string | null
  isGenerating: boolean
  onNextStage: () => void
}

const learningPoints = {
  1: ["머릿속 이미지를 간단한 그림으로 표현하기", "핵심 설명 키워드 찾기", "주요 대상에 집중하기"],
  2: [
    "형용사를 사용하여 풍부하게 묘사하기",
    "색깔, 무늬, 크기 등 구체적 특징 표현하기",
    "힌트 카드 활용하여 어휘력 확장하기",
  ],
  3: ["배경과 행동을 추가하여 장면 구성하기", "대상과 환경의 관계 표현하기", "완성된 스토리 만들기"],
  4: ["감정과 분위기 표현하기", "추상적 개념을 언어로 전환하기", "스타일과 느낌 구체화하기"],
  5: ["시각적 보조 없이 텍스트만으로 표현하기", "모든 학습 요소 종합 활용하기", "완전한 프롬프트 작성 능력 습득하기"],
}

export function ResultsPanel({ currentStage, aiOutput, isGenerating, onNextStage }: ResultsPanelProps) {
  const points = learningPoints[currentStage as keyof typeof learningPoints]

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>AI 생성 결과</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-sm text-muted-foreground">생성 중...</p>
            </div>
          ) : aiOutput ? (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{aiOutput}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">결과가 여기에 표시됩니다...</p>
          )}
        </div>

        {aiOutput && currentStage < 5 && (
          <Button onClick={onNextStage} className="w-full" size="lg">
            다음 단계로
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {currentStage === 5 && aiOutput && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold text-green-700">프롬프트 아티스트 달성!</div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            핵심 학습 포인트
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-600 mt-0.5">•</span>
                <span className="text-green-900">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
