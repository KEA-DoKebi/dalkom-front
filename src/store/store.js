import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
});

const useStore = create(
  process.env.REACT_APP_NODE_ENV !== "production" ? devtools(store) : store,
);


export default useStore;
