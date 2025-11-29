'use client'

import {
    IconHelp,
    IconCornerDownLeft,
    IconArrowRight,
    IconRefresh,
    IconLoader2,
    IconCheck,
    IconX
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
import { getSubjectColor } from "@/utils/subject"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

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
    <div className="max-w-3xl w-full mx-auto py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-md shadow-sm overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-secondary/30 px-6 py-4 border-b border-border flex items-center justify-between">
           <div className="flex items-center gap-3">
              <span className={cn("text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-md border font-medium", getSubjectColor(currentQuestion.subject))}>
                {currentQuestion.subject}
              </span>
           </div>
           <div className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
              {currentQuestion.marks} Mark{currentQuestion.marks !== 1 ? 's' : ''}
           </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Question Block */}
          <div className="mb-8">
             <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <IconHelp size={16} /> Question
             </h3>
             <div className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                {currentQuestion.questions}
             </div>
          </div>

          {/* Answer Form */}
          <Form action={formAction} onSubmit={() => { setShowResult(false); setIsMarking(true); }}>
            <input type="hidden" name="question" value={currentQuestion.questions} />
            <input type="hidden" name="marks" value={currentQuestion.marks} />
            <input type="hidden" name="markscheme" value={currentQuestion.markscheme} />
            <input type="hidden" name="subject" value={currentQuestion.subject} />
            
            <div className="relative group">
              <InputGroup className="flex-col items-stretch shadow-none">
                <InputGroupTextarea
                  ref={textareaRef}
                  id="answer-input"
                  placeholder="Type your answer here..."
                  className="min-h-[200px] resize-y bg-background border-border focus:border-muted-foreground/50 focus:ring-0 p-4 text-base leading-relaxed transition-colors rounded-md"
                  name="answer"
                  required
                />
                
                <div className="flex items-center justify-between mt-4">
                   <button 
                      type="button"
                      onClick={handleRefresh}
                      disabled={isPending || isMarking}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors px-2 py-1 rounded hover:bg-secondary"
                   >
                      <IconRefresh size={14} className={isPending ? "animate-spin" : ""} />
                      Skip Question
                   </button>

                   <InputGroupButton 
                      type="submit" 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 rounded shadow-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isMarking}
                   >
                      {isMarking ? (
                        <>
                          <IconLoader2 size={16} className="animate-spin" />
                          Marking...
                        </>
                      ) : (
                        <>
                          Submit Answer <IconCornerDownLeft size={16} />
                        </>
                      )}
                   </InputGroupButton>
                </div>
              </InputGroup>
            </div>
          </Form>
        </div>
      </motion.div>

      {/* Result Section */}
      <AnimatePresence>
        {showResult && state && (
          <motion.div
            ref={responseRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-6 overflow-hidden"
          >
            <div className="bg-card border border-border rounded-md shadow-sm p-6 md:p-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
               
               <div className="mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                     <IconCheck size={14} />
                  </div>
                  <h3 className="font-semibold text-foreground">AI Feedback</h3>
               </div>
               
               <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
                  {state}
               </div>

               <div className="mt-8 flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleRefresh}
                    className="bg-secondary hover:bg-secondary/80 text-foreground border border-border px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    Next Question <IconArrowRight size={16} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
