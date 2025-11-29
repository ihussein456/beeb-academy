import React from 'react'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'
import { QuestionPrompt } from '@/components/question-prompt'
import { cn } from "@/lib/utils";

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="relative min-h-[80vh] flex flex-col justify-center bg-background selection:bg-blue-200 selection:text-blue-900">
                <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            
                            {/* Left Content */}
                            <div className="flex flex-col gap-6 pt-4">
                                {/* Icon / Logo Area */}
                                <div className="w-16 h-16 bg-secondary rounded-md border border-border flex items-center justify-center text-3xl shadow-sm">
                                    ⚛️
                                </div>

                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                                    The all-in-one workspace for <br/>
                                    <span className="text-muted-foreground">GCSE Science.</span>
                                </h1>
                                
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                                    Write, plan, and learn. An AI-powered revision hub that feels just like your favourite notebook.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 rounded shadow-sm font-medium"
                                    >
                                        <Link href="/questions">
                                            Start Learning
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                    
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="lg"
                                        className="h-11 px-6 text-muted-foreground hover:text-foreground hover:bg-secondary rounded"
                                    >
                                        <Link href="#features">
                                            Request a demo
                                        </Link>
                                    </Button>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                                    <span className="flex -space-x-2">
                                       {[1,2,3].map(i => (
                                           <div key={i} className="w-6 h-6 rounded-full bg-secondary border border-background flex items-center justify-center text-[10px]">
                                               {String.fromCharCode(64+i)}
                                           </div>
                                       ))}
                                    </span>
                                    <span>Trusted by students at 500+ schools</span>
                                </div>
                            </div>

                            {/* Right Visual - Notion Page Mockup */}
                            <div className="relative pt-8 lg:pt-0 flex items-center h-full">
                                <div className="relative z-10 transform transition-transform duration-500 w-full lg:scale-110 lg:origin-left">
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg blur opacity-50" />
                                    <QuestionPrompt />
                                    
                                    {/* Decorative 'Comment' bubbles */}
                                    <div className="absolute -right-4 top-12 bg-background border border-border shadow-sm rounded-md p-2 text-xs max-w-[140px] hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-forwards opacity-0">
                                        <div className="flex gap-2 items-start">
                                            <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5">AI</div>
                                            <p className="text-muted-foreground">Great answer! Would you like to try a harder one?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
