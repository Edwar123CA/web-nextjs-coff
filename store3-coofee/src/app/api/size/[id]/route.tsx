import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de ajustar el import a tu configuración

// Handler para actualizar un Size existente
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, value, storeId } = await request.json();

    // Verifica si el tamaño existe antes de proceder con la actualización
    const existingSize = await prisma.size.findUnique({ where: { id: params.id } });
    if (!existingSize) {
      return NextResponse.json({ error: 'Size not found' }, { status: 404 });
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

    const updatedSize = await prisma.size.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedSize);
  } catch (error: any) {
    console.error('Error updating size:', error);
    return NextResponse.json({
      error: `An error occurred while updating the size: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// Handler para obtener un Size por ID o todos los Sizes
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'size') { // Si hay un ID en la URL
      const size = await prisma.size.findUnique({
        where: { id: id as string },
      });

      if (!size) {
        return NextResponse.json({ message: 'Size not found' }, { status: 404 });
      }

      return NextResponse.json(size);
    } else { // Si no hay ID en la URL, obtén todos los sizes
      const sizes = await prisma.size.findMany();

      if (sizes.length === 0) {
        return NextResponse.json({ message: 'No sizes found' }, { status: 404 });
      }

      return NextResponse.json(sizes);
    }
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return NextResponse.json({
      error: `An error occurred while fetching sizes: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
