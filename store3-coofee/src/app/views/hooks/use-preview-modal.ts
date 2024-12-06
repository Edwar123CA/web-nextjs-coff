// use-preview-modal.ts

import { create } from 'zustand';
import { Product } from '../../../../types';

interface PreviewModalState {
  isOpen: boolean;
  data: Product | null;
  onOpen: (product: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalState>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (product: Product) => set({ isOpen: true, data: product }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default usePreviewModal;
