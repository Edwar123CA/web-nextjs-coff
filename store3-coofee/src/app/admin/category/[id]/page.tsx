"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaArrowLeft } from 'react-icons/fa'; // Asegúrate de instalar react-icons si aún no lo has hecho
import Link from "next/link";
import { Size, Color, Product, Store, Category } from "../../../../../types";
import { Edit, PlusIcon } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify'; // Asegúrate de instalar react-toastify


interface UserResponse {
  stores: Store[];
}

const Category = () => {
  const searchParams = useSearchParams();
  const { id } = useParams(); // Captura el ID del usuario de la URL
  const [categories, setCategories] = useState<Category[]>([]);
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

    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/user/${id}`); // Usa el ID capturado
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: UserResponse = await res.json();

        // Extrae las categorías de todas las tiendas del usuario
        const categories = data.stores.flatMap(store => store.categories);
        setCategories(categories);
      } catch (error) {
        setError("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]); // Ejecuta el efecto solo si cambia el ID

  //RUTA PARA IR AL FORMUALRIO DE EDICION
  const handleEdit = (id: string) => {
    router.push(`/admin/category/edit-categoria/${id}`);
  };

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Producto editado.');

      // Espera 3 segundos antes de limpiar el parámetro
      const timer = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete('success');
        window.history.replaceState(null, '', `${window.location.pathname}?${newParams.toString()}`);
      }, 3000);

      // Limpia el temporizador si el componente se desmonta antes de que se complete el tiempo
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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
  if (categories.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">No categories found</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <Link href="/admin/dashboard/cm0bowhx700002vrjcinrzutc">
          <button
            // onClick={handleGoBack}
            className="flex items-center text-green-500 hover:text-blue-700 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span>Go Back</span>
          </button>
        </Link>
        <div className="bg-green-50 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-green-700 text-center">Categories</h3>
          {/* Ícono de agregar al final */}
          <Link href='/admin/category/create/'>
              <button className='bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors py-2 px-4 flex items-center space-x-2'>
                <PlusIcon className='h-5 w-5' aria-hidden="true" />
              </button>
            </Link>
          <div className="mt-4">
            <h4 className="text-xl font-semibold text-gray-800">Category List</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Asig</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    category ? (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.products.length > 0 ? (
                            <ul>
                              {category.products.map(product => (
                                <li key={product.id}>{product.name} - ${parseFloat(product.price).toFixed(2)}</li>
                              ))}
                            </ul>
                          ) : 'No products'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(category.createdAt).toLocaleDateString()}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(category.updatedAt).toLocaleDateString()}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleEdit(category.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit size={16} />
                          </button>
                          
                        </td>
                      </tr>
                    ) : null
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

export default Category;
