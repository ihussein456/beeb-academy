import CreateForm from "@/components/items/create-form";
import { getQuestions } from "@/lib/data";
import { HeroHeader } from "@/components/header";

export default async function Questions() {
  const question = await getQuestions()

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-[#2eaadc] selection:text-white">
      <HeroHeader />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto mb-8">
           <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Workspace</span>
              <span>/</span>
              <span>Practice</span>
           </div>
           <h1 className="text-3xl font-bold text-foreground tracking-tight">Question Bank</h1>
        </div>
        <CreateForm question={question} />
      </main>
    </div>
  );
}
