'use client';
import dynamic from 'next/dynamic';
import { OHLCVBar } from '@/types/stock';

const TradingChartInner = dynamic(() => import('./TradingChartInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-(--color-surface) rounded-lg border border-(--color-border) animate-pulse" />
  ),
});

export function TradingChart({ data, ticker }: { data: OHLCVBar[]; ticker: string }) {
  return <TradingChartInner data={data} ticker={ticker} />;
}
