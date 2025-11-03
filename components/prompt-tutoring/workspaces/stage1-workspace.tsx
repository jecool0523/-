"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Pencil, Upload, Camera, Eraser } from "lucide-react"

interface Stage1WorkspaceProps {
  onSubmit: (data: any) => void
  isGenerating: boolean
}

export function Stage1Workspace({ onSubmit, isGenerating }: Stage1WorkspaceProps) {
  const [descriptor1, setDescriptor1] = useState("")
  const [descriptor2, setDescriptor2] = useState("")
  const [mode, setMode] = useState<"draw" | "upload" | "camera">("draw")
  const [drawing, setDrawing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || mode !== "draw") return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const stopDrawing = () => {
    setDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const canvas = canvasRef.current
    if (file && canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const img = new Image()
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
            const x = (canvas.width - img.width * scale) / 2
            const y = (canvas.height - img.height * scale) / 2
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
          }
          img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
      setMode("camera")
    } catch (error) {
      console.error("카메라 접근 오류:", error)
      alert("카메라에 접근할 수 없습니다.")
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const scale = Math.min(canvas.width / video.videoWidth, canvas.height / video.videoHeight)
        const x = (canvas.width - video.videoWidth * scale) / 2
        const y = (canvas.height - video.videoHeight * scale) / 2
        ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale)

        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
          setStream(null)
        }
        setMode("draw")
      }
    }
  }

  const switchToDrawMode = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setMode("draw")
  }

  const handleSubmit = () => {
    onSubmit({
      descriptors: [descriptor1, descriptor2],
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={mode === "draw" ? "default" : "outline"} size="sm" onClick={switchToDrawMode}>
          <Pencil className="mr-2 h-4 w-4" />
          그리기
        </Button>
        <Button
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setMode("upload")
            fileInputRef.current?.click()
          }}
        >
          <Upload className="mr-2 h-4 w-4" />
          사진 업로드
        </Button>
        <Button variant={mode === "camera" ? "default" : "outline"} size="sm" onClick={startCamera}>
          <Camera className="mr-2 h-4 w-4" />
          카메라
        </Button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

      {mode === "camera" && stream && (
        <div className="relative">
          <video ref={videoRef} className="w-full rounded-lg border-2 border-primary" autoPlay playsInline />
          <div className="mt-2 flex justify-center">
            <Button onClick={capturePhoto} size="lg">
              <Camera className="mr-2 h-4 w-4" />
              사진 찍기
            </Button>
          </div>
        </div>
      )}

      <div className={`relative ${mode === "camera" && stream ? "hidden" : ""}`}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className={`w-full rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 ${mode === "draw" ? "cursor-crosshair" : "cursor-default"}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        {!drawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-center px-4">여기에 주제를 그려보세요</p>
          </div>
        )}
      </div>

      <Button variant="outline" onClick={clearCanvas} size="sm">
        <Eraser className="mr-2 h-4 w-4" />
        지우기
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="descriptor1">설명 단어 추가...</Label>
          <Input
            id="descriptor1"
            placeholder="예: 용감한"
            value={descriptor1}
            onChange={(e) => setDescriptor1(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descriptor2">또 다른 단어 추가...</Label>
          <Input
            id="descriptor2"
            placeholder="예: 빛나는"
            value={descriptor2}
            onChange={(e) => setDescriptor2(e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        size="lg"
        disabled={!descriptor1 || !descriptor2 || isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            생성 중...
          </>
        ) : (
          "제출"
        )}
      </Button>
    </div>
  )
}
