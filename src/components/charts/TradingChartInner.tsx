'use client';
import { useEffect, useRef } from 'react';
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from 'lightweight-charts';
import { OHLCVBar } from '@/types/stock';
import { calcMA } from '@/lib/utils/chartHelpers';
import { useTheme } from 'next-themes';

interface Props {
  data: OHLCVBar[];
  ticker: string;
}

export default function TradingChartInner({ data, ticker }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const bg = isDark ? '#1a1a1a' : '#ffffff';
    const textColor = isDark ? '#a1a1aa' : '#71717a';
    const grid = isDark ? '#27272a' : '#f4f4f5';
    const border = isDark ? '#3f3f46' : '#e4e4e7';

    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: bg }, textColor },
      grid: { vertLines: { color: grid }, horzLines: { color: grid } },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: border },
      timeScale: { borderColor: border, timeVisible: true },
      width: containerRef.current.clientWidth,
      height: 380,
    });

    // Candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });
    candleSeries.setData(data as Parameters<typeof candleSeries.setData>[0]);

    // Volume histogram
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#60a5fa',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    volumeSeries.setData(data.map(d => ({
      time: d.time as Parameters<typeof volumeSeries.setData>[0][0]['time'],
      value: d.volume,
      color: d.close >= d.open ? '#22c55e40' : '#ef444440',
    })));

    // MA20
    const ma20 = chart.addSeries(LineSeries, { color: '#f59e0b', lineWidth: 1, priceLineVisible: false });
    ma20.setData(calcMA(data, 20) as Parameters<typeof ma20.setData>[0]);

    // MA60
    const ma60 = chart.addSeries(LineSeries, { color: '#8b5cf6', lineWidth: 1, priceLineVisible: false });
    ma60.setData(calcMA(data, 60) as Parameters<typeof ma60.setData>[0]);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, isDark, ticker]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-2 text-[11px] text-(--color-muted)">
        <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-amber-500 inline-block" /> MA20</span>
        <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-violet-500 inline-block" /> MA60</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500/30 inline-block" /> 量能</span>
      </div>
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden border border-(--color-border)" />
    </div>
  );
}
