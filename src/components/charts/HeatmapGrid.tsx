'use client';
import { Stock } from '@/types/stock';
import { getHeatmapColor } from '@/lib/utils/colorScale';
import { fmtPct, fmt } from '@/lib/utils/cn';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  stocks: Stock[];
}

function StockCell({ stock }: { stock: Stock }) {
  const [hovered, setHovered] = useState(false);
  const bg = getHeatmapColor(stock.priceChangePct);
  const isLarge = stock.marketCap > 5000;
  const isMedium = stock.marketCap > 500;

  return (
    <Link href={`/stock/${stock.ticker}`}>
      <div
        className="heatmap-cell rounded-sm cursor-pointer relative select-none"
        style={{
          backgroundColor: bg,
          gridColumn: isLarge ? 'span 2' : 'span 1',
          gridRow: isLarge ? 'span 2' : isMedium ? 'span 1' : 'span 1',
          minHeight: isLarge ? 96 : isMedium ? 56 : 44,
          padding: '6px 8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="text-white">
          <div className={`font-bold leading-tight ${isLarge ? 'text-base' : isMedium ? 'text-xs' : 'text-[10px]'}`}>
            {stock.ticker}
          </div>
          {(isLarge || isMedium) && (
            <div className={`opacity-80 truncate ${isLarge ? 'text-xs mt-0.5' : 'text-[10px]'}`}>
              {stock.name}
            </div>
          )}
        </div>
        <div className={`text-white font-semibold tabular-nums ${isLarge ? 'text-sm' : 'text-[10px]'}`}>
          {fmtPct(stock.priceChangePct)}
        </div>

        {hovered && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-50 bg-(--color-foreground) text-(--color-background) text-[11px] rounded-md px-3 py-2 whitespace-nowrap shadow-lg pointer-events-none">
            <div className="font-bold">{stock.ticker} {stock.name}</div>
            <div>價格：{fmt(stock.price)} | {fmtPct(stock.priceChangePct)}</div>
            <div className="text-(--color-muted)">市值：{(stock.marketCap / 1000).toFixed(1)}千億</div>
          </div>
        )}
      </div>
    </Link>
  );
}

export function HeatmapGrid({ stocks }: Props) {
  // Group by sector
  const sectors = Array.from(new Set(stocks.map(s => s.sector)));

  return (
    <div className="space-y-4">
      {sectors.map(sector => {
        const sectorStocks = stocks.filter(s => s.sector === sector).sort((a, b) => b.marketCap - a.marketCap);
        return (
          <div key={sector}>
            <h3 className="text-xs font-semibold text-(--color-muted) mb-2 uppercase tracking-wider">{sector}</h3>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))' }}>
              {sectorStocks.map(stock => (
                <StockCell key={stock.id} stock={stock} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
