import React from 'react'
import { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';

function TodoList({ todo }) {
    const { updateTodo, deleteTodo, isToggle } = useContext(TodoContext);
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.message)

    const editTodo = () => {
        updateTodo(todo.id, todoMsg)
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        isToggle(todo.id)
    }
// ... logic
    return (
        <div className={`group flex items-center p-4 rounded-xl border transition-all duration-500 ${
            todo.isChecked 
            ? "bg-transparent border-transparent opacity-30 scale-[0.98]" 
            : "bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border-white/5 hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]"
        }`}>
            
            {/* The Glowing Checkbox */}
            <button 
                onClick={toggleCompleted}
                className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                    todo.isChecked 
                    ? "bg-indigo-500 border-indigo-500 shadow-[0_0_15px_#6366f1]" 
                    : "border-zinc-700 hover:border-indigo-400/50"
                }`}
            >
                {todo.isChecked && (
                    <svg className="w-3 h-3 text-white drop-shadow-[0_0_3px_white]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            <input
                type="text"
                className={`flex-1 mx-4 bg-transparent outline-none text-sm font-medium transition-all ${
                    isTodoEditable ? "text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]" : "text-zinc-200"
                } ${todo.isChecked ? "line-through text-zinc-600" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <button
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                        isTodoEditable 
                        ? "bg-white text-black shadow-[0_0_15px_white]" 
                        : "text-zinc-500 hover:text-indigo-400"
                    }`}
                    onClick={() => {
                        if (todo.isChecked) return;
                        if (isTodoEditable) editTodo();
                        else setIsTodoEditable(true);
                    }}
                >
                    {isTodoEditable ? "Save" : "Edit"}
                </button>
                
                <button
                    className="p-2 text-zinc-600 hover:text-red-500 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all"
                    onClick={() => deleteTodo(todo.id)}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
  }
export default TodoList