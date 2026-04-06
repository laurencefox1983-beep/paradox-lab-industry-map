'use client';
import { Stock } from '@/types/stock';
import { TradingChart } from '@/components/charts/TradingChart';
import { PriceChange } from './PriceChange';
import { SignalBadge, MarketBadge } from '@/components/ui/Badge';
import { fmt, fmtVolume, fmtPct } from '@/lib/utils/cn';

function MetricItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-(--color-muted)">{label}</span>
      <span className="text-sm font-semibold">{value ?? '—'}</span>
    </div>
  );
}

export function StockDetailPanel({ stock }: { stock: Stock }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{stock.name}</h1>
            <MarketBadge market={stock.market} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-(--color-muted)">{stock.ticker}</span>
            <span className="text-xs text-(--color-muted)">{stock.sector}</span>
            <SignalBadge signal={stock.signal} />
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold tabular-nums">{fmt(stock.price)}</div>
          <PriceChange pct={stock.priceChangePct} abs={stock.priceChange} showIcon size="lg" />
        </div>
      </div>

      {/* Chart */}
      <TradingChart data={stock.ohlcv} ticker={stock.ticker} />

      {/* Metrics */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-4 rounded-xl border border-(--color-border) bg-(--color-surface)">
        <MetricItem label="市值(億)" value={stock.marketCap.toLocaleString()} />
        <MetricItem label="本益比" value={stock.pe?.toFixed(1) ?? null} />
        <MetricItem label="EPS" value={stock.eps?.toFixed(2) ?? null} />
        <MetricItem label="ROE%" value={stock.roe ? fmtPct(stock.roe) : null} />
        <MetricItem label="52週高" value={fmt(stock.week52High)} />
        <MetricItem label="52週低" value={fmt(stock.week52Low)} />
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 text-sm text-(--color-muted)">
        <span>成交量：</span>
        <span className="font-semibold text-(--color-foreground)">{fmtVolume(stock.volume)}</span>
        <span>AI評分：</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-(--color-border)">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500"
              style={{ width: `${stock.aiScore}%` }} />
          </div>
          <span className="font-bold text-(--color-foreground)">{stock.aiScore}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-(--color-muted) leading-relaxed p-4 bg-(--color-surface) rounded-xl border border-(--color-border)">
        {stock.description}
      </p>
    </div>
  );
}
