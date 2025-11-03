"use client"

import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface MissionFiltersProps {
  selectedRegion: string
  onRegionChange: (value: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

export function MissionFilters({
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: MissionFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Region and Search Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seoul">Seoul</SelectItem>
              <SelectItem value="busan">Busan</SelectItem>
              <SelectItem value="incheon">Incheon</SelectItem>
              <SelectItem value="daegu">Daegu</SelectItem>
              <SelectItem value="daejeon">Daejeon</SelectItem>
              <SelectItem value="gwangju">Gwangju</SelectItem>
              <SelectItem value="ulsan">Ulsan</SelectItem>
              <SelectItem value="gyeonggi">Gyeonggi</SelectItem>
              <SelectItem value="gangwon">Gangwon</SelectItem>
              <SelectItem value="chungbuk">Chungcheongbuk</SelectItem>
              <SelectItem value="chungnam">Chungcheongnam</SelectItem>
              <SelectItem value="jeonbuk">Jeollabuk</SelectItem>
              <SelectItem value="jeonnam">Jeollanam</SelectItem>
              <SelectItem value="gyeongbuk">Gyeongsangbuk</SelectItem>
              <SelectItem value="gyeongnam">Gyeongsangnam</SelectItem>
              <SelectItem value="jeju">Jeju</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Search Problems</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for problems, e.g., 'water quality'"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Filter Buttons Row */}
      <div className="flex flex-wrap gap-3">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Sort by: Most Recent</SelectItem>
            <SelectItem value="popular">Sort by: Most Popular</SelectItem>
            <SelectItem value="urgent">Sort by: Most Urgent</SelectItem>
            <SelectItem value="alphabetical">Sort by: A-Z</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category: All</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Status: Open</SelectItem>
            <SelectItem value="in-progress">Status: In Progress</SelectItem>
            <SelectItem value="completed">Status: Completed</SelectItem>
            <SelectItem value="all-status">Status: All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
