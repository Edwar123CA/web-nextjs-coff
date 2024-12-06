"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de toastify
import Link from 'next/link';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';

function CreateSize() {
  const [sizeName, setSizeName] = useState('');
  const [sizeValue, setSizeValue] = useState('');
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
      const res = await fetch('/api/size', { // Asegúrate de que la ruta coincida con tu endpoint API
        method: 'POST',
        body: JSON.stringify({
          name: sizeName,
          value: sizeValue,
          storeId: selectedStore
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Tamaño guardado.');
        setSizeName('');
        setSizeValue('');
        setSelectedStore(stores.length > 0 ? stores[0].id : '');
      } else {
        toast.error(`Error: ${data.error || 'No se pudo guardar el tamaño.'}`);
      }
    } catch (error) {
      toast.error('Error al guardar el tamaño.');
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div className="max-w-2xl mx-auto p-6 bg-purple-50 rounded-lg shadow-lg">
        <div className='text-center mb-6'>
          <h1 className="text-2xl font-bold text-purple-700">Agregar Tamaño</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tienda</label>
            <select 
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
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
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="text"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="flex justify-between">
            <div className="flex justify-start">
              <Link href='/admin/size/cm0bowhx700002vrjcinrzutc'> {/* Ajusta la ruta según tu configuración */}
                <button className='bg-black text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                  <ArrowLeftIcon className='h-5 w-5' aria-hidden="true" />
                  <span>Ir a Lista</span>
                </button>
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white p-3 rounded-md shadow-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
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

export default CreateSize;
