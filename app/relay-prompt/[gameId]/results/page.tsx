import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FinalResults } from "@/components/relay-prompt/final-results"
import { ReactionBar } from "@/components/relay-prompt/reaction-bar"

const finalPrompt =
  "새벽의 고요한 숲, 캐노피를 통해 스며드는 햇빛이 긴 그림자를 드리우고 있습니다. 구불구불한 길이 숨겨진 폭포로 이어집니다. 판타지 아트에서 영감을 받은 스타일로, 마법 같은 사실주의가 가미되어 있습니다."

const participants = [
  { name: "Alex", role: "주제", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Mia", role: "묘사", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Sam", role: "배경", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "You", role: "스타일", avatar: "/placeholder.svg?height=40&width=40" },
]

const generatedImages = [
  "/forest-at-dawn.jpg",
  "/mystical-forest.jpg",
  "/forest-waterfall.png",
  "/magical-forest-scene.jpg",
]

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-background">
          <div className="flex-1 overflow-y-auto p-6">
            <FinalResults prompt={finalPrompt} participants={participants} images={generatedImages} />
          </div>
          <ReactionBar />
        </main>
      </div>
    </div>
  )
}
