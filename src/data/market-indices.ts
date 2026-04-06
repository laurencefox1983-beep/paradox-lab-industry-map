import { MarketIndex } from '@/types/stock';

export const marketIndices: MarketIndex[] = [
  { id: 'taiex', name: '加權指數', market: 'TW', value: 22485.68, change: 312.45, changePct: 1.41 },
  { id: 'otc', name: '櫃買指數', market: 'TW', value: 248.32, change: 4.28, changePct: 1.75 },
  { id: 'sp500', name: 'S&P 500', market: 'US', value: 5648.40, change: 38.62, changePct: 0.69 },
  { id: 'nasdaq', name: 'NASDAQ', market: 'US', value: 17845.20, change: 185.40, changePct: 1.05 },
  { id: 'nikkei', name: '日經225', market: 'JP', value: 38642.80, change: -124.60, changePct: -0.32 },
  { id: 'topix', name: 'TOPIX', market: 'JP', value: 2712.45, change: -8.24, changePct: -0.30 },
];
