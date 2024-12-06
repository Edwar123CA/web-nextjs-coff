import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  try {
    const order = await prisma.order.findMany();

    if (order.length === 0) {
      return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
    }

    // console.log(order); // Asegúrate de que esta línea esté antes del return
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}

export async function POST(request: Request) {
  try {
    const { storeId, isPaid, phone, address, orderItems } = await request.json();

    // Validar que todos los campos obligatorios están presentes
    if (!storeId || !orderItems || orderItems.length === 0) {
      return NextResponse.json({ error: 'storeId y orderItems son obligatorios.' }, { status: 400 });
    }

    // Validar que phone y address no estén vacíos
    if (!phone || !address) {
      return NextResponse.json({ error: 'phone y address son obligatorios y no deben estar vacíos.' }, { status: 400 });
    }

    // Validar que cada orderItem tiene los campos necesarios
    for (const item of orderItems) {
      if (!item.productId || item.cantidad === undefined) {
        return NextResponse.json({ error: 'Cada orderItem debe tener productId y cantidad.' }, { status: 400 });
      }
    }

    // Verificar si la tienda existe
    const storeExists = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!storeExists) {
      return NextResponse.json({ error: 'storeId inválido: No se encontró la tienda.' }, { status: 400 });
    }

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        storeId,
        isPaid: isPaid ?? false,
        phone,
        address,
        orderItems: {
          createMany: {
            data: orderItems.map((item: { productId: string; cantidad: number }) => ({
              productId: item.productId,
              cantidad: item.cantidad,
            })),
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating order:', error);

    return NextResponse.json({
      error: `Ocurrió un error al crear la orden: ${error instanceof Error ? error.message : 'Error desconocido'}`
    }, { status: 500 });
  }
}

