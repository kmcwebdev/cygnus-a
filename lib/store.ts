import { create } from "zustand";

type GlobalStore = {
  count: number;
  increament: () => void;
  increamentAsync: () => Promise<void>;
  decreament: () => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  count: 0,
  increament: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  increamentAsync: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    set((state) => ({ count: state.count + 1 }));
  },
  decreament: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));
