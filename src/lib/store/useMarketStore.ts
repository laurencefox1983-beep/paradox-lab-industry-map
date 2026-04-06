'use client';

import { create } from 'zustand';
import { Market } from '@/types/stock';

interface MarketStore {
  activeMarket: Market;
  activeSector: string | null;
  searchQuery: string;
  setActiveMarket: (m: Market) => void;
  setActiveSector: (s: string | null) => void;
  setSearchQuery: (q: string) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  activeMarket: 'TW',
  activeSector: null,
  searchQuery: '',
  setActiveMarket: (activeMarket) => set({ activeMarket, activeSector: null }),
  setActiveSector: (activeSector) => set({ activeSector }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
