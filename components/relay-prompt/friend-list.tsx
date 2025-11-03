import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface Friend {
  id: string
  name: string
  status: "online" | "offline" | "in-game"
  avatar: string
}

interface FriendListProps {
  friends: Friend[]
}

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  "in-game": "bg-blue-500",
}

const statusLabels = {
  online: "온라인",
  offline: "오프라인",
  "in-game": "게임 중",
}

export function FriendList({ friends }: FriendListProps) {
  return (
    <Card className="p-5">
      <h2 className="mb-4 text-lg font-semibold text-foreground">친구</h2>
      <div className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <img
                    src={friend.avatar || "/placeholder.svg"}
                    alt={friend.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColors[friend.status]}`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{friend.name}</p>
                <p className="text-xs text-muted-foreground">{statusLabels[friend.status]}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
