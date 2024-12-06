"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Currency from "./currency";
import IconButton from "./icon-button";
import { Product } from "../../../../../types";
import usePreviewModal from "../../hooks/use-preview-modal";
import useCart from "../../hooks/use-cart";
import { toast } from 'react-toastify';

interface ProductCardProps {
  data: Product;
  hiddeexpand?: boolean;
  hiddecarshoping: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, hiddecarshoping = false, hiddeexpand = false }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/views/view-detalles/${data.id}`); // Navegar a la página del producto
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    // Aquí puedes integrar tu lógica de modal de vista previa
    // console.log("Preview clicked", data);
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
    // Obtener los productos existentes en el carrito del localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Verificar si el producto ya está en el carrito
    const isProductInCart = existingCart.some((item: Product) => item.id === data.id);
    
    if (isProductInCart) {
      toast.info('Este producto ya está en el carrito.');
    } else {
      // Agregar el nuevo producto
      const updatedCart = [...existingCart, data];
    
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    
      toast.success('Artículo agregado al carrito.');
    }
    
    console.log("Add to cart clicked", data);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Imagen y acciones */}
      <div
        onClick={handleClick}
        className="w-full h-60 rounded-xl bg-gray-100 relative"
      >
        <Image
          src={data.images?.[0]?.url || '/images/sol3.jpg'}
          alt={data.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            {!hiddeexpand &&(
              <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            )}
            {!hiddecarshoping &&(
              <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
            )}
          </div>
        </div>
      </div>
      {/* Descripción */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name || "Unknown"}</p>
      </div>
      {/* Precio */}
      <div className="flex items-center justify-between">
        <Currency value={parseFloat(data.price)} />
      </div>
    </div>
  );
};

export default ProductCard;
