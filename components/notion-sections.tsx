"use client"

import React, { useState } from 'react';
import { 
  Brain, 
  BookOpen, 
  CheckSquare, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  FlaskConical, 
  Atom, 
  Zap, 
  MoreHorizontal,
  Plus,
  Search,
  FileText,
  ListTodo,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NotionBlock = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("group relative flex items-start gap-2 py-1", className)}>
    <div className="opacity-0 group-hover:opacity-100 absolute -left-8 top-1.5 flex items-center gap-1 text-muted-foreground/40 transition-opacity">
        <Plus size={14} className="cursor-pointer hover:text-foreground" />
        <MoreHorizontal size={14} className="cursor-pointer hover:text-foreground" />
    </div>
    {children}
  </div>
);

const NotionCard = ({ icon: Icon, title, children, className }: { icon?: any, title?: string, children: React.ReactNode, className?: string }) => (
    <div className={cn("rounded-md border border-border bg-card p-4 shadow-sm transition-all hover:bg-secondary/50", className)}>
        {(Icon || title) && (
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                {Icon && <Icon size={16} />}
                {title && <span>{title}</span>}
            </div>
        )}
        {children}
    </div>
);

export function NotionFeatures() {
    return (
        <section className="py-16 px-6 max-w-5xl mx-auto">
            <NotionBlock className="mb-8">
                <h2 className="notion-h2 w-full">Platform Features</h2>
            </NotionBlock>

            <div className="grid md:grid-cols-2 gap-4">
                <NotionCard icon={Brain} title="AI Explanations">
                    <h3 className="font-semibold text-lg mb-2">Instant Clarity</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Get step-by-step breakdowns of complex problems. Our AI tutor adapts to your learning style, providing analogies and examples that stick.
                    </p>
                </NotionCard>

                <NotionCard icon={ListTodo} title="Personalised Path">
                    <h3 className="font-semibold text-lg mb-2">Smart Revision</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        No more random guessing. We analyze your weak spots and create a daily schedule tailored to your exam board and target grade.
                    </p>
                </NotionCard>

                <NotionCard icon={Clock} title="Progress Tracking" className="md:col-span-2">
                     <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">Real-time Analytics</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Visualize your progress with Notion-style databases and charts. Track every topic, quiz, and mock exam to see exactly where you stand.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 bg-secondary rounded border border-border p-3 text-xs font-mono text-muted-foreground">
                             <div className="flex justify-between mb-1"><span>Biology</span> <span>92%</span></div>
                             <div className="w-full bg-border h-1.5 rounded-full mb-3 overflow-hidden">
                                 <div className="bg-green-500 h-full w-[92%]"></div>
                             </div>
                             <div className="flex justify-between mb-1"><span>Chemistry</span> <span>78%</span></div>
                             <div className="w-full bg-border h-1.5 rounded-full mb-3 overflow-hidden">
                                 <div className="bg-amber-500 h-full w-[78%]"></div>
                             </div>
                             <div className="flex justify-between mb-1"><span>Physics</span> <span>85%</span></div>
                             <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-blue-500 h-full w-[85%]"></div>
                             </div>
                        </div>
                     </div>
                </NotionCard>
            </div>
        </section>
    );
}

export function NotionTopics() {
    const topics = [
        { id: 'bio', name: 'Biology', icon: <Atom size={18} className="text-green-600" />, count: '24 Modules' },
        { id: 'chem', name: 'Chemistry', icon: <FlaskConical size={18} className="text-amber-600" />, count: '18 Modules' },
        { id: 'phys', name: 'Physics', icon: <Zap size={18} className="text-purple-600" />, count: '21 Modules' },
    ];

    return (
        <section className="py-12 px-6 max-w-5xl mx-auto">
            <NotionBlock className="mb-6">
                <h2 className="notion-h2 w-full">Topic Database</h2>
            </NotionBlock>

            <div className="border border-border rounded-md overflow-hidden">
                <div className="bg-secondary/50 border-b border-border p-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="px-2 w-1/2">Name</div>
                    <div className="px-2 w-1/4">Status</div>
                    <div className="px-2 w-1/4">Modules</div>
                </div>
                {topics.map((topic) => (
                    <div key={topic.id} className="p-2 flex items-center gap-2 text-sm hover:bg-secondary/30 transition-colors border-b border-border last:border-0 cursor-pointer group">
                        <div className="px-2 w-1/2 flex items-center gap-3 font-medium">
                            <span className="p-1 bg-secondary rounded border border-border">{topic.icon}</span>
                            <span className="border-b border-transparent group-hover:border-foreground/20">{topic.name}</span>
                        </div>
                        <div className="px-2 w-1/4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                In Progress
                            </span>
                        </div>
                        <div className="px-2 w-1/4 text-muted-foreground">
                            {topic.count}
                        </div>
                    </div>
                ))}
                <div className="p-2 flex items-center gap-2 text-sm text-muted-foreground hover:bg-secondary/30 cursor-pointer">
                    <div className="px-2 flex items-center gap-2">
                        <Plus size={14} /> New Topic
                    </div>
                </div>
            </div>
        </section>
    );
}

export function NotionDaily() {
    return (
        <section className="py-12 px-6 max-w-5xl mx-auto">
            <div className="notion-callout border border-border shadow-sm">
                <div className="text-2xl">📅</div>
                <div className="flex-1">
                    <h3 className="font-bold text-base mb-1">Daily Challenge</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Complete today's quick-fire questions to keep your streak alive. Focus: <span className="font-medium text-foreground">Bonding & Structure</span>.
                    </p>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                        <CheckSquare size={14} /> Start Quiz
                    </Button>
                </div>
            </div>
        </section>
    );
}

export function NotionFooter() {
    return (
        <footer className="py-12 px-6 max-w-5xl mx-auto border-t border-border mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div className="col-span-2 md:col-span-1">
                     <div className="flex items-center gap-2 font-bold mb-4">
                        <div className="w-6 h-6 bg-foreground text-background rounded flex items-center justify-center font-serif">N</div>
                        Nucleus
                     </div>
                     <p className="text-muted-foreground text-xs">
                        The all-in-one workspace for your GCSE science revision.
                     </p>
                </div>
                
                <div>
                    <h4 className="font-medium mb-3">Product</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground hover:underline">Download</a></li>
                        <li><a href="#" className="hover:text-foreground hover:underline">Pricing</a></li>
                        <li><a href="#" className="hover:text-foreground hover:underline">School Plans</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Resources</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:text-foreground hover:underline">Community</a></li>
                        <li><a href="#" className="hover:text-foreground hover:underline">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                     <h4 className="font-medium mb-3">Legal</h4>
                     <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-foreground hover:underline">Privacy</a></li>
                        <li><a href="#" className="hover:text-foreground hover:underline">Terms</a></li>
                     </ul>
                </div>
            </div>
        </footer>
    );
}

