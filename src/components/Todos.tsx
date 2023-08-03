"use client"

import { useTodos } from "@/store/TodosProvider";
import { useEffect, useState } from "react";



const Todos = () => {
    const {todos, handleDeleteTodo, handleCompleted} = useTodos()

    return (
        <ul>
            {
                todos.map(todo => (
                    <li className="flex gap-10 justify-center items-center" key={todo.id}>
                        <input onChange={() => handleCompleted(todo.id)} type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.completed} />
                        <label htmlFor={`todo-${todo.id}`} className={`${todo.completed && "line-through"}`}>{todo.task}</label>
                        {
                            todo.completed && <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        }
                    </li>
                ))
            }
        </ul>
    );
};

export default Todos;