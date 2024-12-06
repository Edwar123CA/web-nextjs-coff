import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, storeId, billboardId } = await request.json();

    // Validar que todos los campos obligatorios están presentes
    if (!name || !storeId || !billboardId) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Verificar si la tienda existe
    const storeExists = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!storeExists) {
      return NextResponse.json({ error: 'Invalid storeId: No matching store found.' }, { status: 400 });
    }

    // Verificar si el billboard existe
    const billboardExists = await prisma.billboard.findUnique({
      where: { id: billboardId },
    });

    if (!billboardExists) {
      return NextResponse.json({ error: 'Invalid billboardId: No matching billboard found.' }, { status: 400 });
    }

    // Crear la categoría en la base de datos
    const category = await prisma.category.create({
      data: {
        name,
        storeId,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);

    return NextResponse.json({
      error: `An error occurred while creating the category: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}


export async function GET() {
  const storeId = '641cc3cc-f547-4ae3-8c14-bd7c30a127fe'; // O puede obtenerse dinámicamente si es necesario

  try {
    // Filtrar categorías por el ID del store
    const categories = await prisma.category.findMany({
      where: {
        storeId: storeId, // Filtra por storeId
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

