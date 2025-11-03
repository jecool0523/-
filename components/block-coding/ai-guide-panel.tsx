import { MessageSquare, Palette, Blocks, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AiGuidePanelProps {
  currentStep: "drawing" | "assembly" | "results"
}

export function AiGuidePanel({ currentStep }: AiGuidePanelProps) {
  const steps = [
    {
      id: "drawing",
      icon: Palette,
      label: "미션",
      description: "주인공을 그려봐!",
    },
    {
      id: "assembly",
      icon: Blocks,
      label: "인터랙션",
      description: "블록으로 문장을 만들어봐!",
    },
    {
      id: "results",
      icon: ImageIcon,
      label: "결과",
      description: "AI가 만든 작품을 확인해봐!",
    },
  ]

  const getCurrentTip = () => {
    switch (currentStep) {
      case "drawing":
        return "안녕! 먼저 그리고 싶은 주인공을 그려봐. 간단하게 그려도 괜찮아!"
      case "assembly":
        return "잘했어! 이제 아래 블록 카드들을 끌어다가 문장을 완성해봐. 블록을 조립하듯이!"
      case "results":
        return "와! 블록을 조립하듯 문장을 만드니 정말 쉽지? 이렇게 하면 실수 없이 AI에게 정확하게 명령할 수 있어!"
      default:
        return ""
    }
  }

  return (
    <aside className="w-80 border-r bg-muted/30 p-6">
      <div className="space-y-6">
        {/* AI Avatar */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">AI 가이드</h3>
            <p className="text-sm text-muted-foreground">친절한 도우미</p>
          </div>
        </div>

        {/* Navigation Steps */}
        <nav className="space-y-2">
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isPast =
              (currentStep === "assembly" && step.id === "drawing") ||
              (currentStep === "results" && (step.id === "drawing" || step.id === "assembly"))

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 transition-colors",
                  isActive && "bg-primary/10 text-primary",
                  isPast && "text-muted-foreground",
                  !isActive && !isPast && "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{step.label}</span>
              </div>
            )
          })}
        </nav>

        {/* Tip Box */}
        <div className="rounded-lg border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4" />
            <span>도움말</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{getCurrentTip()}</p>
        </div>
      </div>
    </aside>
  )
}
