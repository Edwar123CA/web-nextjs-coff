// Info.tsx

"use client";

import { useState } from 'react';
import { ShoppingCart, FileText, ArrowRight } from "lucide-react";
import Currency from "../components/ui/currency";
import Button from './ui/Button';
import { Product } from '../../../../types';
import useCart from "../hooks/use-cart";
import { useRouter } from 'next/navigation';

interface InfoProps {
  data: Product;
  hidePedido?: boolean; // Prop opcional para ocultar el carrito
  // hideQuantity?: boolean; // Prop opcional para ocultar los botones de cantidad
};

const Info: React.FC<InfoProps> = ({ data, hidePedido = false}) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const onAddToCart = () => {
    cart.addItem(data);
  }

  const handleClick = () => {
    router.push(`/views/view-detalles/${data.id}`); // Navegar a la página del producto
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-xl text-gray-700">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Tamaño:</h3>
          <div>
            {data?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Categoria:</h3>
          <div>
            {data?.category?.name}
          </div>
        </div>
      </div>

      {/* {!hideQuantity && (
      <div className="mt-6 flex items-center gap-x-4">
        <button 
          onClick={decrementQuantity} 
          className="px-3 py-1 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button 
          onClick={incrementQuantity} 
          className="px-3 py-1 border border-gray-300 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
      </div>
      )} */}

      {/* <div className="mt-10 flex items-center gap-x-3">
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Añadir al carro
            <ShoppingCart size={20} />
          </Button>
        </div> */}

      {!hidePedido && (
        <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={handleClick} className="flex items-center gap-x-2">
          Pedir
          <ArrowRight size={20} />
        </Button>
      </div>
      )}

    </div>
  );
}

export default Info;
