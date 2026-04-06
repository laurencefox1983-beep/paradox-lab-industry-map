'use client';
import { NewsArticle } from '@/types/news';
import { cn } from '@/lib/utils/cn';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (h >= 24) return `${Math.floor(h / 24)}天前`;
  if (h >= 1) return `${h}小時前`;
  return `${m}分鐘前`;
}

const categoryLabel: Record<string, string> = {
  MACRO: '總經', SECTOR: '產業', COMPANY: '公司', EARNINGS: '財報', POLICY: '政策',
};

export function NewsCard({ article, onClick }: { article: NewsArticle; onClick?: () => void }) {
  const sentimentIcon = article.sentiment === 'POSITIVE'
    ? <TrendingUp size={12} className="text-(--color-bull)" />
    : article.sentiment === 'NEGATIVE'
    ? <TrendingDown size={12} className="text-(--color-bear)" />
    : <Minus size={12} className="text-(--color-muted)" />;

  return (
    <div
      className="p-4 border-b border-(--color-border) hover:bg-(--color-surface) transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-1 rounded-full shrink-0 self-stretch',
          article.sentiment === 'POSITIVE' ? 'bg-(--color-bull)' :
          article.sentiment === 'NEGATIVE' ? 'bg-(--color-bear)' : 'bg-(--color-muted)'
        )} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-(--color-muted-bg) text-(--color-muted) font-medium">
              {categoryLabel[article.category] ?? article.category}
            </span>
            {article.sector && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-medium">
                {article.sector}
              </span>
            )}
            {sentimentIcon}
          </div>

          <h4 className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2">
            {article.title}
          </h4>

          <p className="text-xs text-(--color-muted) leading-relaxed line-clamp-2 mb-2">
            {article.summary}
          </p>

          <div className="flex items-center gap-3 text-[10px] text-(--color-muted)">
            <span className="font-medium">{article.source}</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {timeAgo(article.publishedAt)}
            </span>
            {article.relatedTickers.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {article.relatedTickers.slice(0, 4).map(t => (
                  <span key={t} className="px-1 py-0.5 rounded border border-(--color-border) font-mono">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
