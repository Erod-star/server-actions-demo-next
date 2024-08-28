// ? Types
import type { Todo } from "@prisma/client";

// const sleep = async (seconds: number):Promise<boolean> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true)
//         }, seconds * 1000)
//     })
// }

export const createTodo = async (description: string):Promise<Todo> => {
    const body = { description }
    
    const newTodo = await fetch('/api/todos', {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())

    return newTodo
}

export const updateTodo = async (id: string, complete: boolean):Promise<Todo> => {
    const body = { complete }
    
    const updatedTodo = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())

    return updatedTodo
}

export const deleteCompleted = async ():Promise<void> => {
    await fetch('/api/todos/', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
}