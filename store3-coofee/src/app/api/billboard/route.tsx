import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany({
      where: { storeId: '641cc3cc-f547-4ae3-8c14-bd7c30a127fe' },
    });

    if (billboards.length === 0) {
      return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
    }

    return NextResponse.json(billboards);
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
