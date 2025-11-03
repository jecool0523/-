"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Stage5WorkspaceProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

const allHints = {
  descriptors: ["알록달록한", "커다란", "작은", "반짝이는"],
  context: ["숲속에서", "하늘을 날며", "물속에서", "산 위에서"],
  emotions: ["용감하게", "평화롭게", "신비롭게", "장난스럽게"],
}

export function Stage5Workspace({ onSubmit, isGenerating }: Stage5WorkspaceProps) {
  const [fullPrompt, setFullPrompt] = useState("")

  const handleHintClick = (word: string) => {
    setFullPrompt((prev) => (prev ? `${prev} ${word}` : word))
  }

  const handleSubmit = () => {
    onSubmit({ fullPrompt })
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm font-medium text-purple-900 mb-2">최종 도전!</p>
        <p className="text-sm text-purple-700">
          그림 없이 오직 언어만으로 상상 속 이미지를 만들어보세요. 지금까지 배운 모든 기술을 활용하세요!
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullPrompt">완전한 프롬프트 작성</Label>
        <Textarea
          id="fullPrompt"
          placeholder="예: 구름 위를 걷고 있는 무지갯빛 날개를 가진 아기 사자, 용감하게 포효하는 모습, 판타지 아트 스타일"
          value={fullPrompt}
          onChange={(e) => setFullPrompt(e.target.value)}
          rows={6}
          className="text-base"
        />
      </div>

      <div className="space-y-3">
        <Label>힌트 모음 (클릭하여 추가)</Label>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">꾸며주는 말</div>
          <div className="flex flex-wrap gap-2">
            {allHints.descriptors.map((word) => (
              <Badge
                key={word}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                onClick={() => handleHintClick(word)}
              >
                {word}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">상황</div>
          <div className="flex flex-wrap gap-2">
            {allHints.context.map((word) => (
              <Badge
                key={word}
                variant="secondary"
                className="cursor-pointer hover:bg-green-100 hover:text-green-700 transition-colors"
                onClick={() => handleHintClick(word)}
              >
                {word}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">감정</div>
          <div className="flex flex-wrap gap-2">
            {allHints.emotions.map((word) => (
              <Badge
                key={word}
                variant="secondary"
                className="cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition-colors"
                onClick={() => handleHintClick(word)}
              >
                {word}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!fullPrompt || isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            생성 중...
          </>
        ) : (
          "최종 제출"
        )}
      </Button>
    </div>
  )
}
