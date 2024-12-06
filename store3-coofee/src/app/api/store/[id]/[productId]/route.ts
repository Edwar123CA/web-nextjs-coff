import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET(req: Request, { params }: { params: { storeId: string, productId?: string } }) {
  try {
    const { storeId, productId } = params;
    const storeIdentifier = storeId as string;

    if (productId) {
      const product = await prisma.product.findFirst({
        where: {
          id: productId,
          // storeId: storeIdentifier,
        },
        include: {
          category: true,
          size: true,
          color: true,
          images: true,
        },
      });

      if (!product) {
        return NextResponse.json({ message: 'Producto no encontrado en la tienda especificada' }, { status: 404 });
      }

      const categories = await prisma.category.findMany({
        where: {
          storeId: '641cc3cc-f547-4ae3-8c14-bd7c30a127fe',
          // storeId: storeIdentifier,
          // id: product.categoryId,
        },
      });

      const sizes = await prisma.size.findMany({
        where: {
          // storeId: storeIdentifier,
          storeId: '641cc3cc-f547-4ae3-8c14-bd7c30a127fe',
          // id: product.sizeId,
        },
      });

      const colors = await prisma.color.findMany({
        where: {
          // storeId: storeIdentifier,
          storeId: '641cc3cc-f547-4ae3-8c14-bd7c30a127fe',
          // id: product.colorId,
        },
      });

      return NextResponse.json({
        product,
        categories,
        sizes,
        colors,
      });
    } else {
      const store = await prisma.store.findUnique({
        where: { id: storeIdentifier },
        include: {
          billboards: true,
          categories: true,
          products: true,
          sizes: true,
          colors: true,
          orders: true,
        },
      });

      if (!store) {
        return NextResponse.json({ message: 'Tienda no encontrada' }, { status: 404 });
      }

      return NextResponse.json(store);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.error();
  }
}
