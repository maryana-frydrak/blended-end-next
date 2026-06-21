import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

type CurrencyState = {
  baseCurrency: string;
  hasHydrated: boolean;
  exchangeInfo: null | ExchangeInfo;
  isLoading: boolean;
  isError: string | null;
  rates: [string, number][];
  filter: string;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (stateHydrated: boolean) => void;
  setEchangeInfo: (info: null | ExchangeInfo) => void;
  setIsLoading: (loading: boolean) => void;
  setIsError: (error: null | string) => void;
  setRates: (rates: [string, number][]) => void;
  setFilter: (filter: string) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      filter: '',

      setBaseCurrency: (currency) =>
        set({
          baseCurrency: currency,
        }),
      setHasHydrated: (stateHydrated) =>
        set({
          hasHydrated: stateHydrated,
        }),
      setEchangeInfo: (info) => set({ exchangeInfo: info }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setIsError: (error) => set({ isError: error }),
      setRates: (rates) => set({ rates: rates }),
      setFilter: (filter) => set({ filter: filter }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
