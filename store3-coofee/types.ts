// types.ts

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  state: number;
  admin: number;
  createdAt: Date;
  updatedAt: Date;
  stores: Store[];
}

export interface Store {
  id: string;
  name: string;
  userId: string;
  user: User; // Relación con el User
  billboards: Billboard[];
  categories: Category[];
  products: Product[];
  sizes: Size[];
  colors: Color[];
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Billboard {
  id: string;
  storeId: string;
  store: Store;
  label: string;
  imageUrl: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  storeId: string;
  store: Store;
  billboardId: string;
  billboard: Billboard;
  name: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  storeId: string;
  store?: Store; // Opcional si no siempre se requiere
  categoryId: string;
  category?: Category; // Opcional si no siempre se requiere
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  size?: Size; // Opcional si no siempre se requiere
  colorId: string;
  color?: Color; // Opcional si no siempre se requiere
  images: Image[];
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  storeId: string;
  store: Store;
  orderItems: OrderItem[];
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  cantidad: number; // Aquí agregamos cantidad como number
}

export interface Size {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  value: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Color {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  value: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  productId: string;
  product: Product;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
