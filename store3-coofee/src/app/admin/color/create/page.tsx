"use client";
import React, { useState, useEffect } from 'react';
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

function CreateColor() {
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');

  useEffect(() => {
    // Fetch stores
    const fetchData = async () => {
      try {
        const storesRes = await fetch('/api/store');
        const storesData = await storesRes.json();
        setStores(Array.isArray(storesData) ? storesData : [storesData]);
      } catch (error) {
        toast.error(`Error al cargar datos: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set default selected value when stores are loaded
    if (stores.length > 0) {
      setSelectedStore(stores[0].id);
    }
  }, [stores]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/color', { // Asegúrate de que la ruta coincida con tu endpoint API
        method: 'POST',
        body: JSON.stringify({
          name: colorName,
          value: colorHex,
          storeId: selectedStore
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Color guardado.');
        setColorName('');
        setColorHex('');
        setSelectedStore(stores.length > 0 ? stores[0].id : '');
      } else {
        toast.error(`Error: ${data.error || 'No se pudo guardar el color.'}`);
      }
    } catch (error) {
      toast.error('Error al guardar el color.');
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 py-10 bg-red-50 rounded-lg shadow-lg">
        <div className='text-center mb-6'>
          <h1 className="text-2xl font-bold text-red-700">Agregar Color</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tienda</label>
            <select 
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Código Hexadecimal</label>
            <input
              type="text"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href='/admin/color/cm0bowhx700002vrjcinrzutc'> {/* Ajusta la ruta según tu configuración */}
                <button className='bg-black text-white rounded-lg shadow-md hover:bg-red-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                  <ArrowLeftIcon className='h-5 w-5' aria-hidden="true" />
                  <span>Ir a Lista</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 text-white p-3 rounded-md shadow-md hover:bg-red-700 transition-colors flex items-center space-x-2"
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

export default CreateColor;
