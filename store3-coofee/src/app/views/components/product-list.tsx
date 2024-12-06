"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ui/product-card';
import { Product } from '../../../../types';

interface ProductListProps {
  title: string;
  selectedCategory: string | null; // Agregado para manejar la categoría seleccionada
}

const ProductList: React.FC<ProductListProps> = ({ title, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await res.json();
        const filteredProducts = data
          .filter(product => !product.isArchived)
          .filter(product => !selectedCategory || product.categoryId === selectedCategory);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
    const interval = setInterval(fetchProducts, 20000); // Actualiza cada 60 segundos
  
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [selectedCategory]);
   // Vuelve a cargar cuando cambia la categoría seleccionada

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
