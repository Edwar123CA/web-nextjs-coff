import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de ajustar el import a tu configuración

// Handler para actualizar un Color existente
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, value, storeId } = await request.json();

    // Verifica si el color existe antes de proceder con la actualización
    const existingColor = await prisma.color.findUnique({ where: { id: params.id } });
    if (!existingColor) {
      return NextResponse.json({ error: 'Color not found' }, { status: 404 });
    }

    // Asegúrate de que los campos opcionales existan en el cuerpo de la solicitud
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (value !== undefined) updateData.value = value;
    if (storeId !== undefined) {
      // Verifica si la tienda existe
      const storeExists = await prisma.store.findUnique({ where: { id: storeId } });
      if (!storeExists) {
        return NextResponse.json({ error: 'Invalid storeId: No matching store found.' }, { status: 400 });
      }
      updateData.storeId = storeId;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updatedColor = await prisma.color.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedColor);
  } catch (error: any) {
    console.error('Error updating color:', error);
    return NextResponse.json({
      error: `An error occurred while updating the color: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// Handler para obtener un Color por ID o todos los Colors
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'color') { // Si hay un ID en la URL
      const color = await prisma.color.findUnique({
        where: { id: id as string },
      });

      if (!color) {
        return NextResponse.json({ message: 'Color not found' }, { status: 404 });
      }

      return NextResponse.json(color);
    } else { // Si no hay ID en la URL, obtén todos los colors
      const colors = await prisma.color.findMany();

      if (colors.length === 0) {
        return NextResponse.json({ message: 'No colors found' }, { status: 404 });
      }

      return NextResponse.json(colors);
    }
  } catch (error) {
    console.error('Error fetching colors:', error);
    return NextResponse.json({
      error: `An error occurred while fetching colors: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
