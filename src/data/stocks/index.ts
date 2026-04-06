import { twStocks } from './tw-stocks';
import { usStocks } from './us-stocks';
import { jpStocks } from './jp-stocks';
import { Stock, Market } from '@/types/stock';

export const allStocks: Stock[] = [...twStocks, ...usStocks, ...jpStocks];

export function getStocksByMarket(market: Market): Stock[] {
  return allStocks.filter(s => s.market === market);
}

export function getStockById(id: string): Stock | undefined {
  return allStocks.find(s => s.id === id);
}

export function getStockByTicker(ticker: string): Stock | undefined {
  return allStocks.find(s => s.ticker === ticker);
}

export { twStocks, usStocks, jpStocks };
