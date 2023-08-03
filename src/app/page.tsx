import AddTodos from "@/components/AddTodos";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="container">
      <h2 className="text-2xl text-center my-5">Todos App</h2>
      <AddTodos/>
      <Todos/>
    </main>
  )
}
