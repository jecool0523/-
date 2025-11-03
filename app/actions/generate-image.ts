"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateImage(prompt: string): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    const apiKey = process.env.GOOGLE_API_KEY

    if (!apiKey) {
      return {
        success: false,
        error: "Google API 키가 설정되지 않았습니다. 환경 변수에 GOOGLE_API_KEY를 추가해주세요.",
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    })

    console.log("[v0] Generating image with prompt:", prompt)

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["Text", "Image"],
      },
    })

    const response = result.response
    console.log("[v0] Response received")

    // Gemini returns image data in the parts array
    const parts = response.candidates?.[0]?.content?.parts || []

    for (const part of parts) {
      if (part.inlineData && part.inlineData.mimeType?.startsWith("image/")) {
        // Convert base64 image data to data URL
        const imageData = part.inlineData.data
        const mimeType = part.inlineData.mimeType
        const dataUrl = `data:${mimeType};base64,${imageData}`

        console.log("[v0] Image generated successfully")

        return {
          success: true,
          imageUrl: dataUrl,
        }
      }
    }

    // If no image found in response
    console.log("[v0] No image found in response")
    return {
      success: false,
      error: "응답에서 이미지를 찾을 수 없습니다.",
    }
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "이미지 생성 중 오류가 발생했습니다.",
    }
  }
}
