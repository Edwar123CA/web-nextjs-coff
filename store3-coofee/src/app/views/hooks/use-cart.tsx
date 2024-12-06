import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react'; // Asegúrate de que esto esté instalado
import { Product } from '../../../../types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// Hook para el carrito
const useCart = create<CartStore>((set, get) => ({
  items: [],

  // Función para agregar un artículo al carrito
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);

    if (existingItem) {
      // Muestra una advertencia si el artículo ya está en el carrito
      return toast.custom(t => (
        <div className="toast-custom toast-warning">
          <AlertTriangle className="toast-icon" />
          <div className="toast-message">
            El artículo ya está en el carrito.
          </div>
        </div>
      ), { duration: 1500 });
    }

    // Agrega el nuevo artículo al carrito y muestra una notificación de éxito
    set({ items: [...currentItems, data] });
    toast.success('Artículo agregado al carrito.');
  },

  // Función para eliminar un artículo del carrito por id
  removeItem: (id: string) => {
    const currentItems = get().items;
    set({ items: currentItems.filter((item) => item.id !== id) });

    // Notificación personalizada para eliminación del artículo
    toast.custom(t => (
      <div className="toast-custom toast-info">
        <div className="toast-icon-info">ℹ️</div>
        <div className="toast-message">
          El artículo se eliminó del carrito.
        </div>
      </div>
    ), { duration: 1500 });
  },

  // Función para vaciar el carrito
  removeAll: () => {
    set({ items: [] });
    toast.success('Todos los artículos fueron eliminados del carrito.');
  },
}));

export default useCart;
