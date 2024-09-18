import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
  rates: {},
  setRates: (rates) => set({ rates }),
}));

export default useCurrencyStore;
