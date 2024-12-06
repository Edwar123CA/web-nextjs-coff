"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de toastify
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';

function CreateBillboard() {
  const [label, setLabel] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');

  useEffect(() => {
    // Fetch stores
    const fetchStores = async () => {
      try {
        const storesRes = await fetch('/apis/store');
        const storesData = await storesRes.json();
        setStores(Array.isArray(storesData) ? storesData : [storesData]);

        // Set default selected store if there are stores available
        if (storesData.length > 0) {
          setSelectedStore(storesData[0].id);
        }
      } catch (error) {
        toast.error(`Error al cargar datos: ${error.message}`);
      }
    };

    fetchStores();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/apis/billboard', { // Asegúrate de que la ruta coincida con tu endpoint API
        method: 'POST',
        body: JSON.stringify({ 
          label: label,
          storeId: selectedStore
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Billboard guardado.');
        setLabel('');
        setSelectedStore(stores.length > 0 ? stores[0].id : '');
      } else {
        toast.error(`Error: ${data.error || 'No se pudo guardar el billboard.'}`);
      }
    } catch (error) {
      toast.error('Error al guardar el billboard.');
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg">
        <div className='text-center mb-6'>
          <h1 className="text-2xl font-bold text-pink-700">Agregar Billboard</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Etiqueta</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tienda</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            >
              <option value="">Seleccione una tienda</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href='/admin/billboard/cm05yv6j70000lxjmruf43ghv'>
                <button className='bg-black text-white rounded-lg shadow-md hover:bg-pink-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                  <ArrowLeftIcon className='h-5 w-5' aria-hidden="true" />
                  <span>Ir a Lista</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-pink-600 text-white p-3 rounded-md shadow-md hover:bg-pink-700 transition-colors flex items-center space-x-2"
              >
                <SaveIcon className='h-5 w-5' aria-hidden="true" />
                <span>Guardar</span>
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
}

export default CreateBillboard;
