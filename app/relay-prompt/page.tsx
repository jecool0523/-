import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { GameCard } from "@/components/relay-prompt/game-card"
import { FriendList } from "@/components/relay-prompt/friend-list"
import { Plus, Moon } from "lucide-react"

const activeGames = [
  {
    id: "1",
    title: "마법의 숲",
    description: "신비로운 숲속 모험",
    currentPlayers: 5,
    maxPlayers: 8,
    participants: [
      { id: "1", name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Mia", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "3", name: "Sam", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: "2",
    title: "사이버펑크 도시",
    description: "첨단 기술, 암울한 미래",
    currentPlayers: 3,
    maxPlayers: 8,
    participants: [
      { id: "4", name: "Chris", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "5", name: "Jordan", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: "3",
    title: "우주 여행",
    description: "별들 사이의 여정",
    currentPlayers: 3,
    maxPlayers: 8,
    participants: [
      { id: "6", name: "Taylor", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "7", name: "Morgan", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "8", name: "Casey", avatar: "/placeholder.svg?height=40&width=40" },
    ],
  },
]

const friends = [
  { id: "1", name: "Alex", status: "online" as const, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Mia", status: "offline" as const, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Sam", status: "in-game" as const, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function RelayPromptLobbyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="border-b border-border bg-card px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">릴레이 프롬프트 로비</h1>
              <div className="flex items-center gap-3">
                <Button size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  게임 만들기
                </Button>
                <Button variant="ghost" size="icon">
                  <Moon className="h-5 w-5" />
                </Button>
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-foreground">진행 중인 게임</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {activeGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <FriendList friends={friends} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
