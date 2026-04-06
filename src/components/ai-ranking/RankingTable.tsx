'use client';
import { useState } from 'react';
import { AIRanking } from '@/data/ai-rankings';
import { SignalBadge, MarketBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-(--color-border)">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] font-mono w-6 text-right">{value}</span>
    </div>
  );
}

export function RankingTable({ rankings }: { rankings: AIRanking[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<'aiScore' | 'upside' | 'rank'>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = [...rankings].sort((a, b) => {
    const diff = sortKey === 'rank' ? a.rank - b.rank : b[sortKey] - a[sortKey];
    return sortDir === 'asc' ? diff : -diff;
  });

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) => (
    sortKey === k
      ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
      : <ChevronDown size={12} className="opacity-30" />
  );

  return (
    <div className="rounded-xl border border-(--color-border) overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[40px_1fr_80px_80px_80px_80px] gap-2 px-4 py-2.5 text-[11px] font-semibold text-(--color-muted) bg-(--color-surface) border-b border-(--color-border)">
        <span>#</span>
        <span>股票</span>
        <button className="flex items-center gap-1 hover:text-(--color-foreground)" onClick={() => toggleSort('aiScore')}>
          AI評分 <SortIcon k="aiScore" />
        </button>
        <span>信號</span>
        <button className="flex items-center gap-1 hover:text-(--color-foreground)" onClick={() => toggleSort('upside')}>
          上漲空間 <SortIcon k="upside" />
        </button>
        <span>市場</span>
      </div>

      {sorted.map((r) => (
        <div key={r.stockId}>
          <div
            className="grid grid-cols-[40px_1fr_80px_80px_80px_80px] gap-2 px-4 py-3 border-b border-(--color-border) hover:bg-(--color-surface) transition-colors cursor-pointer items-center"
            onClick={() => setExpanded(expanded === r.rank ? null : r.rank)}
          >
            <span className="text-sm font-bold text-(--color-muted)">{r.rank}</span>

            <div>
              <div className="flex items-center gap-2">
                <Link href={`/stock/${r.ticker}`} className="font-bold text-sm hover:text-blue-500" onClick={e => e.stopPropagation()}>
                  {r.ticker}
                </Link>
                <span className="text-xs text-(--color-muted)">{r.name}</span>
              </div>
              <div className="text-[11px] text-(--color-muted) mt-0.5">{r.sector}</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-(--color-border) overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500"
                  style={{ width: `${r.aiScore}%` }} />
              </div>
              <span className="text-xs font-bold w-6 text-right">{r.aiScore}</span>
            </div>

            <div><SignalBadge signal={r.signal} /></div>

            <span className={cn('text-xs font-semibold', r.upside >= 0 ? 'text-(--color-bull)' : 'text-(--color-bear)')}>
              +{r.upside.toFixed(1)}%
            </span>

            <MarketBadge market={r.market} />
          </div>

          {expanded === r.rank && (
            <div className="px-4 py-4 bg-(--color-muted-bg) border-b border-(--color-border)">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-[10px] text-(--color-muted) mb-1">動能</div>
                  <ScoreBar value={r.momentum} color="#3b82f6" />
                </div>
                <div>
                  <div className="text-[10px] text-(--color-muted) mb-1">基本面</div>
                  <ScoreBar value={r.fundamentals} color="#10b981" />
                </div>
                <div>
                  <div className="text-[10px] text-(--color-muted) mb-1">市場情緒</div>
                  <ScoreBar value={r.sentiment} color="#8b5cf6" />
                </div>
                <div>
                  <div className="text-[10px] text-(--color-muted) mb-1">技術面</div>
                  <ScoreBar value={r.technical} color="#f59e0b" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3 text-xs">
                <span className="text-(--color-muted)">目標價</span>
                <span className="font-bold">{r.targetPrice}</span>
                <span className="text-(--color-muted)">現價</span>
                <span className="font-bold">{r.currentPrice}</span>
                <span className={cn('font-bold', r.upside >= 0 ? 'text-(--color-bull)' : 'text-(--color-bear)')}>
                  +{r.upside.toFixed(1)}% 上漲空間
                </span>
              </div>
              <p className="text-xs text-(--color-muted) leading-relaxed bg-(--color-surface) rounded-lg p-3 border border-(--color-border)">
                💡 {r.aiComment}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
