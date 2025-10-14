'use client'

import {
    IconBrandJavascript,
    IconCopy,
    IconCornerDownLeft,
    IconRefresh,
  } from "@tabler/icons-react"
  
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
  } from "@/components/ui/input-group"
import Form from "next/form"
import { markAnswer, getRandomQuestion } from "@/lib/actions"
import { useActionState, useState, useTransition, useRef, useEffect } from "react"
import { QuestionBank } from "@/lib/definitions"

export default function CreateForm({question} : {question: QuestionBank}) {
  const [state, formAction] = useActionState(markAnswer, null)
  const [currentQuestion, setCurrentQuestion] = useState(question)
  const [isPending, startTransition] = useTransition()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (state) setShowResult(true)
  }, [state])

  const handleRefresh = () => {
    startTransition(async () => {
      const newQuestion = await getRandomQuestion()
      setCurrentQuestion(newQuestion)
      if (textareaRef.current) {
        textareaRef.current.value = ''
      }
      setShowResult(false)
    })
  }

  return (
    <div className="grid w-full max-w-md gap-4 mt-4 mx-auto">
    <Form action={formAction} onSubmit={() => setShowResult(false)}>
      <input type="hidden" name="question" value={currentQuestion.questions} />
      <input type="hidden" name="marks" value={currentQuestion.marks} />
      <input type="hidden" name="markscheme" value={currentQuestion.markscheme} />
    <InputGroup>
      <InputGroupTextarea
        ref={textareaRef}
        id="textarea-code-32"
        placeholder="Write your answer here..."
        className="min-h-[200px]"
        name="answer"
        required
      />
      <InputGroupAddon align="block-end" className="border-t">
        <InputGroupText>{currentQuestion.marks} Mark{currentQuestion.marks !== 1 ? 's' : ''}</InputGroupText>
        <InputGroupButton type="submit" size="sm" className="ml-auto cursor-pointer" variant="default">
          Mark <IconCornerDownLeft />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText className="font-mono font-medium">
          <IconBrandJavascript />
          {currentQuestion.questions}
        </InputGroupText>
        <InputGroupButton 
          className="ml-auto" 
          size="icon-xs"
          onClick={handleRefresh}
          disabled={isPending}
          type="button"
        >
          <IconRefresh className={isPending ? "animate-spin" : ""} />
        </InputGroupButton>
        <InputGroupButton variant="ghost" size="icon-xs">
          <IconCopy />
        </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
    {showResult && state && (
      <div className="mt-4 p-4 rounded-lg border bg-card">
        <h2 className="font-semibold mb-2">Response</h2>
        <p>{state}</p>
      </div>
    )}
  </div>
  )
}