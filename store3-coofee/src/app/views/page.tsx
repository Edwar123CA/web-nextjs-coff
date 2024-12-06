"use client"
import React, { useEffect, useState } from 'react';
import ProductList from './components/product-list';
import { Product } from '../../../types'; // Ajusta la ruta según tu estructura de proyecto
import Billboard from './components/ui/billboard';
import NoResults from './components/ui/no-results';
import ProductListFiltCategory from './components/product-list-filt-categ';

const ViewGeneral: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Reemplaza con tu endpoint real de API
      const res = await fetch('/api/product');
      const data: Product[] = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-10 pb-10">
      <Billboard />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <NoResults />
        ) : (
          <ProductListFiltCategory  />
        )}
      </div>

    </div>
  );
};

export default ViewGeneral;
