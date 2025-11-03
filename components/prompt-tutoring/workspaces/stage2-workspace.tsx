"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Stage2WorkspaceProps {
  previousData: any
  onSubmit: (data: any) => void
  isGenerating: boolean
}

const hintWords = ["알록달록한", "커다란", "털이 복슬복슬한", "반짝이는", "작은", "부드러운", "날카로운", "둥근"]

export function Stage2Workspace({ previousData, onSubmit, isGenerating }: Stage2WorkspaceProps) {
  const [description, setDescription] = useState("")

  const handleHintClick = (word: string) => {
    setDescription((prev) => (prev ? `${prev}, ${word}` : word))
  }

  const handleSubmit = () => {
    onSubmit({ description })
  }

  return (
    <div className="space-y-6">
      {previousData?.descriptors && (
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <span className="font-medium">이전 단계: </span>
          {previousData.descriptors.join(", ")}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">더 자세히 묘사해주세요</Label>
        <Textarea
          id="description"
          placeholder="색깔, 무늬, 크기 등을 자세히 설명해주세요..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>힌트 카드 (클릭하여 추가)</Label>
        <div className="flex flex-wrap gap-2">
          {hintWords.map((word) => (
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

      <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!description || isGenerating}>
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
