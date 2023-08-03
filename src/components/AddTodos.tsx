"use client"

import { useTodos } from "@/store/TodosProvider";
import { FormEvent, useState } from "react";

const AddTodos = () => {
    const [todo, setTodo] = useState("")
    const {handleAddTodo} = useTodos()



    const handleSubmit = (e : FormEvent<HTMLFormElement>) : void => {
        e.preventDefault()
        handleAddTodo(todo)
        setTodo("")
        
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-center">
            <input value={todo} onChange={(e) => setTodo(e.target.value)} className="border outline-none px-3 py-2 rounded" type="text" placeholder="add todos" />
            <button className="bg-indigo-600 px-3 py-2 text-white rounded" type="submit">Add</button>
        </form>
    );
};

export default AddTodos;