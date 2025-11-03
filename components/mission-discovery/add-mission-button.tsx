"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddMissionForm } from "./add-mission-form"

export function AddMissionButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add new mission</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Mission</DialogTitle>
          <DialogDescription>
            Submit a local problem or challenge that could benefit from AI solutions.
          </DialogDescription>
        </DialogHeader>
        <AddMissionForm />
      </DialogContent>
    </Dialog>
  )
}
