"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
import { Size, Color, Product, Store, Category } from "../../../../../types";
import { PlusIcon, Edit } from "lucide-react";

interface UserResponse {
  stores: Store[];
}

const Colors = () => {
  const { id } = useParams(); // Captura el ID del usuario de la URL
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Para redireccionar

  const handleGoBack = () => {
    window.history.back(); // Regresa a la página anterior
  };

  useEffect(() => {
    if (!id) {
      setError("User ID is not available.");
      setLoading(false);
      return;
    }

    const fetchColors = async () => {
      try {
        const res = await fetch(`/api/user/${id}`); // Usa el ID capturado
        if (!res.ok) {
          throw new Error("Failed to fetch colors");
        }
        const data: UserResponse = await res.json();

        // Extrae los colores de todas las tiendas del usuario
        const colors = data.stores.flatMap(store => store.colors);
        setColors(colors);
      } catch (error) {
        setError("Error fetching colors.");
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [id]); // Ejecuta el efecto solo si cambia el ID

  //RUTA PARA IR AL FORMUALRIO DE EDICION
  const handleEdit = (id: string) => {
    router.push(`/admin/color/edit-color/${id}`);
  };

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
  if (colors.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">No colors found</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <Link href="/admin/dashboard/cm0bowhx700002vrjcinrzutc">
          <button
            // onClick={handleGoBack}
            className="flex items-center text-red-500 hover:text-blue-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </button>
        </Link>
        <div className="bg-red-50 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-center text-2xl font-bold text-red-700">Colors</h3>
          {/* Ícono de agregar al final */}
          <Link href='/admin/color/create/'>
            <button className='bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors py-2 px-4 flex items-center space-x-2'>
              <PlusIcon className='h-5 w-5' aria-hidden="true" />
            </button>
          </Link>
          <div className="mt-4">
            <h4 className="text-xl font-semibold text-gray-800">Color List</h4>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Asign</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {colors.map((color) => (
                  <tr key={color.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{color.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{color.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-x-2">
                      {color.id ? (
                        <div
                          className="w-4 h-4 rounded-full border border-black"
                          style={{ backgroundColor: color.value }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {color.products.length > 0 ? (
                        <ul>
                          {color.products.map(product => (
                            <li key={product.id}>{product.name} - ${parseFloat(product.price).toFixed(2)}</li>
                          ))}
                        </ul>
                      ) : 'No products'}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(color.createdAt).toLocaleDateString()}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(color.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEdit(color.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Colors;

