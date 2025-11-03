import { Card } from "@/components/ui/card"

interface PromptEntry {
  id: string
  user: string
  role: string
  content: string
  timestamp: string
  avatar: string
}

interface PromptAssemblyProps {
  history: PromptEntry[]
}

export function PromptAssembly({ history }: PromptAssemblyProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">프롬프트 조립소</h2>
      <div className="space-y-3">
        {history.map((entry) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                <img src={entry.avatar || "/placeholder.svg"} alt={entry.user} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium text-foreground">{entry.user}</span>
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-foreground">{entry.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
