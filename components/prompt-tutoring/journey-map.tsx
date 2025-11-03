import { Brain, FileText, MapPin, Sparkles, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface JourneyMapProps {
  currentStage: number
  progress: number
}

const stages = [
  { id: 1, name: "인지", nameEn: "Cognition", icon: Brain },
  { id: 2, name: "묘사", nameEn: "Description", icon: FileText },
  { id: 3, name: "상황", nameEn: "Context", icon: MapPin },
  { id: 4, name: "추상화", nameEn: "Abstraction", icon: Sparkles },
  { id: 5, name: "언어화", nameEn: "Verbalization", icon: MessageSquare },
]

export function JourneyMap({ currentStage, progress }: JourneyMapProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">학습 여정 맵</h2>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}% 완료</span>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-muted rounded-full" />

        {/* Progress bar fill */}
        <div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {/* Stage markers */}
        <div className="relative flex items-start justify-between">
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isActive = stage.id === currentStage
            const isCompleted = stage.id < currentStage

            return (
              <div key={stage.id} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isActive && "bg-blue-500 border-blue-500 text-white shadow-lg scale-110",
                    isCompleted && "bg-green-500 border-green-500 text-white",
                    !isActive && !isCompleted && "bg-muted border-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "font-medium text-sm",
                      isActive && "text-blue-600",
                      isCompleted && "text-green-600",
                      !isActive && !isCompleted && "text-muted-foreground",
                    )}
                  >
                    {stage.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{stage.nameEn}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
