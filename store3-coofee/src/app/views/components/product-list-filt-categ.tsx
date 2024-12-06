"use client";

import React, { useState } from 'react';
import NavCategory from '@/components/nav-category';
import ProductList from './product-list';

const ProductListFiltCategory: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div>
            <div className='flex justify-center py-2'>
                <div className='text-center'>
                    <NavCategory
                        onCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory} // Pasar la categoría seleccionada
                    />
                </div>
            </div>
            <div className='py-4'>
            <ProductList title="Products Relationates" selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default ProductListFiltCategory;
