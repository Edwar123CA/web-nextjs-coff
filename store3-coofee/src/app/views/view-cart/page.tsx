"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react';
import ProductCard from '../components/ui/product-card';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface CartItem extends Product {
  quantity: number;
}

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  
      const updatedCart = storedCart.map((item: CartItem) => {
        return {
          ...item,
          quantity: item.quantity > 0 ? item.quantity : 1, // Asegurar que quantity sea al menos 1
        };
      });
  
      setCartItems(updatedCart);
    };
  
    fetchCart(); // Inicializa el carrito al montar el componente
  
    const interval = setInterval(fetchCart, 10000); // Actualiza cada 10 segundos
  
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);//  

  const handleQuantityChange = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityInput = (e: ChangeEvent<HTMLInputElement>, productId: string) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    handleQuantityChange(productId, value);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.warning('Producto eliminado del carrito.');
  };

  const handleOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      setFormError("El carrito está vacío.");
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: item.id,
      cantidad: item.quantity,
    }));

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: cartItems[0]?.storeId,
          isPaid: false,
          phone,
          address,
          orderItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      toast.info('Pedido Exitoso.');
      toast.loading('En unos momentos nos comunicaremos contigo.');
      formRef.current?.reset();
      setPhone('');
      setAddress('');
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      toast.error('Error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="p-4 mx-auto max-w-screen-xl">
        <h2 className="text-2xl font-bold mb-4 text-center py-5">Your Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <p className='text-center'>No añadiste productos.</p>
        ) : (
          <div className="mb-6">
            <form onSubmit={handleOrder} ref={formRef} className="mb-6 space-y-4 flex flex-col items-center">
              {formError && (
                <p className="text-red-600 mb-4 text-sm font-medium">{formError}</p>
              )}
              <div className="w-full max-w-xs">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono:
                </label>
                <input
                  placeholder='897-650-298'
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="w-full max-w-xs">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección:
                </label>
                <input
                  placeholder='Av. Palmas # 69'
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full max-w-xs bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Realizar Orden'}
              </button>
            </form>
            <div className="flex gap-4 overflow-scroll">
              {cartItems.map(product => (
                <div key={product.id} className="flex-shrink-0 w-40 relative">
                  <ProductCard data={product} hiddecarshoping={true} hiddeexpand={true}/>
                  <div className="absolute top-1 left-1 p-1 bg-white border rounded">
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => handleQuantityInput(e, product.id)}
                      className="w-16 text-center"
                    />
                  </div>
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartView;
