import React from 'react'
import { TodoContext } from '../Context/TodoContext'
import { useContext, useState } from 'react'

function InputBox() {
    const { addTodo } = useContext(TodoContext);

    const [NewTodo, setNewTodo] = useState({
        id: Date.now(),
        message: "",
        isChecked: false
    });

    const add = (e) => {
        e.preventDefault()
        // Ensure we are checking the message string specifically
        if (!NewTodo.message.trim()) return;
        
        addTodo(NewTodo.message) // Passing the message to your addTodo logic
        
        setNewTodo({
            id: Date.now(),
            message: "",
            isChecked: false
        });
    }

    // ... logic remains the same

 /// ... logic
    return (
        <form onSubmit={add} className="flex items-center p-1.5">
            <input
                type="text"
                placeholder="Initialize Task..."
                className="w-full bg-transparent border-none rounded-xl px-4 py-3 
                           text-white outline-none placeholder:text-zinc-600 text-sm
                           focus:ring-0 transition-all"
                value={NewTodo.message}
                onChange={(e) => setNewTodo({ ...NewTodo, message: e.target.value })}
            />
            <button
                type="submit"
                className="bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 
                           rounded-xl hover:bg-indigo-400 transition-all active:scale-95
                           shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
            >
                Add
            </button>
        </form>
    )
}

export default InputBox