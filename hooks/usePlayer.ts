import { create } from "zustand";

interface PlayStore {
  ids: number[];
  activeId?: number;
  setId: (id: number) => void;
  setIds: (id: number[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: number) => set({ activeId: id }),
  setIds: (ids: number[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
