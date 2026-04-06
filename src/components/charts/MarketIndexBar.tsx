'use client';
import { marketIndices } from '@/data/market-indices';
import { useMarketStore } from '@/lib/store/useMarketStore';
import { fmtPct, fmt } from '@/lib/utils/cn';
import { cn } from '@/lib/utils/cn';

export function MarketIndexBar() {
  const { activeMarket } = useMarketStore();
  const indices = marketIndices.filter(i => i.market === activeMarket);

  return (
    <div className="flex items-center gap-6 py-2 px-4 bg-(--color-surface) border-b border-(--color-border) overflow-x-auto">
      {indices.map(idx => (
        <div key={idx.id} className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-medium text-(--color-muted)">{idx.name}</span>
          <span className="text-sm font-bold tabular-nums">{fmt(idx.value)}</span>
          <span className={cn(
            'text-xs font-semibold tabular-nums',
            idx.changePct >= 0 ? 'text-(--color-bull)' : 'text-(--color-bear)'
          )}>
            {idx.changePct >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({fmtPct(idx.changePct)})
          </span>
        </div>
      ))}
      <div className="ml-auto text-[10px] text-(--color-muted) shrink-0">
        模擬資料 · 僅供參考
      </div>
    </div>
  );
}
