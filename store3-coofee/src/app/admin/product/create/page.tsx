"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de toastify
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';

interface Store {
  id: string;
  name: string;
}

function CreateProduct() {
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, categoryRes, sizeRes, colorRes] = await Promise.all([
          fetch('/api/store'),
          fetch('/api/category'),
          fetch('/api/size'),
          fetch('/api/color')
        ]);

        if (!storeRes.ok || !categoryRes.ok || !sizeRes.ok || !colorRes.ok) {
          throw new Error('Error fetching data');
        }

        const storesData: Store[] = await storeRes.json();
        const categoriesData = await categoryRes.json();
        const sizesData = await sizeRes.json();
        const colorsData = await colorRes.json();

        setStores(storesData);
        setCategories(categoriesData);
        setSizes(sizesData);
        setColors(colorsData);
      } catch (error) {
        toast.error('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const storeId = formData.get('storeId') as string;
    const categoryId = formData.get('categoryId') as string;
    const sizeId = formData.get('sizeId') as string;
    const colorId = formData.get('colorId') as string;
    const images = (formData.get('images') as string).split(',').map(url => ({ url: url.trim() }));

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        body: JSON.stringify({ name, price, storeId, categoryId, sizeId, colorId, images }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Producto guardado.');
        formRef.current?.reset(); // Restablece el formulario
      } else {
        toast.error(`Error: ${data.error || 'No se pudo guardar el producto.'}`);
      }
    } catch (error) {
      toast.error('Error al guardar el producto.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }  

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg shadow-lg">
        <div className='text-center mb-6'>
          <h1 className="text-2xl font-bold text-blue-700">Agregar Producto</h1>
        </div>
        <form onSubmit={onSubmit} ref={formRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                name="price"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tienda</label>
              <select
                name="storeId"
                
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {stores.length > 0 ? stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                )) : <option value="">No hay tiendas disponibles</option>}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                name="categoryId"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.length > 0 ? categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )) : <option value="">No hay categorías disponibles</option>}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tamaño</label>
              <select
                name="sizeId"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {sizes.length > 0 ? sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                )) : <option value="">No hay tamaños disponibles</option>}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <select
                name="colorId"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {colors.length > 0 ? colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                )) : <option value="">No hay colores disponibles</option>}
              </select>
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium text-gray-700">Imágenes (URLs separadas por comas)</label>
              <input
                type="text"
                name="images"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href='/admin/product/cm0bowhx700002vrjcinrzutc'>
                <button className='bg-black text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                  <ArrowLeftIcon className='h-5 w-5' aria-hidden="true" />
                  <span>Ir a Lista</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <SaveIcon className='h-5 w-5' aria-hidden="true" />
                <span>Guardar Producto</span>
              </button>
            </div>
          </div>

        </form>
      </div>
      <br />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default CreateProduct;
