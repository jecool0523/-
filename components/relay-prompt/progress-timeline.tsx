import { Palette, FileText, ImageIcon, Sparkles, Check } from "lucide-react"

interface Stage {
  id: string
  label: string
  status: "completed" | "active" | "pending"
  user: string
}

interface ProgressTimelineProps {
  stages: Stage[]
}

const icons = {
  theme: Palette,
  description: FileText,
  background: ImageIcon,
  style: Sparkles,
}

export function ProgressTimeline({ stages }: ProgressTimelineProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {stages.map((stage, index) => {
        const Icon = icons[stage.id as keyof typeof icons]
        const isLast = index === stages.length - 1

        return (
          <div key={stage.id} className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                stage.status === "completed"
                  ? "bg-green-500 text-white"
                  : stage.status === "active"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {stage.status === "completed" ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
            </div>
            {!isLast && (
              <div className={`my-2 h-8 w-0.5 ${stage.status === "completed" ? "bg-green-500" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
