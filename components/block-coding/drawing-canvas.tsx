"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Upload, Camera, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DrawingCanvasProps {
  onComplete: (subject: string) => void
}

export function DrawingCanvas({ onComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [subject, setSubject] = useState("")
  const [mode, setMode] = useState<"draw" | "upload" | "camera">("draw")
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineWidth = 3
        ctx.strokeStyle = "#000000"
        setContext(ctx)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || mode !== "draw") return
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      context.beginPath()
      context.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || mode !== "draw") return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      context.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && context && canvasRef.current) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          clearCanvas()
          const canvas = canvasRef.current!
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
          const x = (canvas.width - img.width * scale) / 2
          const y = (canvas.height - img.height * scale) / 2
          context.drawImage(img, x, y, img.width * scale, img.height * scale)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
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
      alert("카메라에 접근할 수 없습니다. 권한을 확인해주세요.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && context && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      clearCanvas()
      const scale = Math.min(canvas.width / video.videoWidth, canvas.height / video.videoHeight)
      const x = (canvas.width - video.videoWidth * scale) / 2
      const y = (canvas.height - video.videoHeight * scale) / 2
      context.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale)

      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      setMode("draw")
    }
  }

  const switchToDrawMode = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setMode("draw")
  }

  const handleComplete = () => {
    if (subject.trim()) {
      onComplete(subject.trim())
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">드로잉 캔버스</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        그리고 싶은 주인공을 그리거나, 사진을 업로드하거나, 카메라로 촬영하세요!
      </p>

      <div className="mb-4 flex gap-2">
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
          카메라 촬영
        </Button>
      </div>

      <div className="mb-4 space-y-4">
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

        {/* Canvas - hidden during camera preview */}
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className={`w-full rounded-lg border-2 border-dashed bg-white ${
            mode === "draw" ? "cursor-crosshair" : "cursor-default"
          } ${mode === "camera" && stream ? "hidden" : ""}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Trash2 className="mr-2 h-4 w-4" />
            지우기
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">그린 것이 무엇인가요?</Label>
          <Input
            id="subject"
            placeholder="예: 용, 기사, 성, 우주선..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <Button onClick={handleComplete} disabled={!subject.trim()} className="w-full">
          완성하고 다음 단계로
        </Button>
      </div>
    </div>
  )
}
