"use client"

import { MissionCard } from "./mission-card"

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

interface MissionGridProps {
  selectedRegion: string
  searchQuery: string
  sortBy: string
  category: string
  status: string
}

// Sample mission data
const missions: Mission[] = [
  {
    id: "1",
    title: "Water Scarcity in Rural Areas",
    description: "A brief, one or two-sentence summary of the problem affecting local agriculture and daily life.",
    image: "/water-flowing-into-ripples.jpg",
    categories: ["Environment", "Agriculture"],
    region: "seoul",
    status: "open",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Limited Access to Healthcare",
    description:
      "Many remote communities lack basic healthcare facilities and professionals, leading to preventable health issues.",
    image: "/healthcare-safety-minimal-illustration.jpg",
    categories: ["Healthcare", "Community"],
    region: "seoul",
    status: "open",
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "3",
    title: "Poor Educational Infrastructure",
    description:
      "Underfunded schools with inadequate facilities hinder the learning experience for children in the region.",
    image: "/school-building-with-green-trees.jpg",
    categories: ["Education", "Infrastructure"],
    region: "seoul",
    status: "open",
    createdAt: new Date("2025-01-13"),
  },
  {
    id: "4",
    title: "High Youth Unemployment",
    description:
      "A significant number of young people struggle to find stable employment, impacting the local economy.",
    image: "/person-icon-with-house-minimal-green.jpg",
    categories: ["Economy", "Employment"],
    region: "seoul",
    status: "open",
    createdAt: new Date("2025-01-12"),
  },
]

export function MissionGrid({ selectedRegion, searchQuery, sortBy, category, status }: MissionGridProps) {
  // Filter missions based on criteria
  let filteredMissions = missions.filter((mission) => {
    // Region filter
    if (selectedRegion && mission.region !== selectedRegion) {
      return false
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = mission.title.toLowerCase().includes(query)
      const matchesDescription = mission.description.toLowerCase().includes(query)
      const matchesCategories = mission.categories.some((cat) => cat.toLowerCase().includes(query))
      if (!matchesTitle && !matchesDescription && !matchesCategories) {
        return false
      }
    }

    // Category filter
    if (category !== "all") {
      const hasCategory = mission.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
      if (!hasCategory) {
        return false
      }
    }

    // Status filter
    if (status !== "all-status" && mission.status !== status) {
      return false
    }

    return true
  })

  // Sort missions
  filteredMissions = [...filteredMissions].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "alphabetical":
        return a.title.localeCompare(b.title)
      case "popular":
        // In a real app, this would sort by popularity metrics
        return 0
      case "urgent":
        // In a real app, this would sort by urgency
        return 0
      default:
        return 0
    }
  })

  if (filteredMissions.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-medium">No missions found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredMissions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  )
}
