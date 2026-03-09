import InputBox from "./Components/InputBox"
import TodoList from "./Components/TodoList"
import { TodoProvider } from "./Context/TodoProvider"
import { useState, useEffect } from "react" // Added useEffect to import since it's used below

function App() {
  const [Todo, setTodo] = useState([])

  const addTodo = (message) => {
    const newTodo = { id: Date.now(), message: message, isChecked: false };
    setTodo((prev) => [newTodo, ...prev]);
  }

  const updateTodo = (id, message) => {
    setTodo((prev) => 
      prev.map((singleTodo) => 
        singleTodo.id === id ? { ...singleTodo, message } : singleTodo
      )
    );
  }

  const isToggle = (id) => {
    setTodo((prev) => 
      prev.map((singleTodo) => 
        singleTodo.id === id ? { ...singleTodo, isChecked: !singleTodo.isChecked } : singleTodo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((singleTodo) => singleTodo.id !== id));
  }

  useEffect(() => {
    const localtoda = JSON.parse(localStorage.getItem("Todos"));
    if(localtoda && localtoda.length > 0) setTodo(localtoda);
  }, [])

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todo))     
  }, [Todo])

// ... imports remain the same

  // ... imports
  return (
    <TodoProvider value={{ Todo, setTodo, addTodo, updateTodo, deleteTodo, isToggle }} >
      <div className="min-h-screen bg-[#02040a] py-20 px-4 antialiased selection:bg-indigo-500/40">
        
        {/* Advanced Mesh Gradient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 blur-[130px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-xl mx-auto relative z-10">
          <header className="mb-12 text-center space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              BE FOCUSED <span className="text-indigo-400 font-extralight italic">NOT DISTRACTED</span>
            </h1>
            <div className="flex justify-center gap-1">
              <span className="h-1 w-8 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
              <span className="h-1 w-2 bg-indigo-500/40 rounded-full" />
            </div>
          </header>

          <div className="space-y-8">
            {/* Input Box with Outer Glow */}
            <section className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20">
              <InputBox />
            </section>

            <div className="space-y-3">
              {Todo.length > 0 ? (
                Todo.map((singleTodo) => (
                  <TodoList key={singleTodo.id} todo={singleTodo} />
                ))
              ) : (
                <div className="py-20 text-center rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">System.Ready(0)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}




export default App