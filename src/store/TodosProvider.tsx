"use client"


import { ReactNode, createContext, useContext, useState } from "react";


type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task:string) => void;
    handleDeleteTodo: (id: string) => void;
    handleCompleted: (id: string) => void
}

const todosContext = createContext<TodosContext | null>(null)

const TodosProvider = ({children}: {children: ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try{
        const newTodos = localStorage.getItem('todos') || "[]";
        return JSON.parse(newTodos) as Todo[]
        }catch (e) {
            return []
        } })
    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }
    
    const handleCompleted = (id: string) : void => {
        setTodos((prev) => {
            return prev.map(todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        completed : !todo.completed
                    }
                }
                return todo
            })
        })
    }

    const handleDeleteTodo = (id: string) : void => {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }
    return (
        <todosContext.Provider value={{
        todos,
        handleAddTodo,
        handleDeleteTodo,
        handleCompleted
    }}>
            {children}
        </todosContext.Provider>
    );
};

export const useTodos = () => {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("useTodos used outside of Provider");
    }

    return todosContextValue;
}

export default TodosProvider;

