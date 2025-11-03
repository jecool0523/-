import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Lightbulb } from "lucide-react"
import Image from "next/image"

interface ResultsPanelProps {
  stage: number
  result: string | null
  userInput: any
  exampleData?: { prompt: string; image: string } | null
}

export function ResultsPanel({ stage, result, userInput, exampleData }: ResultsPanelProps) {
  // Stage 1: Zero-Shot with explanation modal
  if (stage === 1) {
    return (
      <Card className="flex h-fit flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">{"결과"}</h2>

        {!result ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed bg-muted/10">
            <p className="text-sm text-muted-foreground">Your result will appear here...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950" />

            {/* Explanation Card */}
            <Card className="border-2 border-primary/20 bg-primary/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Lightbulb className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">제로샷 프롬프팅이란 무엇인가요?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                제로샷 프롬프팅은 AI가 특정 요청에 대한 구체적인 예시나 훈련 없이 설명만으로 콘텐츠를 생성할 수 있는
                경우를 말합니다. AI는 일반 지식을 바탕으로 프롬프트를 해석하고 새로운 것을 만들어냅니다!
              </p>
              <Button className="mt-4 w-full">Got It!</Button>
            </Card>
          </div>
        )}

        {/* Key Learning Points */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
          <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-100">주요 학습 요소 </h3>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li className="flex gap-2">
              <span>•</span>
              <span>AI는 간단한 설명을 이해할 수 있습니다</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>기본 요청에는 예가 필요하지 않습니다.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>그림은 아이디어를 시각화하는 데 도움이 됩니다.</span>
            </li>
          </ul>
        </div>
      </Card>
    )
  }

  // Stage 2: Specificity with keyword highlighting
  if (stage === 2) {
    return (
      <Card className="flex h-fit flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">결과</h2>

        {result && (
          <div className="space-y-4">
            {/* Generated Image with Annotations */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <div className="h-full w-full bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-950 dark:to-amber-950" />
              {/* Keyword Annotations */}
              <div className="absolute left-1/4 top-1/4">
                <div className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">shiny</div>
                <div className="h-12 w-0.5 bg-blue-500" />
              </div>
              <div className="absolute right-1/4 top-1/3">
                <div className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">red</div>
                <div className="h-16 w-0.5 bg-blue-500" />
              </div>
              <div className="absolute bottom-1/4 left-1/2">
                <div className="h-12 w-0.5 bg-blue-500" />
                <div className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">three</div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-medium">Your prompt:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {userInput.prompt || "three shiny red apples on a table"}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Key Learning Points */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
          <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-100">주요 학습 요소</h3>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li className="flex gap-2">
              <span>•</span>
              <span>구체적인 키워드를 사용하면 정확한 결과를 얻을 수 있습니다.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>색상, 숫자, 질감 등이 중요합니다</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>구체적으로 말할수록 정확한 결과가 나옵니다!</span>
            </li>
          </ul>
        </div>
      </Card>
    )
  }

  // Stage 3: Few-Shot with example
  if (stage === 3) {
    return (
      <Card className="flex h-fit flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">결과</h2>

        {exampleData && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">AI에게 보여준 예시</h3>
            <div className="rounded-lg border bg-card p-4">
              <p className="mb-2 text-sm">
                <span className="font-medium">프롬프트:</span> {exampleData.prompt}
              </p>
              <div className="relative h-32 w-full overflow-hidden rounded-lg">
                <Image
                  src={exampleData.image || "/placeholder.svg"}
                  alt={exampleData.prompt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Your turn */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">당신의 차례!</h3>
          {result ? (
            <div className="rounded-lg border bg-card p-4">
              <p className="mb-2 text-sm">
                <span className="font-medium">프롬프트:</span> {userInput.prompt}
              </p>
              <div className="relative h-32 w-full overflow-hidden rounded-lg">
                <Image src={result || "/placeholder.svg"} alt={userInput.prompt} fill className="object-cover" />
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted/10">
              <p className="text-sm text-muted-foreground">결과가 여기에 표시됩니다...</p>
            </div>
          )}
        </div>

        {result && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-900 dark:text-green-100">네가 보여준 예시 덕분에 AI가 새로운 걸 배웠어!</p>
          </div>
        )}
      </Card>
    )
  }

  // Stage 4: Role-Playing
  if (stage === 4) {
    return (
      <Card className="flex h-fit flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">Results</h2>

        {result ? (
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950" />

            <Card className="border-2 border-primary/20 bg-primary/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-xl">👨‍🍳</span>
                </div>
                <div>
                  <h3 className="font-semibold">Role-Playing Magic!</h3>
                  <p className="text-xs text-muted-foreground">AI as: {userInput.role || "world-class chef"}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                By giving the AI a role, like a 'world-class chef', you're setting a powerful context. This helps it
                generate more creative, detailed, and higher-quality responses that fit the persona you've defined!
              </p>
            </Card>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed bg-muted/10">
            <p className="text-sm text-muted-foreground">Your result will appear here...</p>
          </div>
        )}

        {/* Key Learning Points */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
          <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-100">Key Learning Points</h3>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li className="flex gap-2">
              <span>•</span>
              <span>Roles create context and expertise</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>AI responds as the assigned persona</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Better quality and creativity</span>
            </li>
          </ul>
        </div>
      </Card>
    )
  }

  // Stage 5: Chain-of-Thought
  if (stage === 5) {
    return (
      <Card className="flex h-fit flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">Results</h2>

        {result ? (
          <div className="space-y-4">
            {/* Final Assembled Prompt */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold">Final Prompt</h3>
              <p className="text-sm text-muted-foreground">
                A fluffy white rabbit riding a silver rocket ship to the moon under a starry night sky with a magical,
                dreamy atmosphere
              </p>
            </div>

            {/* Generated Image */}
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950" />

            {/* Success Badge */}
            <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-100 p-4 dark:from-yellow-950 dark:to-orange-950">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-bold text-yellow-900 dark:text-yellow-100">프롬프트 마스터!</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">모든 단계를 완료했습니다!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed bg-muted/10">
            <p className="text-sm text-muted-foreground">질문에 답하면 최종 결과가 나타납니다...</p>
          </div>
        )}

        {/* Key Learning Points */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
          <h3 className="mb-2 text-sm font-semibold text-green-900 dark:text-green-100">Key Learning Points</h3>
          <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li className="flex gap-2">
              <span>•</span>
              <span>Break complex prompts into steps</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Each answer builds the final prompt</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Easier to create detailed requests</span>
            </li>
          </ul>
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex h-fit flex-col gap-6 p-6">
      <h2 className="text-lg font-bold">Results</h2>
      <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed bg-muted/10">
        <p className="text-sm text-muted-foreground">Your result will appear here...</p>
      </div>
    </Card>
  )
}
