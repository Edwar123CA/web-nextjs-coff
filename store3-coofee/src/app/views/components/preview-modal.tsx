// PreviewModal.tsx

"use client";

import usePreviewModal from "../hooks/use-preview-modal";
import Gallery from "@/components/gallery/GalleryTab";
import Info from "./info";
import Modal from "./ui/modal";
import { XIcon } from "lucide-react"; // Asegúrate de tener esta importación

interface PreviewModalProps {
  hidePedido?: boolean; // Prop opcional para ocultar el carrito
  hideQuantity?: boolean; // Prop opcional para ocultar los botones de cantidad
}

const PreviewModal: React.FC<PreviewModalProps> = ({ hidePedido = false, hideQuantity = false }) => {
  const { isOpen, data, onClose } = usePreviewModal();

  if (!isOpen || !data) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="relative grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={24} />
        </button>

        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={data.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={data}  hidePedido={hidePedido}/>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
