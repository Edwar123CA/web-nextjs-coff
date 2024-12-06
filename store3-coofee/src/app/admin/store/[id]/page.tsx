"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaStore, FaArrowLeft } from 'react-icons/fa'; // Asegúrate de instalar react-icons si aún no lo has hecho

const Store = () => {
  const { id } = useParams(); // Captura el ID del usuario de la URL
  const [stores, setStores] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGoBack = () => {
    window.history.back(); // Regresa a la página anterior
  };

  useEffect(() => {
    if (!id) {
      setError("User ID is not available.");
      setLoading(false);
      return;
    }

    const fetchStores = async () => {
      try {
        const res = await fetch(`/api/user/${id}`); // Usa el ID capturado
        if (!res.ok) {
          throw new Error("Failed to fetch stores");
        }
        const data = await res.json();
        setStores(data.stores); // Asumiendo que 'stores' es la propiedad que contiene las tiendas
      } catch (error) {
        setError("Error fetching stores.");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [id]); // Ejecuta el efecto solo si cambia el ID

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-red-600">{error}</p>
    </div>
  );
  if (stores.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">No stores found</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          <span>Go Back</span>
        </button>
        {stores.map(store => (
          <div key={store.id} className="bg-yellow-50 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-yellow-700">{store.name}</h3>
                <p className="text-sm text-yellow-500">Store Profile</p>
              </div>
              <FaStore className="h-12 w-12 text-yellow-700" />
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-gray-800">Store Details</h4>
              <div className="mt-2">
                <p className="text-gray-700"><strong>Store ID:</strong> {store.id}</p>
                {/* Puedes agregar más detalles aquí si es necesario */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Store;
