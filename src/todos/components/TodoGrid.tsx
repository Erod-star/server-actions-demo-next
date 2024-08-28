'use client';

import { useRouter } from 'next/navigation';

// ? Components
import { TodoItem } from './TodoItem';

// ? Actions
import { toggleTodo } from '../actions/todo-action';

// ? Types
import type { Todo } from '@prisma/client';

// import * as todosApi from '@/todos/helpers/todos';

interface TodoGridProps {
  todos?: Todo[];
}

export const TodoGrid = ({ todos = [] }: TodoGridProps) => {
  const router = useRouter();

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const udpatedTodo = await todosApi.updateTodo(id, complete);
  //   console.log('::udpatedTodo', udpatedTodo);
  //   router.refresh();
  //   // return udpatedTodo
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
