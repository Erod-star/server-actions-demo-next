'use client';

import { startTransition, useOptimistic } from 'react';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

// ? Types
import type { Todo } from '@prisma/client';

// ? Styles
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  // TODO: Acciones por llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <div
      className={
        todoOptimistic.complete ? styles['todo-done'] : styles['todo-pending']
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 
          ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}`}
          // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete) }
          onClick={() => onToggleTodo()}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
