"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MissionFilters } from "@/components/mission-discovery/mission-filters"
import { MissionGrid } from "@/components/mission-discovery/mission-grid"
import { AddMissionButton } from "@/components/mission-discovery/add-mission-button"

export default function MissionDiscoveryPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [category, setCategory] = useState<string>("all")
  const [status, setStatus] = useState<string>("open")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
              <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Local Problem Finder</h1>
              <p className="text-pretty text-muted-foreground">
                Discover local challenges where you can apply your AI skills to make a difference. Select a region to
                get started.
              </p>
            </div>

            {/* Filters Section */}
            <MissionFilters
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              category={category}
              onCategoryChange={setCategory}
              status={status}
              onStatusChange={setStatus}
            />

            {/* Mission Grid */}
            <MissionGrid
              selectedRegion={selectedRegion}
              searchQuery={searchQuery}
              sortBy={sortBy}
              category={category}
              status={status}
            />

            {/* Floating Add Button */}
            <AddMissionButton />
          </div>
        </main>
      </div>
    </div>
  )
}
