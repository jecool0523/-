"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hand } from "lucide-react"

interface BlockLibraryProps {
  onBlockDrop: (type: "adjectives" | "subject" | "action" | "location", value: string) => void
}

const blockData = {
  adjectives: [
    "행복한",
    "용감한",
    "빛나는",
    "작은",
    "화려한",
    "푹신한",
    "고대의",
    "신비로운",
    "거대한",
    "빨간색",
    "파란색",
    "금색",
  ],
  nouns: ["용", "기사", "공주", "성", "숲", "바다", "산", "우주선", "로봇", "마법사"],
  verbs: ["날아가는", "불을 뿜는", "춤추는", "노래하는", "싸우는", "웃고 있는", "달리는", "점프하는"],
  locations: ["하늘에서", "바다 속에서", "숲 속에서", "성 안에서", "우주에서", "산 위에서"],
}

export function BlockLibrary({ onBlockDrop }: BlockLibraryProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">블록 라이브러리</h2>
        <Hand className="h-5 w-5 text-primary" />
      </div>

      <Tabs defaultValue="adjectives" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="adjectives">꾸미는 말</TabsTrigger>
          <TabsTrigger value="nouns">명사</TabsTrigger>
          <TabsTrigger value="verbs">동사</TabsTrigger>
          <TabsTrigger value="locations">장��</TabsTrigger>
        </TabsList>

        <TabsContent value="adjectives" className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {blockData.adjectives.map((word) => (
              <BlockCard key={word} text={word} color="green" onClick={() => onBlockDrop("adjectives", word)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nouns" className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {blockData.nouns.map((word) => (
              <BlockCard key={word} text={word} color="purple" onClick={() => onBlockDrop("subject", word)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verbs" className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {blockData.verbs.map((word) => (
              <BlockCard key={word} text={word} color="orange" onClick={() => onBlockDrop("action", word)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locations" className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {blockData.locations.map((word) => (
              <BlockCard key={word} text={word} color="blue" onClick={() => onBlockDrop("location", word)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BlockCard({
  text,
  color,
  onClick,
}: {
  text: string
  color: "green" | "blue" | "purple" | "orange"
}) {
  const colorClasses = {
    green: "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
    blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
    purple: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
    orange: "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
  }

  return (
    <Button
      variant="outline"
      className={`h-auto cursor-grab border-2 px-4 py-3 font-medium transition-all hover:scale-105 active:cursor-grabbing ${colorClasses[color]}`}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
