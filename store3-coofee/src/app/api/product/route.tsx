import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET(req: Request) {
  const storeId = '641cc3cc-f547-4ae3-8c14-bd7c30a127fe'; // Puedes obtener esto dinámicamente si es necesario

  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'product') {
      // Obtener un producto específico filtrado por storeId
      const product = await prisma.product.findUnique({
        where: {
          id: id as string,
          storeId: storeId, // Filtra por storeId
        },
        include: {
          category: true,
          images: true,
        },
      });

      if (!product) {
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      }

      return NextResponse.json(product);
    } else {
      // Obtener todos los productos filtrados por storeId
      const products = await prisma.product.findMany({
        where: {
          storeId: storeId, // Filtra por storeId
        },
        include: {
          category: true,
          size: true,
          color: true,
          images: true,
        },
      });

      if (products.length === 0) {
        return NextResponse.json({ message: 'No hay registros' }, { status: 404 });
      }

      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// Handler para POST
export async function POST(request: Request) {
  try {
    const { name, price, storeId, categoryId, sizeId, colorId, images } = await request.json();

    // Validar que todos los campos obligatorios están presentes
    if (!name || !price || !storeId || !categoryId || !sizeId || !colorId || !images) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    // Verificar si el tamaño existe
    const sizeExists = await prisma.size.findUnique({
      where: { id: sizeId },
    });

    if (!sizeExists) {
      return NextResponse.json({ error: 'Invalid sizeId: No matching size found.' }, { status: 400 });
    }

    // Asegurarse de que los elementos en 'images' sean strings y no objetos
    const formattedImages = images.map((image: string | { url: string }) => {
      // Si 'image' ya es un string, lo retornamos; si es un objeto, retornamos la propiedad 'url'
      return typeof image === 'string' ? image : image.url;
    });

    // Crear el producto en la base de datos
    const product = await prisma.product.create({
      data: {
        name,
        price,
        storeId,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: formattedImages.map((url: string) => ({ url })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);

    return NextResponse.json({
      error: `An error occurred while creating the product: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

