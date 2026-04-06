export type Market = 'TW' | 'US' | 'JP';
export type Signal = 'BUY' | 'HOLD' | 'SELL' | 'WATCH';

export interface OHLCVBar {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  nameEn: string;
  market: Market;
  sector: string;
  sectorEn: string;
  marketCap: number;
  price: number;
  priceChange: number;
  priceChangePct: number;
  volume: number;
  pe: number | null;
  eps: number | null;
  roe: number | null;
  week52High: number;
  week52Low: number;
  ohlcv: OHLCVBar[];
  aiScore: number;
  signal: Signal;
  description: string;
}

export interface MarketIndex {
  id: string;
  name: string;
  market: Market;
  value: number;
  change: number;
  changePct: number;
}
