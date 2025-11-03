"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Stage4WorkspaceProps {
  previousData: any
  onSubmit: (data: any) => void
  isGenerating: boolean
}

const emotionHints = [
  "용감하게",
  "수줍게",
  "카리스마 있게",
  "평화롭게",
  "신비롭게",
  "장난스럽게",
  "위엄 있게",
  "친근하게",
]

export function Stage4Workspace({ previousData, onSubmit, isGenerating }: Stage4WorkspaceProps) {
  const [emotion, setEmotion] = useState("")

  const handleHintClick = (word: string) => {
    setEmotion((prev) => (prev ? `${prev}, ${word}` : word))
  }

  const handleSubmit = () => {
    onSubmit({ emotion })
  }

  const previousText = [previousData?.descriptors?.join(", "), previousData?.description, previousData?.context]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="space-y-6">
      {previousText && (
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <span className="font-medium">지금까지의 프롬프트: </span>
          {previousText}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="emotion">감정/스타일을 추가해주세요</Label>
        <Textarea
          id="emotion"
          placeholder="어떤 느낌인가요? 어떤 분위기인가요?"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>감정 힌트 카드 (클릭하여 추가)</Label>
        <div className="flex flex-wrap gap-2">
          {emotionHints.map((word) => (
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

      <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!emotion || isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            생성 중...
          </>
        ) : (
          "제출"
        )}
      </Button>
    </div>
  )
}
