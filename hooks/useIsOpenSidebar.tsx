import { create } from "zustand";

interface useIsOpenSidebar {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggleSidebar: () => void;
}

const useIsOpenSidebar = create<useIsOpenSidebar>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useIsOpenSidebar;
