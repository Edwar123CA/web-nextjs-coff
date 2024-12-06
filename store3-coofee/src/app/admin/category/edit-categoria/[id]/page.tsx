"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Asegúrate de instalar react-toastify
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Category from '../../[id]/page';
import { CircularProgress } from '@mui/material'; // Importa un componente de loading si lo prefieres

const EditCategory = () => {
  const { id } = useParams(); // Captura el ID de la categoría desde la URL
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para redireccionar

  useEffect(() => {
    if (id) {
      // Aquí puedes hacer la llamada para obtener los datos de la categoría
      const fetchCategory = async () => {
        try {
          const response = await fetch(`/api/category/${id}`);
          if (!response.ok) throw new Error('Category not found');
          const data = await response.json();
          setCategoryName(data.name);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error('Category name is required.');
      return;
    }

    try {
      const response = await fetch(`/api/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) throw new Error('Failed to update category');

      const url = new URL('/admin/category/cm0bowhx700002vrjcinrzutc', window.location.origin);
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
  if (!Category) return <p>No product found</p>;


  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Edit Category</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href="/admin/category/cm0bowhx700002vrjcinrzutc">
                <button className="bg-black text-white rounded-lg shadow-md hover:bg-green-700 transition-colors py-2 px-4 flex items-center space-x-2">
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Back to List</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-md shadow-md hover:bg-green-700 transition-colors"
              >
                <SaveIcon className="h-5 w-5" aria-hidden="true" />
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

export default EditCategory;
