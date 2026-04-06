'use client';
import { useState } from 'react';
import { newsArticles } from '@/data/news';
import { NewsCard } from '@/components/news/NewsCard';
import { Market } from '@/types/stock';
import { NewsArticle, NewsCategory } from '@/types/news';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

const markets: { id: 'ALL' | Market; label: string }[] = [
  { id: 'ALL', label: '全部市場' },
  { id: 'TW', label: '台股' },
  { id: 'US', label: '美股' },
  { id: 'JP', label: '日股' },
];

const categories: { id: 'ALL' | NewsCategory; label: string }[] = [
  { id: 'ALL', label: '全部類型' },
  { id: 'MACRO', label: '總經' },
  { id: 'SECTOR', label: '產業' },
  { id: 'COMPANY', label: '公司' },
  { id: 'EARNINGS', label: '財報' },
  { id: 'POLICY', label: '政策' },
];

export default function NewsPage() {
  const [marketFilter, setMarketFilter] = useState<'ALL' | Market>('ALL');
  const [catFilter, setCatFilter] = useState<'ALL' | NewsCategory>('ALL');
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  const filtered = newsArticles.filter(a => {
    if (marketFilter !== 'ALL' && !a.market.includes(marketFilter)) return false;
    if (catFilter !== 'ALL' && a.category !== catFilter) return false;
    return true;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">產業新聞</h1>
        <p className="text-(--color-muted) text-sm">掌握市場動態、法說資訊與產業趨勢</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1 flex-wrap">
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
        <div className="flex gap-1 flex-wrap">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCatFilter(c.id)}
              className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                catFilter === c.id
                  ? 'bg-(--color-foreground) text-(--color-background)'
                  : 'bg-(--color-surface) text-(--color-muted) hover:text-(--color-foreground) border border-(--color-border)'
              )}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* News list */}
        <div className="flex-1 min-w-0 rounded-xl border border-(--color-border) overflow-hidden">
          <div className="text-xs text-(--color-muted) px-4 py-2.5 bg-(--color-surface) border-b border-(--color-border)">
            共 {filtered.length} 則新聞
          </div>
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-(--color-muted) text-sm">查無相關新聞</div>
          ) : (
            filtered.map(a => (
              <NewsCard key={a.id} article={a} onClick={() => setSelected(a)} />
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-96 shrink-0 hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-(--color-border) overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-(--color-border) bg-(--color-surface)">
                <span className="text-sm font-bold">新聞詳情</span>
                <button onClick={() => setSelected(null)} className="text-(--color-muted) hover:text-(--color-foreground)">
                  <X size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug mb-3">{selected.title}</h3>
                <p className="text-xs text-(--color-muted) leading-relaxed mb-4">{selected.summary}</p>
                <div className="flex items-center justify-between text-[11px] text-(--color-muted)">
                  <span className="font-medium">{selected.source}</span>
                  <span>{new Date(selected.publishedAt).toLocaleDateString('zh-TW')}</span>
                </div>
                {selected.relatedTickers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-(--color-border)">
                    <div className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">相關股票</div>
                    <div className="flex flex-wrap gap-1">
                      {selected.relatedTickers.map(t => (
                        <a key={t} href={`/stock/${t}`}
                          className="px-2 py-1 rounded border border-(--color-border) text-[11px] font-mono hover:bg-(--color-surface) transition-colors">
                          {t}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
