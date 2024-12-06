import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtén el ID de la URL

    if (id && id !== 'user') { // Si hay un ID en la URL
      const user = await prisma.user.findUnique({
        where: { id: id as string }, // Busca el usuario por ID
        include: {
          stores: {
            include: {
              billboards: true, // Incluye los billboards de la tienda
              categories: {
                include: {
                  products: {
                    include: {
                      images: true, // Incluye las imágenes del producto
                    },
                  },
                },
              },
              products: {
                include: {
                  images: true, // Incluye las imágenes del producto
                  category: true, // Incluye la categoría del producto
                  size: true, // Incluye el tamaño del producto
                  color: true, // Incluye el color del producto
                },
              },
              sizes: {
                include: {
                  products: {
                    include: {
                      images: true, // Incluye las imágenes del producto asociado con el tamaño
                      category: true, // Incluye la categoría del producto
                    },
                  },
                },
              }, // Incluye los tamaños disponibles en la tienda
              colors: {
                include: {
                  products: true, // Incluye los productos relacionados con cada color
                },
              }, // Incluye los colores disponibles en la tienda
              orders: {
                include: {
                  orderItems: {
                    include: {
                      product: {
                        include: {
                          images: true, // Incluye las imágenes del producto en el pedido
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }, // Incluye todas las tiendas asociadas al usuario, con billboards, categorías, productos, tamaños, colores y pedidos
      });

      if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      }

      return NextResponse.json(user);
    } else { // Si no hay ID en la URL, obtén todos los usuarios
      const users = await prisma.user.findMany();

      if (users.length === 0) {
        return NextResponse.json({ message: 'No hay usuarios registrados' }, { status: 404 });
      }

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error(); // En caso de error, retornamos una respuesta de error
  }
}
