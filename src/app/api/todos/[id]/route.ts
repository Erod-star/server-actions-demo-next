import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

// * GET METHOD
export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      { error: `Todo with the id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

// * PUT METHOD
const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      { error: `Todo with the id ${id} not found` },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

// * DELETE METHOD
export async function DELETE(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      { error: `Todo with the id ${id} not found` },
      { status: 404 }
    );
  }

  await prisma.todo.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: `Todo with the id ${id} has been deleted`,
    todo,
  });
}
