'use client';
import { useMarketStore } from '@/lib/store/useMarketStore';
import { allStocks } from '@/data/stocks';
import { HeatmapGrid } from '@/components/charts/HeatmapGrid';
import { MarketIndexBar } from '@/components/charts/MarketIndexBar';
import { NewsTicker } from '@/components/layout/NewsTicker';
import { industries } from '@/data/industries';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export default function MarketPage() {
  const { activeMarket, activeSector, setActiveSector, searchQuery } = useMarketStore();

  let stocks = allStocks.filter(s => s.market === activeMarket);

  if (activeSector) {
    stocks = stocks.filter(s => s.sector === activeSector);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    stocks = stocks.filter(s =>
      s.ticker.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.nameEn.toLowerCase().includes(q)
    );
  }

  const marketSectors = Array.from(new Set(
    allStocks.filter(s => s.market === activeMarket).map(s => s.sector)
  ));

  const risers = stocks.filter(s => s.priceChangePct > 0).length;
  const fallers = stocks.filter(s => s.priceChangePct < 0).length;

  return (
    <div>
      <MarketIndexBar />
      <NewsTicker />

      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex gap-4">
        {/* Sidebar */}
        <aside className="w-40 shrink-0 hidden lg:block">
          <div className="sticky top-28 space-y-1">
            <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2 px-2">產業篩選</p>
            <button
              onClick={() => setActiveSector(null)}
              className={cn(
                'w-full text-left px-2 py-1.5 rounded text-xs transition-colors',
                activeSector === null
                  ? 'bg-(--color-foreground) text-(--color-background) font-semibold'
                  : 'text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface)'
              )}
            >
              全部
            </button>
            {marketSectors.map(s => (
              <button
                key={s}
                onClick={() => setActiveSector(s === activeSector ? null : s)}
                className={cn(
                  'w-full text-left px-2 py-1.5 rounded text-xs transition-colors',
                  activeSector === s
                    ? 'bg-(--color-foreground) text-(--color-background) font-semibold'
                    : 'text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface)'
                )}
              >
                {s}
              </button>
            ))}

            <div className="pt-4 border-t border-(--color-border)">
              <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2 px-2">產業地圖</p>
              {industries.slice(0, 4).map(ind => (
                <Link key={ind.id} href={`/industry/${ind.slug}`}
                  className="block px-2 py-1.5 rounded text-xs text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface) transition-colors">
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Stats bar */}
          <div className="flex items-center gap-4 mb-4 text-xs text-(--color-muted)">
            <span>共 <strong className="text-(--color-foreground)">{stocks.length}</strong> 支股票</span>
            <span className="text-(--color-bull)">▲ 上漲 {risers}</span>
            <span className="text-(--color-bear)">▼ 下跌 {fallers}</span>
            <span>平盤 {stocks.length - risers - fallers}</span>
          </div>

          {stocks.length === 0 ? (
            <div className="text-center py-20 text-(--color-muted)">
              <p className="text-lg">查無符合條件的股票</p>
            </div>
          ) : (
            <HeatmapGrid stocks={stocks} />
          )}
        </div>
      </div>
    </div>
  );
}
