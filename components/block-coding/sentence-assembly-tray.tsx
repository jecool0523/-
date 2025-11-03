"use client"

import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface SentenceAssemblyTrayProps {
  blocks: {
    adjectives: string[]
    subject: string | null
    action: string | null
    location: string | null
  }
  onBlockRemove: (type: "adjectives" | "subject" | "action" | "location", index?: number) => void
  assembledPrompt: string
  onGenerate: () => void
  isGenerating: boolean
  canGenerate: boolean
}

export function SentenceAssemblyTray({
  blocks,
  onBlockRemove,
  assembledPrompt,
  onGenerate,
  isGenerating,
  canGenerate,
}: SentenceAssemblyTrayProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">문장 조립 트레이</h2>
        <Button variant="ghost" size="icon">
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>

      {/* Assembled Prompt Display */}
      {assembledPrompt && (
        <div className="mb-4 rounded-lg bg-primary/5 p-4">
          <p className="text-sm font-medium text-muted-foreground">완성된 프롬프트:</p>
          <p className="mt-1 text-lg font-semibold">{assembledPrompt}</p>
        </div>
      )}

      {/* Assembly Slots */}
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border-2 border-dashed p-4">
        {/* Location Slot */}
        {blocks.location ? (
          <BlockChip text={blocks.location} color="blue" onRemove={() => onBlockRemove("location")} />
        ) : (
          <EmptySlot label="장소" />
        )}

        {/* Adjectives Slots */}
        {blocks.adjectives.map((adj, index) => (
          <BlockChip key={index} text={adj} color="green" onRemove={() => onBlockRemove("adjectives", index)} />
        ))}
        {blocks.adjectives.length < 3 && <EmptySlot label="꾸미는 말" />}

        {/* Subject Slot */}
        {blocks.subject ? (
          <BlockChip text={blocks.subject} color="purple" onRemove={() => onBlockRemove("subject")} />
        ) : (
          <EmptySlot label="주인공" />
        )}

        {/* Action Slot */}
        {blocks.action ? (
          <BlockChip text={blocks.action} color="orange" onRemove={() => onBlockRemove("action")} />
        ) : (
          <EmptySlot label="하는 일" />
        )}
      </div>

      <Button onClick={onGenerate} disabled={!canGenerate || isGenerating} className="w-full" size="lg">
        {isGenerating ? "생성 중..." : "이미지 생성하기"}
      </Button>
    </div>
  )
}

function BlockChip({
  text,
  color,
  onRemove,
}: {
  text: string
  color: "green" | "blue" | "purple" | "orange"
}) {
  const colorClasses = {
    green: "bg-green-100 text-green-800 border-green-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-lg border-2 px-3 py-2 font-medium", colorClasses[color])}>
      <span>{text}</span>
      <button onClick={onRemove} className="rounded-full p-0.5 hover:bg-black/10">
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 px-4 py-2 text-sm text-muted-foreground">
      {label}
    </div>
  )
}
