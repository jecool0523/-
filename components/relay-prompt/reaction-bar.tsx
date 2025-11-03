"use client"

import { Button } from "@/components/ui/button"

const reactions = ["👍", "❤️", "😂", "😮", "🤔", "🔥"]

export function ReactionBar() {
  return (
    <div className="border-t border-border bg-card py-4">
      <div className="mx-auto flex max-w-md justify-center gap-2">
        {reactions.map((emoji) => (
          <Button key={emoji} variant="ghost" size="lg" className="h-12 w-12 rounded-full text-2xl hover:scale-110">
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}
