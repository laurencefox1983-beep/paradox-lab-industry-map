'use client';
import { newsArticles } from '@/data/news';
import { cn } from '@/lib/utils/cn';

export function NewsTicker() {
  const items = newsArticles.slice(0, 8);
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="border-b border-(--color-border) bg-(--color-surface) overflow-hidden h-8 flex items-center">
      <span className="shrink-0 px-3 text-[11px] font-bold text-(--color-muted) border-r border-(--color-border) h-full flex items-center">
        即時快訊
      </span>
      <div className="flex-1 overflow-hidden relative">
        <div className="news-ticker-inner flex items-center gap-8 whitespace-nowrap">
          {doubled.map((a, i) => (
            <span key={i} className="flex items-center gap-2 text-[11px]">
              <span className={cn(
                'w-1.5 h-1.5 rounded-full shrink-0',
                a.sentiment === 'POSITIVE' ? 'bg-(--color-bull)' : a.sentiment === 'NEGATIVE' ? 'bg-(--color-bear)' : 'bg-(--color-muted)'
              )} />
              {a.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
