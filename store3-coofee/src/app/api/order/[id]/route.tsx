import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de ajustar el import a tu configuración

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { isPaid } = await request.json(); // Solo esperamos el campo isPaid para actualizar

    // Verifica si el pedido existe antes de proceder con la actualización
    const existingOrder = await prisma.order.findUnique({ where: { id: params.id } });
    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Asegúrate de que el campo isPaid esté presente en el cuerpo de la solicitud
    if (isPaid === undefined) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: { isPaid },
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({
      error: `An error occurred while updating the order: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
