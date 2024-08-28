export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from '@/lib/prisma';

// ? Components
import { NewTodo, TodoGrid } from '@/todos';

export const metadata = {
  title: 'Listado de Todos',
  description: 'Tareas por hacer',
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <h1 className="text-3xl mx-auto font-semibold mb-7">
        Todos - Server actions
      </h1>
      <TodoGrid todos={todos} />
    </div>
  );
}
