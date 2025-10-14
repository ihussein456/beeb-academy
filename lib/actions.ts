'use server'

import { api } from "@/lib/llm"
import { getQuestions } from "@/lib/data"
import { QuestionBank } from "./definitions"

export async function getRandomQuestion(): Promise<QuestionBank> {
  return await getQuestions()
}

export async function markAnswer(prevState: string | null | undefined, formData: FormData) {
  const answer = formData.get('answer') as string
  const question = formData.get('question') as string
  const marks = parseInt(formData.get('marks') as string)
  const markscheme = formData.get('markscheme') as string
  
  const response = await api(answer, question, marks, markscheme)
  //console.log(answer)
  //console.log(response)
  return response
}