import { create } from "zustand";

interface PlayListModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePlayListModal = create<PlayListModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlayListModal;
