"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Eraser, Sparkles, Upload, Camera, Pencil } from "lucide-react"

interface InteractionPanelProps {
  stage: number
  userInput: any
  onGenerate: (input: any) => void
  exampleData?: { prompt: string; image: string } | null
}

export function InteractionPanel({ stage, userInput, onGenerate, exampleData }: InteractionPanelProps) {
  const [drawing, setDrawing] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [role, setRole] = useState("")
  const [request, setRequest] = useState("")
  const [chatMessages, setChatMessages] = useState<Array<{ role: "ai" | "user"; message: string }>>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<"draw" | "upload" | "camera">("draw")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [stage3Step, setStage3Step] = useState<"example" | "user">("example")
  const [examplePrompt, setExamplePrompt] = useState("")

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
            const y = (canvas.height - img.videoHeight * scale) / 2
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

  const handleGenerate = () => {
    if (stage === 1) {
      onGenerate({ drawing: "canvas-data", prompt })
    } else if (stage === 2) {
      onGenerate({ prompt })
    } else if (stage === 3) {
      if (stage3Step === "example") {
        onGenerate({ prompt: examplePrompt, isExample: true })
      } else {
        onGenerate({ drawing: "canvas-data", prompt })
      }
    } else if (stage === 4) {
      onGenerate({ role, request })
    } else if (stage === 5) {
      onGenerate({ chatMessages })
    }
  }

  // Stage 1 & 3: Drawing + Text
  if (stage === 1 || stage === 3) {
    return (
      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold">{stage === 1 ? "그리기 영역" : "퓨샷 프롬프팅"}</h2>

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

        {/* Drawing Canvas */}
        <div
          className={`relative rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 ${mode === "camera" && stream ? "hidden" : ""}`}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className={`w-full rounded-lg ${mode === "draw" ? "cursor-crosshair" : "cursor-default"}`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          {!drawing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-muted-foreground">
                {stage === 1 ? "여기에 그림을 그리거나 사진을 업로드하세요" : "슬픈 삼각형을 그려보세요"}
              </p>
            </div>
          )}
        </div>

        <Button variant="outline" onClick={clearCanvas} className="w-fit bg-transparent">
          <Eraser className="mr-2 h-4 w-4" />
          지우기
        </Button>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{stage === 1 ? "무엇을 그렸나요?" : "프롬프트:"}</label>
          <Input
            placeholder={stage === 1 ? "예: 행복한 로봇" : "예: 슬픈 삼각형"}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <Sparkles className="mr-2 h-4 w-4" />
          생성하기
        </Button>
      </Card>
    )
  }

  // Stage 2: Text Only (Detailed Prompt)
  if (stage === 2) {
    return (
      <Card className="flex flex-col gap-4 p-6">
        <div>
          <h2 className="text-lg font-bold">미션: 추가 세부사항</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            당신의 도전은 프롬프트에 설명적인 단어를 추가하여 더 자세한 이미지를 만드는 것입니다. 다음 예제를
            참고해보세요.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
          <p className="text-sm">
            <span className="font-medium">예제 프롬프트:</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">세 개의 빨간 사과가 탁자 위에 있음</span>
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">당신의 프롬프트</label>
          <Textarea
            placeholder="상세한 프롬프트를 입력하세요..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <Sparkles className="mr-2 h-4 w-4" />
          생성하기
        </Button>
      </Card>
    )
  }

  // Stage 4: Role-Playing
  if (stage === 4) {
    return (
      <Card className="flex flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">대화형 튜토리얼: 역할 연기</h2>
        <p className="text-sm text-muted-foreground">
          이제 역할 연기를 통해 AI의 강력한 응답력을 단계별로 체험해보세요!
        </p>

        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              1
            </div>
            <h3 className="font-semibold">단계 1: AI의 역할 정의</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            AI에게 특정 인물이나 전문성을 부여하여 응답을 향상시킵니다. 요청에 가장 적합한 인물을 생각해보세요.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">AI가 어떤 역할을 해야 하나요?</label>
            <Input placeholder="예: 세계 최고의 요리사" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              2
            </div>
            <h3 className="font-semibold">단계 2: 요청 입력</h3>
          </div>
          <p className="text-sm text-muted-foreground">이제 AI가 정의된 역할을 고려하여 명확하게 요청을 입력하세요.</p>
          <div className="space-y-2">
            <label className="text-sm font-medium">AI가 어떤 것을 생성해야 하나요?</label>
            <Textarea
              placeholder="예: 세계 최고의 피자"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <Sparkles className="mr-2 h-4 w-4" />
          응답 생성하기
        </Button>
      </Card>
    )
  }

  // Stage 5: Chain-of-Thought (Chat Interface)
  if (stage === 5) {
    const questions = ["토끼는 어떻게 생겼어?", "우주선은 어떤 모양이야?", "배경은 어디야?", "어떤 분위기를 원해?"]

    const currentQuestion = chatMessages.filter((m) => m.role === "ai").length

    return (
      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold">연속적인 생각 프롬프트</h2>
        <p className="text-sm text-muted-foreground">복잡한 이미지를 만들기 위해 단계별로 질문에 답해주세요.</p>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 rounded-lg border bg-muted/10 p-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
              {msg.role === "ai" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "ai" ? "bg-card" : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}

          {currentQuestion < questions.length && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <span className="text-sm">🤖</span>
              </div>
              <div className="max-w-[80%] rounded-lg bg-card px-4 py-2">
                <p className="text-sm">{questions[currentQuestion]}</p>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {currentQuestion < questions.length ? (
          <div className="flex gap-2">
            <Input
              placeholder="답변을 입력하세요..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && currentAnswer.trim()) {
                  setChatMessages([
                    ...chatMessages,
                    { role: "ai", message: questions[currentQuestion] },
                    { role: "user", message: currentAnswer },
                  ])
                  setCurrentAnswer("")
                }
              }}
            />
            <Button
              onClick={() => {
                if (currentAnswer.trim()) {
                  setChatMessages([
                    ...chatMessages,
                    { role: "ai", message: questions[currentQuestion] },
                    { role: "user", message: currentAnswer },
                  ])
                  setCurrentAnswer("")
                }
              }}
            >
              전송
            </Button>
          </div>
        ) : (
          <Button onClick={handleGenerate} className="w-full" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            최종 이미지 생성
          </Button>
        )}
      </Card>
    )
  }

  return null
}
