"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product, Category, Size, Color } from '../../../../../../types'; // Asegúrate de que esta ruta sea correcta
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { CircularProgress } from '@mui/material'; // Importa un componente de loading si lo prefieres
import 'tailwindcss/tailwind.css'; // Asegúrate de que Tailwind CSS esté instalado y configurado
import { toast } from 'react-toastify';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const router = useRouter(); // Para redireccionar
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storeId = '32172980-1d9e-4884-af97-058b83c0a99e';

  useEffect(() => {
    const fetchProduct = async () => {
      if (!storeId || !id) {
        setError('Store ID or Product ID is missing.');
        return;
      }

      try {
        const res = await fetch(`/api/store/${storeId}/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data.product);
        setCategories(data.categories);
        setSizes(data.sizes);
        setColors(data.colors);
      } catch (error) {
        setError('Error fetching product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, storeId]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product) {
      toast.error('No product data available.');
      return;
    }

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          categoryId: product.category?.id,
          sizeId: product.size?.id,
          colorId: product.color?.id,
          images: product.images,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        toast.error('Error updating product.');
      }

      const url = new URL('/admin/product/cm0bowhx700002vrjcinrzutc', window.location.origin);
      url.searchParams.set('success', 'true');
      router.push(url.toString());
    } catch (error) {
      toast.error('Error updating product.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg shadow-lg">
        <div className='text-center mb-6'>
          <h1 className="text-2xl font-bold text-blue-700">Edit Product</h1>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={product.category?.id || ''}
                onChange={(e) => setProduct({ ...product, category: categories.find(c => c.id === e.target.value) || null })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <select
                value={product.size?.id || ''}
                onChange={(e) => setProduct({ ...product, size: sizes.find(s => s.id === e.target.value) || null })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a size</option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <select
                value={product.color?.id || ''}
                onChange={(e) => setProduct({ ...product, color: colors.find(c => c.id === e.target.value) || null })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image URLs</label>
              {product.images.map((image, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={image.url}
                    onChange={(e) => {
                      const newImages = [...product.images];
                      newImages[index].url = e.target.value;
                      setProduct({ ...product, images: newImages });
                    }}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = product.images.filter((_, i) => i !== index);
                      setProduct({ ...product, images: newImages });
                    }}
                    className="ml-2 bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setProduct({ ...product, images: [...product.images, { id: Date.now().toString(), url: '' }] })}
                className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600 transition-colors"
              >
                Add Image
              </button>
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
                className="bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                <SaveIcon className='h-5 w-5' aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default EditProduct;
