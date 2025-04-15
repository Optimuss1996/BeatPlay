import { create } from "zustand";

interface PlayStore {
  ids: number[];
  activeId?: number;
  activeSource?: string;
  setId: (id: number, source?: string) => void;
  setIds: (ids: number[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayStore>((set) => ({
  ids: [],
  activeId: undefined,
  activeSource: undefined,
  setId: (id, source?) => set({ activeId: id, activeSource: source }),
  setIds: (ids: number[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined, activeSource: undefined }),
}));

export default usePlayer;
