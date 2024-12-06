"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const EditColor = () => {
  const { id } = useParams(); // Captura el ID del color desde la URL
  const [colorName, setColorName] = useState<string>('');
  const [colorValue, setColorValue] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para redireccionar

  useEffect(() => {
    if (id) {
      // Aquí puedes hacer la llamada para obtener los datos del color
      const fetchColor = async () => {
        try {
          const response = await fetch(`/api/color/${id}`);
          if (!response.ok) throw new Error('Color not found');
          const data = await response.json();
          setColorName(data.name);
          setColorValue(data.value);
          setSelectedStore(data.storeId);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchColor();
    }
  }, [id]);

  useEffect(() => {
    // Fetch stores for the store selection dropdown
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/store');
        if (!response.ok) throw new Error('Stores not found');
        const data = await response.json();
        setStores(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchStores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorName.trim() || !colorValue.trim() || !selectedStore) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`/api/color/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: colorName, value: colorValue, storeId: selectedStore }),
      });

      if (!response.ok) throw new Error('Failed to update color');

      const url = new URL('/admin/color/cm0bowhx700002vrjcinrzutc', window.location.origin);
      url.searchParams.set('success', 'true');
      router.push(url.toString());
    } catch (error) {
      toast.error('Error updating color.');
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

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-700">Edit Color</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Store</label>
            <select disabled
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="text"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href="/admin/color/cm0bowhx700002vrjcinrzutc"> {/* Ajusta la ruta según tu configuración */}
                <button className="bg-black text-white rounded-lg shadow-md hover:bg-red-700 transition-colors py-2 px-4 flex items-center space-x-2">
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Back to List</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 text-white p-3 rounded-md shadow-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <SaveIcon className="h-5 w-5" aria-hidden="true" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
      <Footer />
      <ToastContainer /> {/* Agrega el ToastContainer para mostrar notificaciones */}
    </div>
  );
};

export default EditColor;
