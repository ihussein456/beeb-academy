"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check, X, CornerDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

const questions = [
    {
        question: "Which process involves the movement of water across a partially permeable membrane?",
        options: ["Active Transport", "Osmosis", "Diffusion", "Transpiration"],
        correct: 1, // Index of Osmosis
        explanation: "Osmosis is specifically the diffusion of water molecules from a dilute solution to a more concentrated solution.",
        subject: "GCSE Biology"
    },
]

export function QuestionPrompt() {
    // const [currentQIndex, setCurrentQIndex] = useState(0) // Removed unused state
    const currentQIndex = 0; // Simplified for now since we only have one question
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [showExplanation, setShowExplanation] = useState(false)

    const currentQuestion = questions[currentQIndex]

    const handleSelect = (idx: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(idx);
        setTimeout(() => setShowExplanation(true), 400);
    };

    // Reset for demo purposes
    useEffect(() => {
        if (showExplanation) {
             const timer = setTimeout(() => {
                setSelectedOption(null);
                setShowExplanation(false);
             }, 5000);
             return () => clearTimeout(timer);
        }
    }, [showExplanation]);

    return (
        <div className="w-full max-w-md mx-auto bg-card rounded-md border border-border shadow-sm overflow-hidden relative group notion-card-hover cursor-pointer">
             {/* Top Bar - Mac OS dots or similar simple UI */}
            <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                <div className="ml-auto text-[10px] font-mono text-muted-foreground/70">READ-ONLY</div>
            </div>

            <div className="p-6">
                <div className="flex items-start gap-2 mb-6">
                    <div className="mt-1 text-2xl">🧬</div>
                    <div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                            {currentQuestion.subject}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground leading-tight">
                            {currentQuestion.question}
                        </h3>
                    </div>
                </div>

                <div className="space-y-1 pl-2 border-l-2 border-border/50 ml-3">
                    {currentQuestion.options.map((opt, idx) => {
                        let stateStyles = "hover:bg-secondary text-foreground";
                        let icon = <div className="w-4 h-4 border border-muted-foreground/40 rounded flex items-center justify-center" />
                        
                        if (selectedOption !== null) {
                            if (idx === currentQuestion.correct) {
                                stateStyles = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
                                icon = <Check className="w-4 h-4" />;
                            } else if (selectedOption === idx) {
                                stateStyles = "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
                                icon = <X className="w-4 h-4" />;
                            } else {
                                stateStyles = "opacity-50";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                disabled={selectedOption !== null}
                                className={cn(
                                    "w-full text-left py-2 px-3 rounded flex items-center gap-3 text-sm transition-colors duration-150",
                                    stateStyles
                                )}
                            >
                                <span className="text-muted-foreground shrink-0 flex items-center justify-center w-5 h-5">
                                    {selectedOption === null ? (
                                        <span className="text-xs opacity-50 font-mono">
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                    ) : icon}
                                </span>
                                <span className="font-medium">{opt}</span>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {showExplanation && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden pl-8"
                        >
                            <div className="bg-secondary/50 p-3 rounded border border-border text-sm flex gap-3">
                                <CornerDownRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-semibold text-foreground">Explanation: </span>
                                    <span className="text-muted-foreground">{currentQuestion.explanation}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
