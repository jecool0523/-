import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Lock, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ModuleStatus = "locked" | "available" | "in-progress" | "completed"

interface ModuleCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  status: ModuleStatus
  progress?: number
  href?: string
}

export function ModuleCard({ title, description, icon: Icon, status, progress = 0, href }: ModuleCardProps) {
  const isLocked = status === "locked"
  const isCompleted = status === "completed"
  const isInProgress = status === "in-progress"
  const isAvailable = status === "available"

  const cardContent = (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        isLocked && "opacity-60",
        isCompleted && "border-success/50 bg-success/5",
        isInProgress && "border-warning/50 bg-warning/5",
        isAvailable && "border-primary/30 hover:border-primary/50",
        !isLocked && href && "cursor-pointer",
      )}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              isLocked && "bg-muted",
              isCompleted && "bg-success/20",
              isInProgress && "bg-warning/20",
              isAvailable && "bg-primary/10",
            )}
          >
            {isLocked ? (
              <Lock className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Icon
                className={cn(
                  "h-6 w-6",
                  isCompleted && "text-success",
                  isInProgress && "text-warning",
                  isAvailable && "text-primary",
                )}
              />
            )}
          </div>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-success" />}
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-foreground leading-tight">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {isInProgress && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{progress}% 완료</p>
          </div>
        )}

        {isCompleted && (
          <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">완료</span>
          </div>
        )}

        {isAvailable && (
          <Button className="w-full font-semibold" size="lg">
            학습 시작하기
          </Button>
        )}

        {isInProgress && (
          <Button className="w-full font-semibold bg-transparent" size="lg" variant="outline">
            이어서 학습하기
          </Button>
        )}

        {isLocked && (
          <div className="rounded-md bg-muted px-3 py-2 text-center">
            <p className="text-sm text-muted-foreground">이전 단계를 완료하면 잠금 해제됩니다</p>
          </div>
        )}
      </div>
    </Card>
  )

  if (href && !isLocked) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}
