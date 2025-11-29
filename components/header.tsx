'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Product', href: '#features' },
    { name: 'Download', href: '#link' },
    { name: 'Solutions', href: '#link' },
    { name: 'Resources', href: '#link' },
    { name: 'Pricing', href: '#link' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn("fixed z-50 w-full border-b border-transparent bg-background transition-all duration-200", isScrolled && "border-border shadow-sm")}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between relative">
                        
                        {/* Left: Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2 font-bold text-lg tracking-tight">
                                <Logo uniColor={true} />
                            </Link>
                        </div>

                        {/* Center: Desktop Menu */}
                        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <ul className="flex gap-6 text-sm font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground hover:bg-secondary px-3 py-2 rounded-md transition-colors">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Actions + Mobile Menu Button */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3">
                                <Link href="#" className="text-sm font-medium hover:bg-secondary px-3 py-2 rounded-md transition-colors">
                                    Log in
                                </Link>
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium h-9 px-4 rounded shadow-sm">
                                    <Link href="#">
                                        Start Learning
                                    </Link>
                                </Button>
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 lg:hidden p-2 hover:bg-secondary rounded-md">
                                {menuState ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuState && (
                     <div className="lg:hidden border-t border-border bg-background absolute w-full left-0 h-[calc(100vh-64px)] overflow-y-auto p-6">
                        <ul className="space-y-4 text-base mb-8">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="block py-2 text-muted-foreground hover:text-foreground border-b border-border/50">
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-3">
                            <Button asChild variant="outline" className="w-full justify-center">
                                <Link href="#">Log in</Link>
                            </Button>
                            <Button asChild className="w-full justify-center">
                                <Link href="#">Start Learning</Link>
                            </Button>
                        </div>
                     </div>
                )}
            </nav>
        </header>
    )
}
