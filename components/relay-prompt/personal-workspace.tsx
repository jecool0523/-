import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Mic, Tag, Clock } from "lucide-react"

interface PersonalWorkspaceProps {
  currentRole: string
  timeRemaining: number
}

const keywords = ["숲", "새벽", "신비로운", "고요한", "햇빛"]

export function PersonalWorkspace({ currentRole, timeRemaining }: PersonalWorkspaceProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          당신의 차례: <span className="text-primary">{currentRole}</span>
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {minutes}:{seconds.toString().padStart(2, "0")} 남음
          </span>
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
            <img src="/placeholder.svg?height=40&width=40" alt="You" className="h-full w-full object-cover" />
          </div>
          <Textarea placeholder="주제를 설명해주세요..." className="min-h-32 flex-1 resize-none" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Tag className="h-5 w-5" />
            </Button>
          </div>
          <Button size="lg">제출</Button>
        </div>
      </Card>

      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">키워드 제안</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <Button key={keyword} variant="secondary" size="sm">
              {keyword}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
