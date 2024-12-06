import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  try {
    // Cambia la consulta para obtener todos los usuarios
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return NextResponse.json({ message: 'No hay usuarios registrados' }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
