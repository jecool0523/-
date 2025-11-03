import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"

export function ProgressCard() {
  const progressPercentage = 5
  const currentLesson = "1-3. 프롬프튜터링"
  const userName = "사용자"

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">환영합니다, {userName}님!</h2>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            학습을 계속해서 인공지능 활용 전문가가 되어보세요.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">전체 학습 진척도</span>
            <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground">
            전체 과정의 <span className="font-semibold text-foreground">{progressPercentage}%</span>를 완료했어요.
          </p>
        </div>

        <Button size="lg" className="w-full text-base font-semibold md:w-auto md:px-8">
          이어서 학습하기: {currentLesson}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Card>
  )
}
