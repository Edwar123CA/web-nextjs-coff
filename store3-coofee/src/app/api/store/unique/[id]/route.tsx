import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de tener la configuración de Prisma

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'store') { // Si hay un ID en la URL
      const store = await prisma.store.findUnique({
        where: { id: id as string }, // Busca la tienda por ID
      });

      if (!store) {
        return NextResponse.json({ message: 'Tienda no encontrada' }, { status: 404 });
      }

      return NextResponse.json(store);
    } else { // Si no hay ID en la URL, obtén todas las tiendas
      const stores = await prisma.store.findMany();

      if (stores.length === 0) {
        return NextResponse.json({ message: 'No hay tiendas registradas' }, { status: 404 });
      }

      return NextResponse.json(stores);
    }
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
