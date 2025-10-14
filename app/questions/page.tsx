//import { api } from "@/lib/llm";
import CreateForm from "@/components/items/create-form";
import { ThemeToggle } from "@/components/theme-toggle";

import { getQuestions } from "@/lib/data";
import { LightRays } from "@/components/ui/light-rays";

export default async function Questions() {
  //const response = await api();
  //console.log(response);
  const question = await getQuestions()

  return (
    <>
      <LightRays />
        <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Beeb Academy</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <CreateForm question={question} />
      </main>
    </>
  );
}
