"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function AddMissionForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    region: "",
    category: "",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Submitting mission:", formData)

    toast({
      title: "Mission submitted!",
      description: "Your mission has been added successfully.",
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      region: "",
      category: "",
      imageUrl: "",
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Mission Title</Label>
        <Input
          id="title"
          placeholder="e.g., Water Scarcity in Rural Areas"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the problem and its impact on the community..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select
            value={formData.region}
            onValueChange={(value) => setFormData({ ...formData, region: value })}
            required
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
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
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            required
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Mission"}
        </Button>
      </div>
    </form>
  )
}
