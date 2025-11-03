"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface Stage3WorkspaceProps {
  previousData: any
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export function Stage3Workspace({ previousData, onSubmit, isGenerating }: Stage3WorkspaceProps) {
  const [context, setContext] = useState("")

  const handleSubmit = () => {
    onSubmit({ context })
  }

  const previousText = [previousData?.descriptors?.join(", "), previousData?.description].filter(Boolean).join(", ")

  return (
    <div className="space-y-6">
      {previousText && (
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <span className="font-medium">지금까지의 묘사: </span>
          {previousText}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="context">상황을 추가해주세요</Label>
        <Textarea
          id="context"
          placeholder="어디에 있나요? 무엇을 하고 있나요? (예: 숲속에서 잠자는, 바닷가에서 점프하는)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <strong>팁:</strong> 배경(장소)과 행동(동작)을 함께 설명하면 더 생동감 있는 장면이 만들어져요!
      </div>

      <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!context || isGenerating}>
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
