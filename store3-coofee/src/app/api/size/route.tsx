import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, value, storeId } = await request.json();

    // Validar que todos los campos obligatorios están presentes
    if (!name || !value || !storeId) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Verificar si la tienda existe
    const storeExists = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!storeExists) {
      return NextResponse.json({ error: 'Invalid storeId: No matching store found.' }, { status: 400 });
    }

    // Crear el tamaño en la base de datos
    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error: any) {
    console.error('Error creating size:', error);

    return NextResponse.json({
      error: `An error occurred while creating the size: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

export async function GET() {
  const storeId = '641cc3cc-f547-4ae3-8c14-bd7c30a127fe'; // O puede obtenerse dinámicamente si es necesario

  try {
    // Filtrar tamaños por el ID del store
    const sizes = await prisma.size.findMany({
      where: {
        storeId: storeId, // Filtra por storeId
      },
    });

    if (sizes.length === 0) {
      return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
    }

    return NextResponse.json(sizes);
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
