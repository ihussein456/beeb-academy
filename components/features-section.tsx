import { 
    Brain, 
    TrendingUp, 
    FlaskConical, 
    Lightbulb, 
    Trophy 
} from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { BorderBeam } from "@/components/ui/border-beam";

const features = [
    {
        title: "AI-Driven Tutoring",
        description: "Get instant feedback and personalized explanations for every answer.",
        icon: Brain,
    },
    {
        title: "Personalized Revision",
        description: "Adaptive learning paths that focus on your weak spots and track progress.",
        icon: TrendingUp,
    },
    {
        title: "Topic Question Banks",
        description: "Comprehensive practice for Biology, Chemistry, and Physics.",
        icon: FlaskConical,
    },
    {
        title: "Step-by-Step Solutions",
        description: "Detailed breakdowns helping you understand the 'why' behind every answer.",
        icon: Lightbulb,
    },
    {
        title: "Daily Challenges",
        description: "Quick quizzes to keep your streak alive and knowledge fresh.",
        icon: Trophy,
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
             <div
                aria-hidden
                className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_0%,var(--color-background)_75%)]"
            />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything you need to ace GCSE Science
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Intelligent tools designed to make revision more effective and engaging.
                    </p>
                </div>

                <AnimatedGroup
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    preset="scale"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="size-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl transition-colors duration-300 pointer-events-none" />
                            <BorderBeam
                                size={200}
                                duration={12}
                                delay={9 * index}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    ))}
                </AnimatedGroup>
            </div>
        </section>
    );
}

