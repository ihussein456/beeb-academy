'use server'

import { api } from "@/lib/llm"

export async function markAnswer(prevState: any, formData: FormData) {
  const answer = formData.get('answer') as string
  const response = await api(answer)
  console.log(answer)
  console.log(response)
  return response
}