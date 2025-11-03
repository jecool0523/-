"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Mission {
  id: string
  title: string
  description: string
  image: string
  categories: string[]
  region: string
  status: string
  createdAt: Date
}

interface MissionCardProps {
  mission: Mission
}

export function MissionCard({ mission }: MissionCardProps) {
  const handleSelectProblem = () => {
    // In a real app, this would navigate to the mission detail page
    console.log("[v0] Selected mission:", mission.id)
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {/* Mission Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={mission.image || "/placeholder.svg"}
          alt={mission.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Mission Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-balance text-xl font-semibold leading-tight">{mission.title}</h3>
          <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{mission.description}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {mission.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button onClick={handleSelectProblem} className="w-full">
          Select Problem
        </Button>
      </div>
    </Card>
  )
}
