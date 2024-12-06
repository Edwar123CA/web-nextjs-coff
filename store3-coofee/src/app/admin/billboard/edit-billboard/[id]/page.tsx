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
import { CircularProgress } from '@mui/material'; // Importa un componente de loading si lo prefieres

const EditBillboard = () => {
  const { id } = useParams(); // Captura el ID del billboard desde la URL
  const [label, setLabel] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(''); // Estado para la URL de la imagen
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para redireccionar

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/store');
        if (!response.ok) throw new Error('Stores not found');
        const data = await response.json();
        setStores(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchBillboard = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/billboard/${id}`);
          if (!response.ok) throw new Error('Billboard not found');
          const data = await response.json();
          setLabel(data.label);
          setImageUrl(data.imageUrl); // Cargar la URL de la imagen
          setSelectedStore(data.storeId);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStores();
    fetchBillboard();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      toast.error('Billboard label is required.');
      return;
    }

    try {
      const response = await fetch(`/api/billboard/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, storeId: selectedStore, imageUrl }), // Incluye imageUrl
      });

      if (!response.ok) throw new Error('Failed to update billboard');

      const url = new URL('/admin/billboard/cm0bowhx700002vrjcinrzutc', window.location.origin);
      url.searchParams.set('success', 'true');
      router.push(url.toString());
    } catch (error) {
      toast.error('Error updating billboard.');
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
  if (!id) return <p>No billboard found</p>;

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-700">Edit Billboard</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Store</label>
            <select disabled
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
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

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href="/admin/billboard/cm0bowhx700002vrjcinrzutc">
                <button className="bg-black text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors py-2 px-4 flex items-center space-x-2">
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Back to List</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-pink-600 text-white p-3 rounded-md shadow-md hover:bg-pink-700 transition-colors"
              >
                <SaveIcon className="h-5 w-5" aria-hidden="true" />
                {/* <span>Save</span> */}
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
};

export default EditBillboard;
