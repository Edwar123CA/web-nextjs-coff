"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCartIcon, TagIcon, CubeIcon, PlusIcon } from '@heroicons/react/24/solid';
import { FaPalette, FaStore, FaImage, FaReceipt, FaClipboardList } from 'react-icons/fa';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import Billboard from '@/app/views/components/ui/billboard';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de cierre de sesión


function Dashboard() {
  const { id } = useParams(); // Captura el ID del usuario de la URL

  return (
    <div>
      <Navbar />
      <div className='mx-auto max-w-screen-xl'>
        <h3 className='font-black text-center py-6 text-2xl'>PANEL DE ADMINISTRACION</h3>
        {/* <div className='py-2'>
          <Billboard />
        </div> */}

        <div className="mx-auto px-4 py-12 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

          {/* Casillero para Store */}
          <Link href={`/admin/store/${id}`}>
            <div className="p-6 bg-yellow-100 rounded-lg shadow-lg hover:bg-yellow-200 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-yellow-700">Store</h3>
                  <p className="text-sm text-yellow-500">Administrar tiendas</p>
                </div>
                <FaStore className="h-12 w-12 text-yellow-700" />
              </div>
            </div>
          </Link>

          {/* Casillero para Billboard */}
          <Link href={`/admin/billboard/${id}`}>
            <div className="p-6 bg-pink-100 rounded-lg shadow-lg hover:bg-pink-200 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-pink-700">Billboard</h3>
                  <p className="text-sm text-pink-500">Administrar anuncios</p>
                </div>
                <FaImage className="h-12 w-12 text-pink-700" />
              </div>
            </div>
          </Link>
          {/* Casillero para Producto */}
          <Link href={`/admin/product/${id}`}>
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:bg-blue-200 transition-colors cursor-pointer relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">Producto</h3>
                  <p className="text-sm text-blue-500">Administrar productos</p>
                </div>
                <ShoppingCartIcon className="h-12 w-12 text-blue-700" />
              </div>
              {/* Signo de más en la esquina superior izquierda del contenedor */}
              <div className="absolute top-0 left-0">
                <Link href="/admin/product/create">
                  <div className="bg-blue-700 text-white rounded-full p-2 shadow-md hover:bg-blue-800 transition-colors cursor-pointer">
                    <PlusIcon className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            </div>
          </Link>

          {/* Casillero para Categoría */}
          <Link href={`/admin/category/${id}`}>
            <div className="p-6 bg-green-100 rounded-lg shadow-lg hover:bg-green-200 transition-colors cursor-pointer relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-green-700">Categoría</h3>
                  <p className="text-sm text-green-500">Administrar categorías</p>
                </div>
                <TagIcon className="h-12 w-12 text-green-700" />
              </div>
              {/* Signo de más en la esquina superior izquierda del contenedor */}
              <div className="absolute top-0 left-0">
                <Link href="/admin/category/create">
                  <div className="bg-green-700 text-white rounded-full p-2 shadow-md hover:bg-green-800 transition-colors cursor-pointer">
                    <PlusIcon className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            </div>
          </Link>

          {/* Casillero para Tamaño */}
          <Link href={`/admin/size/${id}`}>
            <div className="p-6 bg-purple-100 rounded-lg shadow-lg hover:bg-purple-200 transition-colors cursor-pointer relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-purple-700">Tamaño</h3>
                  <p className="text-sm text-purple-500">Administrar tamaños</p>
                </div>
                <CubeIcon className="h-12 w-12 text-purple-700" />
              </div>
              {/* Signo de más en la esquina superior izquierda del contenedor */}
              <div className="absolute top-0 left-0">
                <Link href="/admin/size/create">
                  <div className="bg-purple-700 text-white rounded-full p-2 shadow-md hover:bg-purple-800 transition-colors cursor-pointer">
                    <PlusIcon className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            </div>
          </Link>

          {/* Casillero para Color */}
          <Link href={`/admin/color/${id}`}>
            <div className="p-6 bg-red-100 rounded-lg shadow-lg hover:bg-red-200 transition-colors cursor-pointer relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-red-700">Color</h3>
                  <p className="text-sm text-red-500">Administrar colores</p>
                </div>
                <FaPalette className="h-12 w-12 text-red-700" />
              </div>
              {/* Signo de más en la esquina superior izquierda del contenedor */}
              <div className="absolute top-0 left-0">
                <Link href="/admin/color/create">
                  <div className="bg-red-700 text-white rounded-full p-2 shadow-md hover:bg-red-800 transition-colors cursor-pointer">
                    <PlusIcon className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            </div>
          </Link>

          {/* Casillero para Order */}
          <Link href={`/admin/order/${id}`}>
            <div className="p-6 bg-teal-100 rounded-lg shadow-lg hover:bg-teal-200 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-teal-700">Ordenes/Pedidos</h3>
                  <p className="text-sm text-teal-500">Administrar órdenes</p>
                </div>
                <FaReceipt className="h-12 w-12 text-teal-700" />
              </div>
            </div>
          </Link>

          {/* Casillero para Cerrar Sesion */}
          <div
            onClick={() => signOut({ callbackUrl: '/auth/login' })} // Cierra la sesión y redirige a la página de login
            className="cursor-pointer p-6 bg-orange-100 rounded-lg shadow-lg hover:bg-orange-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-700">Cerrar Sesión</h3>
                <p className="text-sm text-orange-500">Hasta luego</p>
              </div>
              <FontAwesomeIcon icon={faSignOutAlt} className="h-12 w-12 text-orange-700" /> {/* Ícono de FontAwesome */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
