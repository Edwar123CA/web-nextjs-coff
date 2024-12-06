"use client"
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Currency from "../../components/ui/currency";
import { Product } from "../../../../../types";
import Gallerytab from "@/components/gallery/GalleryTab";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const ProductView = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isCreatingPreference, setIsCreatingPreference] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');
  const collectionStatus = queryParams.get('collection_status');
  const orderIdQuery = queryParams.get('merchant_order_id');

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string;
    if (publicKey) {
      initMercadoPago(publicKey, {
        locale: 'es-PE',
      });
    } else {
      console.error('La clave pública de Mercado Pago no está definida en las variables de entorno.');
    }

    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: Product = await res.json();
        setProduct(data);
        localStorage.setItem('storeId', data.storeId);
      } catch (error) {
        setError("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const createPreference = async (orderId: string) => {
    try {
      setIsCreatingPreference(true);
      const response = await axios.post('http://localhost:3000/create_preference', {
        title: product?.name,
        quantity: quantity,
        price: product?.price,
        productId: product?.id,
        orderId: orderId,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la preferencia");
      return null;
    } finally {
      setIsCreatingPreference(false);
    }
  };

  const handleBuy = async () => {
    if (!phone || !address || quantity <= 0) {
      toast.error("Please provide all required fields.");
      return;
    }

    const storeId = localStorage.getItem('storeId');

    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    const orderData = {
      storeId: storeId,
      isPaid: false,
      phone: phone,
      address: address,
      orderItems: [
        {
          productId: product?.id,
          cantidad: quantity,
        },
      ],
    };

    try {
      const response = await axios.post('/api/order', orderData);
      const orderId = response.data.id;
      // console.log('Order ID:', orderId);

      const preferenceId = await createPreference(orderId);
      if (preferenceId) {
        setPreferenceId(preferenceId);
        setOrderId(orderId);
      }
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      toast.error('Error al guardar el pedido.');
    } finally {
      setIsCreatingPreference(false);
    }
  };

  const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!product?.id) {
      setFormError("Missing product information.");
      return;
    }

    if (quantity <= 0) {
      setFormError("Quantity must be greater than 0.");
      return;
    }

    if (!phone || !address) {
      setFormError("Please provide both phone and address.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const storeId = localStorage.getItem('storeId');

    if (!storeId) {
      setFormError("Store ID is missing.");
      return;
    }

    const orderData = {
      storeId: storeId,
      isPaid: false,
      phone: phone,
      address: address,
      orderItems: [
        {
          productId: product.id,
          cantidad: quantity,
        },
      ],
    };

    try {
      // console.log("Enviando datos de la orden:", orderData);
      await axios.post('/api/order', orderData);
      toast.info('Pedido registrado. En un momento te llamaremos.');
      formRef.current?.reset();
      setPhone('');
      setAddress('');
      setQuantity(1);
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      toast.error('Error al guardar el pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const handlePaymentStatus = async (orderId: string | null, status: string | null) => {
      if (!orderId) {
        toast.error("Order ID is missing.");
        return;
      }

      setIsSubmitting(true);

      try {
        if (status === 'success') {
          await axios.put(`/api/order/${orderId}`, { isPaid: true });
          toast.success('Pago exitoso. Tu pedido ha sido procesado.');
          formRef.current?.reset();
          setPhone('');
          setAddress('');
          setQuantity(1);
        } else if (status === 'failure') {
          toast.error('El pago ha fallado. Por favor, inténtalo nuevamente.');
        } else if (status === 'pending') {
          toast.info('El pago está pendiente. Recibirás una confirmación cuando se complete.');
        }
      } catch (error) {
        console.error("Error al actualizar el pedido:", error);
        toast.error('Error al actualizar el pedido.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    const orderId = queryParams.get('orderId');

    if (status && orderId) {
      handlePaymentStatus(orderId, status);
    }
  }, []);

  const isPayOnlineDisabled = !phone || !address || isCreatingPreference || quantity <= 0;

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-700">No product found</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 relative aspect-w-16 aspect-h-9">
            <Gallerytab images={product.images} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-2xl text-gray-900">
                <Currency value={parseFloat(product.price)} />
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Size:</h3>
                <div>{product.size?.value}</div>
              </div>
              <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Color:</h3>
                <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: product.color?.value }} />
              </div>
              <div className="flex items-center gap-x-4">
                <h3 className="font-semibold text-black">Categoria:</h3>
                <div>{product.category?.name}</div>
              </div>
            </div>
            <div className="py-2"></div>
            <div className="flex flex-col gap-y-6">
              <form ref={formRef} onSubmit={handleOrder} className="flex flex-col gap-y-4">

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-gray-700">Telefono:</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="999-888-756-0"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-gray-700">Direccion:</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Av. Egipto 1234"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="quantity" className="text-gray-700">Cantidad:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isCreatingPreference}
                  className="w-full bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded mt-4">
                  {isSubmitting ? "Processing..." : "Realizar Orden"}
                </button>
              </form>
            </div>

            <button
              disabled={isPayOnlineDisabled}
              onClick={handleBuy}
              className="w-full bg-green-500 text-white p-2 rounded mt-4 flex items-center justify-center gap-2"
            >
              {isCreatingPreference ? "Creating preference..." : (
                <>
                  <FaShoppingCart />
                  Pagar Online
                </>
              )}
            </button>

            {preferenceId && (
              <Wallet initialization={{ preferenceId }} />
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductView;
