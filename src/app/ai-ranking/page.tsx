'use client';
import { useState } from 'react';
import { aiRankings } from '@/data/ai-rankings';
import { RankingTable } from '@/components/ai-ranking/RankingTable';
import { Market, Signal } from '@/types/stock';
import { cn } from '@/lib/utils/cn';

const markets: { id: 'ALL' | Market; label: string }[] = [
  { id: 'ALL', label: '全部' },
  { id: 'TW', label: '台股' },
  { id: 'US', label: '美股' },
  { id: 'JP', label: '日股' },
];

const signals: { id: 'ALL' | Signal; label: string }[] = [
  { id: 'ALL', label: '全部信號' },
  { id: 'BUY', label: '買進' },
  { id: 'HOLD', label: '持有' },
  { id: 'WATCH', label: '觀察' },
  { id: 'SELL', label: '賣出' },
];

export default function AIRankingPage() {
  const [marketFilter, setMarketFilter] = useState<'ALL' | Market>('ALL');
  const [signalFilter, setSignalFilter] = useState<'ALL' | Signal>('ALL');

  const filtered = aiRankings.filter(r => {
    if (marketFilter !== 'ALL' && r.market !== marketFilter) return false;
    if (signalFilter !== 'ALL' && r.signal !== signalFilter) return false;
    return true;
  });

  const avgScore = filtered.length
    ? Math.round(filtered.reduce((s, r) => s + r.aiScore, 0) / filtered.length)
    : 0;

  const buyCount = filtered.filter(r => r.signal === 'BUY').length;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AI 智慧排行榜</h1>
        <p className="text-(--color-muted) text-sm">綜合動能、基本面、市場情緒與技術面，由 AI 模型量化評分排序</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-surface) text-center">
          <div className="text-2xl font-bold">{filtered.length}</div>
          <div className="text-xs text-(--color-muted) mt-1">評估股票數</div>
        </div>
        <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-surface) text-center">
          <div className="text-2xl font-bold">{avgScore}</div>
          <div className="text-xs text-(--color-muted) mt-1">平均 AI 評分</div>
        </div>
        <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-surface) text-center">
          <div className="text-2xl font-bold text-(--color-bull)">{buyCount}</div>
          <div className="text-xs text-(--color-muted) mt-1">買進建議</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1">
          {markets.map(m => (
            <button key={m.id} onClick={() => setMarketFilter(m.id)}
              className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                marketFilter === m.id
                  ? 'bg-(--color-foreground) text-(--color-background)'
                  : 'bg-(--color-surface) text-(--color-muted) hover:text-(--color-foreground) border border-(--color-border)'
              )}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {signals.map(s => (
            <button key={s.id} onClick={() => setSignalFilter(s.id)}
              className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                signalFilter === s.id
                  ? 'bg-(--color-foreground) text-(--color-background)'
                  : 'bg-(--color-surface) text-(--color-muted) hover:text-(--color-foreground) border border-(--color-border)'
              )}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 text-xs text-(--color-muted)">
        共 {filtered.length} 支股票 · 點擊列表可展開 AI 評分詳情
      </div>

      <RankingTable rankings={filtered} />

      <div className="mt-6 p-4 rounded-xl bg-(--color-muted-bg) border border-(--color-border) text-xs text-(--color-muted) leading-relaxed">
        ⚠️ 本評分為模擬資料，僅供學習參考，不構成任何投資建議。投資有風險，入市須謹慎。
      </div>
    </div>
  );
}
