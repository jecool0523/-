"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Edit, Download, Share2, RotateCcw } from "lucide-react"
import { Check } from "lucide-react"
import { useState } from "react"

interface Participant {
  name: string
  role: string
  avatar: string
}

interface FinalResultsProps {
  prompt: string
  participants: Participant[]
  images: string[]
}

export function FinalResults({ prompt, participants, images }: FinalResultsProps) {
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  const toggleImageSelection = (index: number) => {
    setSelectedImages((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">프롬프트 완성</h1>
          <p className="text-sm text-muted-foreground">모두의 아이디어가 하나로 합쳐졌습니다!</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">최종 프롬프트</h2>
            <p className="mb-4 text-balance leading-relaxed text-foreground">{prompt}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                복사
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                수정
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">참여자</h2>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                    <img
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">{participant.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">생성된 이미지</h2>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => toggleImageSelection(index)}
                  className={`group relative aspect-square overflow-hidden rounded-lg bg-muted transition-all ${
                    selectedImages.includes(index) ? "ring-4 ring-primary" : ""
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Generated ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {selectedImages.includes(index) && (
                    <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              갤러리에 저장
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              공유하기
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              다른 역할로 다시하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
