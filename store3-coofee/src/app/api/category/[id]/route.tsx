import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Asegúrate de ajustar el import a tu configuración

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, description } = await request.json();

    // Verifica si la categoría existe antes de proceder con la actualización
    const existingCategory = await prisma.category.findUnique({ where: { id: params.id } });
    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Asegúrate de que los campos opcionales existan en el cuerpo de la solicitud
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    return NextResponse.json({
      error: `An error occurred while updating the category: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'category') { // Si hay un ID en la URL
      const category = await prisma.category.findUnique({
        where: { id: id as string },
      });

      if (!category) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
      }

      return NextResponse.json(category);
    } else { // Si no hay ID en la URL, obtén todas las categorías
      const categories = await prisma.category.findMany();

      if (categories.length === 0) {
        return NextResponse.json({ message: 'No categories found' }, { status: 404 });
      }

      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({
      error: `An error occurred while fetching categories: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
