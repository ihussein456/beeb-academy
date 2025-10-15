'use client'

import {
    IconBrandJavascript,
    IconCopy,
    IconCornerDownLeft,
    IconArrowRight,
    IconRefresh,
    IconLoader2,
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
  const responseRef = useRef<HTMLDivElement>(null)
  const [showResult, setShowResult] = useState(false)
  const [isMarking, setIsMarking] = useState(false)

  useEffect(() => {
    if (state) {
      setIsMarking(false)
      setShowResult(true)
      // Scroll to response after a short delay to ensure it's rendered
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
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
    <Form action={formAction} onSubmit={() => { setShowResult(false); setIsMarking(true); }}>
      <input type="hidden" name="question" value={currentQuestion.questions} />
      <input type="hidden" name="marks" value={currentQuestion.marks} />
      <input type="hidden" name="markscheme" value={currentQuestion.markscheme} />
    <div className="relative">
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
          <InputGroupButton type="submit" size="sm" className="ml-auto cursor-pointer" variant="default" disabled={isMarking}>
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
        
        {/* Loading Overlay */}
        {isMarking && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-3 z-10">
            <IconLoader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Marking your answer...</p>
          </div>
        )}
      </div>
    </Form>
    {showResult && state && (
      <>
      <div ref={responseRef} className="mt-4 p-4 rounded-lg border bg-card">
        <h2 className="font-semibold mb-2">Response</h2>
        <p className="whitespace-pre-line">{state}</p>
      </div>
      <InputGroupButton type="button" size="sm" className="ml-auto cursor-pointer text-center mx-auto" variant="default" onClick={handleRefresh}>
          Next Question <IconArrowRight />
    </InputGroupButton>
    </>
    )}
  </div>
  )
}