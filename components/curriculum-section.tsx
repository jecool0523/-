import { ModuleCard } from "@/components/module-card"
import { MessageSquare, BookText, GraduationCap, Users, Code, Sparkles, Globe, Wand2, Brain } from "lucide-react"

const stages = [
  {
    title: "Stage 1: AI와 소통하기",
    modules: [
      {
        id: "1-1",
        title: "1-1. AI와 대화해보기",
        description: "AI와의 첫 대화를 시작하고 기본적인 상호작용을 배워보세요.",
        icon: MessageSquare,
        status: "available" as const,
        href: "/ai-intro",
      },
      {
        id: "1-2",
        title: "1-2. 인터랙티브 스토리텔링",
        description: "AI와 함께 창의적인 이야기를 만들어가는 방법을 익혀보세요.",
        icon: BookText,
        status: "available" as const,
        progress: 60,
        href: "#",
      },
      {
        id: "1-3",
        title: "1-3. 아이디어 전달",
        description: "효과적인 프롬프트 작성의 기초를 튜터링 방식으로 학습합니다.",
        icon: GraduationCap,
        status: "available" as const,
        href: "/prompt-tutoring",
      },
    ],
  },
  {
    title: "Stage 2: 프롬프트 작성하기",
    modules: [
      {
        id: "2-1",
        title: "2-1. 릴레이 프롬프트",
        description: "여러 사람과 함께 프롬프트를 이어가며 협업하는 방법을 배웁니다.",
        icon: Users,
        status: "available" as const,
        href: "/relay-prompt",
      },
      {
        id: "2-2",
        title: "2-2. 프롬프트 블록 코딩",
        description: "블록 코딩 방식으로 복잡한 프롬프트를 구조화하는 법을 익힙니다.",
        icon: Code,
        status: "available" as const,
        href: "/prompt-block-coding",
      },
      {
        id: "2-3",
        title: "2-3. 리얼 프롬프트 엔지니어링",
        description: "실전에서 사용되는 고급 프롬프트 엔지니어링 기법을 학습합니다.",
        icon: Sparkles,
        status: "available" as const,
        href: "/real-prompt-engineering",
      },
    ],
  },
  {
    title: "Stage 3: AI 일상에서 활용하기",
    modules: [
      {
        id: "3-1",
        title: "3-1. 미션 발견",
        description: "AI를 활용해서 해결할 우리 지역의 미션 찾기!",
        icon: Globe,
        status: "available" as const,
        href: "/mission-discovery",
      },
      {
        id: "3-2",
        title: "3-2. 미션 해결하기",
        description: "AI와 함께 실생활 미션을 해결해보기",
        icon: Wand2,
        status: "available" as const,
      },
      {
        id: "3-3",
        title: "3-3. 마무리",
        description: "마지막으로 인공지능 마스터가 되기 위한 정리",
        icon: Brain,
        status: "locked" as const,
      },
    ],
  },
]

export function CurriculumSection() {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">학습 커리큘럼</h2>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">단계별로 프롬프트 엔지니어링을 마스터하세요.</p>
      </div>

      {stages.map((stage, stageIndex) => (
        <div key={stageIndex} className="space-y-6">
          <h3 className="text-xl font-bold text-foreground md:text-2xl">{stage.title}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stage.modules.map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
