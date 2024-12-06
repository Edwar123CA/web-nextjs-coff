const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Hashing de contraseña
  const hashedPassword = await bcrypt.hash('password123', 10); // Contraseña por defecto

  // Crear un nuevo User
  const user = await prisma.user.create({
    data: {
      id: 'cm0bowhx700002vrjcinrzutc',
      email: 'user@example.com',
      password: hashedPassword,
      name: 'Edwards',
      state: 1,
      admin: 0,
    },
  });

  // Crear un nuevo Store
  const store = await prisma.store.create({
    data: {
      id: '641cc3cc-f547-4ae3-8c14-bd7c30a127fe',
      name: 'Sprint Radiator',
      userId: user.id, // Vincula al usuario creado
    },
  });

  // Crear una Billboard
  const billboard = await prisma.billboard.create({
    data: {
      storeId: store.id,
      label: 'New Photos',
      imageUrl: 'https://example.com/billboardsprint.jpg',
    },
  });

  // Crear una Category
  const category = await prisma.category.create({
    data: {
      storeId: store.id,
      billboardId: billboard.id,
      name: 'Hombres',
    },
  });

  // Crear un Size
  const size = await prisma.size.create({
    data: {
      storeId: store.id,
      name: 'Small',
      value: 'S',
    },
  });

  // Crear un Color
  const color = await prisma.color.create({
    data: {
      storeId: store.id,
      name: 'Black',
      value: '#FF0001',
    },
  });

  // Crear un Product
  const product = await prisma.product.create({
    data: {
      storeId: store.id,
      categoryId: category.id,
      name: 'Pumma Product',
      price: 229.99,
      sizeId: size.id,
      colorId: color.id,
    },
  });

  // Crear una Image
  await prisma.image.create({
    data: {
      productId: product.id,
      url: 'https://example.com/productsprint.jpg',
    },
  });

  // Crear un Order
  const order = await prisma.order.create({
    data: {
      storeId: store.id,
      isPaid: false,
      phone: '777-565-4345',
      address: '123 Stambull',
    },
  });

  // Crear un OrderItem
  await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: product.id,
    },
  });

  console.log('Seed data created');
}

main()
  .catch(e => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
