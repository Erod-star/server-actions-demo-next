'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

// ? Types
import type { Todo } from '@prisma/client';

const sleep = async (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw `Todo with ID ${id} not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    });
    revalidatePath('dashboard/server-todos');

    return todo;
  } catch (error) {
    return {
      message: 'Error creating todo',
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    // const deletedTodos = await prisma.todo.deleteMany({
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath('dashboard/server-todos');

    // return {
    //   message: `${deletedTodos.count} todos deleted`,
    // }
  } catch (error) {
    throw error;
    // return NextResponse.json(error, { status: 500 });
  }
};
