//import { api } from "@/lib/llm";
import CreateForm from "@/components/items/create-form";

export default async function Home() {
  //const response = await api();
  //console.log(response);
  return (
    <>
      <h1>Hello World</h1>
      <CreateForm />
    </>
  );
}
