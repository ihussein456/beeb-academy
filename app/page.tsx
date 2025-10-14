import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"
//import Image from "next/image"
import { BorderBeam } from "@/components/ui/border-beam"
import { ThemeToggle } from "@/components/theme-toggle";
import { LightRays } from "@/components/ui/light-rays";
export default async function Home() {
  //const response = await api();
  //console.log(response);

  return (
    <>
  <LightRays />
     <div className="flex flex-col items-center justify-center w-full min-h-screen text-center bg-gradient-to-t from-background">

                        <h1 className="text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading">
                            Ace GCSE Science with <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-bloc">
                                AI
                            </span>
                        </h1>
                        <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
                        Answer questions. Learn from AI feedback. Excel in your exams.                      <br className="hidden md:block" />
                            <span className="hidden md:block">Learn smarter, faster, and achieve your goals with personalized marking</span>
                        </p>
                        <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
                            <Button asChild>
                                <Link href="/questions" className="flex items-center">
                                    Start Learning
                                </Link>
                            </Button>
                        </div>

                        <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                            <BorderBeam
                                size={250}
                                duration={12}
                                delay={9}
                            />
                            {/*/<Image
                                src="/assets/dashboard-dark.svg"
                                alt="Dashboard"
                                width={1200}
                                height={1200}
                                quality={100}
                                className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
                            />*/}
                            <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                            <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                        </div>
                </div>
    </>
  );
}
