import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProgressTimeline } from "@/components/relay-prompt/progress-timeline"
import { PromptAssembly } from "@/components/relay-prompt/prompt-assembly"
import { PersonalWorkspace } from "@/components/relay-prompt/personal-workspace"
import { ReactionBar } from "@/components/relay-prompt/reaction-bar"

const stages = [
  { id: "theme", label: "주제", status: "active" as const, user: "You" },
  { id: "description", label: "묘사", status: "pending" as const, user: "Mia" },
  { id: "background", label: "배경", status: "pending" as const, user: "Sam" },
  { id: "style", label: "스타일", status: "pending" as const, user: "Alex" },
]

const promptHistory = [
  {
    id: "1",
    user: "Alex",
    role: "주제",
    content: "새벽의 고요한 숲",
    timestamp: "2분 전",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    user: "Mia",
    role: "묘사",
    content: "캐노피를 통해 스며드는 햇빛이 긴 그림자를 드리우고 있습니다.",
    timestamp: "1분 전",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    user: "Sam",
    role: "배경",
    content: "구불구불한 길이 숨겨진 폭포로 이어집니다.",
    timestamp: "방금 전",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function RelayWorkspacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-background">
          <div className="flex flex-1 overflow-hidden">
            <div className="flex w-20 flex-col items-center border-r border-border bg-card py-6">
              <ProgressTimeline stages={stages} />
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto border-r border-border p-6">
                <PromptAssembly history={promptHistory} />
              </div>

              <div className="w-full max-w-2xl overflow-y-auto p-6">
                <PersonalWorkspace currentRole="주제" timeRemaining={225} />
              </div>
            </div>
          </div>

          <ReactionBar />
        </main>
      </div>
    </div>
  )
}
