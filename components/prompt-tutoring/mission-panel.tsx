import { Flag, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MissionPanelProps {
  currentStage: number
}

const missionData = {
  1: {
    title: "1단계: 아이디어 시각화",
    objectives: ["기본 도형을 그려보세요.", "두 개의 설명 단어를 추가하세요."],
    mascotMessage: "이 단계에서는 세부 사항을 걱정하지 마세요. 주요 아이디어만 표현하면 됩니다!",
  },
  2: {
    title: "2단계: 자세히 묘사하기",
    objectives: ["색깔, 무늬, 크기를 추가하세요.", "힌트 카드를 활용해보세요."],
    mascotMessage: "형용사를 사용하면 AI가 더 정확하게 이해할 수 있어요. 다양한 꾸며주는 말을 시도해보세요!",
  },
  3: {
    title: "3단계: 상황 부여하기",
    objectives: ["배경이나 장소를 추가하세요.", "행동이나 동작을 설명하세요."],
    mascotMessage: "대상이 어디에 있고 무엇을 하고 있는지 알려주면 완성된 장면이 만들어져요!",
  },
  4: {
    title: "4단계: 감정 표현하기",
    objectives: ["감정이나 분위기를 추가하세요.", "추상적인 개념을 표현해보세요."],
    mascotMessage: "눈에 보이지 않는 감정도 언어로 표현할 수 있어요. AI가 이를 시각적으로 구현할 거예요!",
  },
  5: {
    title: "5단계: 완전한 언어화",
    objectives: ["그림 없이 텍스트만으로 표현하세요.", "배운 모든 기술을 활용하세요."],
    mascotMessage: "최종 단계입니다! 머릿속 이미지를 온전히 언어로 전환해보세요. 당신은 이제 프롬프트 아티스트예요!",
  },
}

export function MissionPanel({ currentStage }: MissionPanelProps) {
  const mission = missionData[currentStage as keyof typeof missionData]

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <Flag className="w-5 h-5" />
          미션
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">{mission.title}</h3>
          <ul className="space-y-2">
            {mission.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 bg-orange-500">
              <AvatarFallback className="bg-orange-500 text-white">
                <Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">AI 마스코트</div>
              <div className="text-xs text-muted-foreground">도움을 드릴게요!</div>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">{mission.mascotMessage}</div>
        </div>
      </CardContent>
    </Card>
  )
}
