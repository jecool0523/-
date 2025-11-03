import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface GameCardProps {
  game: {
    id: string
    title: string
    description: string
    currentPlayers: number
    maxPlayers: number
    participants: Array<{
      id: string
      name: string
      avatar: string
    }>
  }
}

export function GameCard({ game }: GameCardProps) {
  const remainingSlots = game.maxPlayers - game.currentPlayers
  const showParticipants = game.participants.slice(0, 3)
  const additionalCount = game.participants.length - 3

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">{game.title}</h3>
        <p className="text-sm text-muted-foreground">{game.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {showParticipants.map((participant) => (
              <div key={participant.id} className="h-8 w-8 overflow-hidden rounded-full border-2 border-card bg-muted">
                <img
                  src={participant.avatar || "/placeholder.svg"}
                  alt={participant.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {additionalCount > 0 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
                +{additionalCount}
              </div>
            )}
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {game.currentPlayers}/{game.maxPlayers} 플레이어
        </span>
      </div>

      <Button asChild className="w-full">
        <Link href={`/relay-prompt/${game.id}`}>게임 참여</Link>
      </Button>
    </Card>
  )
}
