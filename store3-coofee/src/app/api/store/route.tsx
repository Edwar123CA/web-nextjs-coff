import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  const storeId = '641cc3cc-f547-4ae3-8c14-bd7c30a127fe'; // O puede obtenerse dinámicamente si es necesario

  try {
    // Filtrar categorías por el ID del store
    const categories = await prisma.store.findMany({
      where: {
        id: storeId, // Filtra por storeId
      },
    });

    if (categories.length === 0) {
      return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}

