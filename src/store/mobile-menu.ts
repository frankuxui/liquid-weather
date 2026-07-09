import { create } from "zustand";

type MobileMenuStore = {
  open: boolean;
  close: () => void;
  toggle: () => void;
};

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  open: false,
  close: () => set({ open: false }),
  toggle: () => set((state) => ({ open: !state.open }))
}));
