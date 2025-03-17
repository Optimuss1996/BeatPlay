import { create } from "zustand";

interface PlaylistIdStore {
  id: string | null;
  setId: (id: string) => void;
  clearId: () => void;
}

export const usePlaylistIdStore = create<PlaylistIdStore>((set) => ({
  id: null, // Initial state
  setId: (id) => set({ id }), // Set the ID
  clearId: () => set({ id: null }), // Clear the ID
}));
