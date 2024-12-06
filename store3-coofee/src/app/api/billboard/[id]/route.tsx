import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de ajustar el import a tu configuración

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { label, storeId, imageUrl } = await request.json();

    // Verifica si el billboard existe antes de proceder con la actualización
    const existingBillboard = await prisma.billboard.findUnique({ where: { id: params.id } });
    if (!existingBillboard) {
      return NextResponse.json({ error: 'Billboard not found' }, { status: 404 });
    }

    // Asegúrate de que los campos opcionales existan en el cuerpo de la solicitud
    const updateData: any = {};
    if (label !== undefined) updateData.label = label;
    if (storeId !== undefined) updateData.storeId = storeId;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updatedBillboard = await prisma.billboard.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedBillboard);
  } catch (error: any) {
    console.error('Error updating billboard:', error);
    return NextResponse.json({
      error: `An error occurred while updating the billboard: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'billboard') { // Si hay un ID en la URL
      const billboard = await prisma.billboard.findUnique({
        where: { id: id as string },
      });

      if (!billboard) {
        return NextResponse.json({ message: 'Billboard not found' }, { status: 404 });
      }

      return NextResponse.json(billboard);
    } else { // Si no hay ID en la URL, obtén todos los billboards
      const billboards = await prisma.billboard.findMany();

      if (billboards.length === 0) {
        return NextResponse.json({ message: 'No billboards found' }, { status: 404 });
      }

      return NextResponse.json(billboards);
    }
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return NextResponse.json({
      error: `An error occurred while fetching billboards: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
