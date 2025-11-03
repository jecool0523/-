"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultsPanelProps {
  assembledPrompt: string
  generatedImage: string | null
  isGenerating: boolean
  onReset: () => void
  show: boolean
}

export function ResultsPanel({ assembledPrompt, generatedImage, isGenerating, onReset, show }: ResultsPanelProps) {
  return (
    <aside className={cn("w-96 border-l bg-muted/30 p-6 transition-all", !show && "hidden")}>
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold">결과</h2>
          <p className="text-sm text-muted-foreground">완성된 프롬프트와 AI가 생성한 이미지</p>
        </div>

        {/* Assembled Prompt */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">완성된 프롬프트</h3>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm leading-relaxed">{assembledPrompt}</p>
          </div>
        </div>

        {/* Generated Image */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">AI 생성 이미지</h3>
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            {isGenerating ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">이미지 생성 중...</p>
                </div>
              </div>
            ) : generatedImage ? (
              <img src={generatedImage || "/placeholder.svg"} alt="Generated" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">이미지가 여기에 표시됩니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {generatedImage && (
          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              이미지 저장
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              다시 시작하기
            </Button>
          </div>
        )}

        {/* Feedback */}
        {generatedImage && (
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              잘했어요! 블록을 조립하듯 문장을 만드니 정말 쉽죠? 이렇게 하면 실수 없이 AI에게 정확하게 명령할 수 있어요!
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
