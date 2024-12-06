import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; // Ajusta la ruta según la ubicación de tu instancia de Prisma

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Verificar si el producto existe antes de intentar eliminarlo
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Cambiar el estado de archivado
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { isArchived: true }, // Archivar el producto en lugar de eliminarlo
    });

    return NextResponse.json({ message: 'Product archived successfully', product: updatedProduct }, { status: 200 });
  } catch (error: any) {
    console.error('Error archiving product:', error);

    return NextResponse.json({
      error: `An error occurred while archiving the product: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
      images, // Añadir este campo para recibir las URLs de las imágenes
    } = await request.json();

    // Verifica si el producto existe antes de proceder con la actualización
    const existingProduct = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Asegúrate de que los campos opcionales existan en el cuerpo de la solicitud
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) {
      if (price <= 0) {
        return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
      }
      updateData.price = price;
    }
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
    if (isArchived !== undefined) updateData.isArchived = isArchived;
    if (categoryId !== undefined) {
      const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!categoryExists) {
        return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
      }
      updateData.categoryId = categoryId;
    }
    if (sizeId !== undefined) {
      const sizeExists = await prisma.size.findUnique({ where: { id: sizeId } });
      if (!sizeExists) {
        return NextResponse.json({ error: 'Invalid size ID' }, { status: 400 });
      }
      updateData.sizeId = sizeId;
    }
    if (colorId !== undefined) {
      const colorExists = await prisma.color.findUnique({ where: { id: colorId } });
      if (!colorExists) {
        return NextResponse.json({ error: 'Invalid color ID' }, { status: 400 });
      }
      updateData.colorId = colorId;
    }

    if (images !== undefined) {
      if (!Array.isArray(images) || images.some(img => typeof img.url !== 'string')) {
        return NextResponse.json({ error: 'Invalid images data' }, { status: 400 });
      }
      // Elimina todas las imágenes existentes y agrega las nuevas
      updateData.images = {
        deleteMany: {}, // Elimina todas las imágenes existentes
        create: images.map(img => ({ url: img.url })), // Crea nuevas imágenes
      };
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
      include: { images: true }, // Incluye las imágenes en la respuesta si es necesario
    });

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      error: `An error occurred while updating the product: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'product') { // Si hay un ID en la URL
      const product = await prisma.product.findUnique({
        where: { id: id as string }, // Busca el producto por ID
        include: {
          category: true, // Incluye la categoría en los resultados
          size: true,     // Incluye el tamaño
          color: true,    // Incluye el color
          images: true, // Incluye las imágenes en los resultados
        },
      });

      if (!product) {
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      }

      return NextResponse.json(product);
    } else { // Si no hay ID en la URL, obtén todos los productos
      const products = await prisma.product.findMany({
        include: {
          category: true, // Incluye la categoría en los resultados
          images: true, // Incluye las imágenes en los resultados
        },
      });

      if (products.length === 0) {
        return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
      }

      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}