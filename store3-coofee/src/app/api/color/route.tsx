// pages/api/colors.ts

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

    // Crear el color en la base de datos
    const color = await prisma.color.create({
      data: {
        name,
        value,  // Asegúrate de que este campo esté presente
        storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error: any) {
    console.error('Error creating color:', error);

    return NextResponse.json({
      error: `An error occurred while creating the color: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}


export async function GET() {
  const storeId = '641cc3cc-f547-4ae3-8c14-bd7c30a127fe'; // O puede obtenerse dinámicamente si es necesario

  try {
    // Filtrar colores por el ID del store
    const colors = await prisma.color.findMany({
      where: {
        storeId: storeId, // Filtra por storeId
      },
    });

    if (colors.length === 0) {
      return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
    }

    return NextResponse.json(colors);
  } catch (error) {
    console.error('Error fetching colors:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
