'use client';
import { useEffect, useRef } from 'react';
import { init, use } from 'echarts/core';
import { TreemapChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts } from 'echarts/core';
import { Stock } from '@/types/stock';
import { getHeatmapColor } from '@/lib/utils/colorScale';
import { useTheme } from 'next-themes';

use([TreemapChart, TooltipComponent, CanvasRenderer]);

export function IndustryTreemap({ stocks }: { stocks: Stock[] }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsRef = useRef<ECharts | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!chartRef.current) return;
    if (!echartsRef.current) {
      echartsRef.current = init(chartRef.current, isDark ? 'dark' : undefined);
    }
    const chart = echartsRef.current;

    const data = stocks.map(s => ({
      name: s.ticker,
      value: s.marketCap,
      label: `${s.ticker}\n${s.priceChangePct >= 0 ? '+' : ''}${s.priceChangePct.toFixed(2)}%`,
      itemStyle: { color: getHeatmapColor(s.priceChangePct) },
      tooltip: `${s.ticker} ${s.name}\n市值：${s.marketCap}億\n漲跌：${s.priceChangePct.toFixed(2)}%`,
    }));

    chart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: (p: { data: { tooltip: string } }) => p.data.tooltip.replace(/\n/g, '<br/>'),
      },
      series: [{
        type: 'treemap',
        data,
        width: '100%',
        height: '100%',
        label: {
          show: true,
          formatter: (p: { data: { label: string } }) => p.data.label,
          fontSize: 11,
          color: '#fff',
          fontWeight: 'bold',
        },
        itemStyle: { borderColor: isDark ? '#1a1a1a' : '#fff', borderWidth: 2, gapWidth: 2 },
        breadcrumb: { show: false },
        roam: false,
      }],
    });

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [stocks, isDark]);

  return <div ref={chartRef} className="w-full h-80 rounded-xl border border-(--color-border) overflow-hidden" />;
}
