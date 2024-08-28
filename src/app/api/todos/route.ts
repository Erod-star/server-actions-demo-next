import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

// * GET METHOD
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take)) {
    return NextResponse.json(
      { error: 'The take parameter must be a number' },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { error: 'The skip parameter must be a number' },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

// * POST METHOD
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

// * DELETE COMPLETED METHOD
export async function DELETE(request: Request) {
  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });

    return NextResponse.json({
      message: `${deletedTodos.count} todos deleted`,
      todos: deletedTodos,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
