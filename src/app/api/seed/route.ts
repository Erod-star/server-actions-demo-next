import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // DELETE * FROM todo;

  await prisma.todo.createMany({
    data: [
      { description: 'Soul stone', complete: true },
      { description: 'Power stone', complete: false },
      { description: 'Time stone', complete: false },
      { description: 'Reality stone', complete: false },
      { description: 'Space stone', complete: false },
    ],
  });

  return NextResponse.json({ message: 'Seed Executed' });
}
