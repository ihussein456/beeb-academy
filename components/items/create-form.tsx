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
import { markAnswer } from "@/lib/actions"
import { useActionState } from "react"
import { QuestionBank } from "@/lib/definitions"

export default function CreateForm({question} : {question: QuestionBank}) {
  const [state, formAction] = useActionState(markAnswer, null)
  return (
    <div className="grid w-full max-w-md gap-4 mt-4 mx-auto">
    <Form action={formAction}>
      <input type="hidden" name="question" value={question.questions} />
      <input type="hidden" name="marks" value={question.marks} />
      <input type="hidden" name="markscheme" value={question.markscheme} />
    <InputGroup>
      <InputGroupTextarea
        id="textarea-code-32"
        placeholder="Write your answer here..."
        className="min-h-[200px]"
        name="answer"
        required
      />
      <InputGroupAddon align="block-end" className="border-t">
        <InputGroupText>{question.marks} Mark{question.marks !== 1 ? 's' : ''}</InputGroupText>
        <InputGroupButton type="submit" size="sm" className="ml-auto cursor-pointer" variant="default">
          Mark <IconCornerDownLeft />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText className="font-mono font-medium">
          <IconBrandJavascript />
          {question.questions}
        </InputGroupText>
        <InputGroupButton className="ml-auto" size="icon-xs">
          <IconRefresh />
        </InputGroupButton>
        <InputGroupButton variant="ghost" size="icon-xs">
          <IconCopy />
        </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
    {state && (
      <div className="mt-4 p-4 rounded-lg border bg-card">
        <h2 className="font-semibold mb-2">Response</h2>
        <p>{state}</p>
      </div>
    )}
  </div>
  )
}