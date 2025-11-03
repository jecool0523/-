import { createOpenAI } from "@ai-sdk/openai"
import { convertToCoreMessages, streamText, StreamingTextResponse } from "ai"

export const maxDuration = 30

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const prompt = convertToCoreMessages(messages)

  // System message to guide the AI as a friendly learning assistant
  const systemMessage = {
    role: "system" as const,
    content: `You are a friendly and patient AI learning assistant. Your goal is to help users understand what AI is, how it works, and its practical applications. 

Key guidelines:
- Use simple, clear language that beginners can understand
- Provide real-world examples and analogies
- Be encouraging and supportive
- Break down complex concepts into digestible pieces
- Ask follow-up questions to engage the learner
- Share interesting facts about AI when relevant
- Keep responses concise but informative (2-4 paragraphs max)
- Use a warm, conversational tone

Focus on topics like:
- What AI is and how it works
- Machine learning basics
- Natural language processing
- Practical applications of AI
- How to use AI tools effectively
- AI ethics and responsible use`,
  }

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [systemMessage, ...prompt],
    maxTokens: 500,
    temperature: 0.7,
  })

  // useChat 훅이 이해할 수 있도록 응답을 스트리밍 형식으로 반환합니다.
  return result.toAIStreamResponse()
}
