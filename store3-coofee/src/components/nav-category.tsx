"use client";

import React from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Category } from '../../types'; // Asegúrate de tener este tipo definido

interface NavCategoryProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string | null; // Agregado para manejar la categoría seleccionada
}

const NavCategory: React.FC<NavCategoryProps> = ({ onCategorySelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative mx-0 flex items-center space-x-0 lg:space-x-2 text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-gray-900 hover:text-gray-700"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} lg:space-x-4 text-sm`}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`text-sm font-medium transition-colors duration-300 p-2 rounded-md ${
              selectedCategory === category.id
                ? 'text-black border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-300 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavCategory;
