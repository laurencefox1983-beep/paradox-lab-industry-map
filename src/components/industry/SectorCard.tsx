'use client';
import Link from 'next/link';
import { IndustrySector } from '@/types/industry';
import { cn, fmtPct } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SectorCard({ sector }: { sector: IndustrySector }) {
  const isUp = sector.ytdReturn >= 0;

  return (
    <Link href={`/industry/${sector.slug}`}>
      <div className="p-4 rounded-xl border border-(--color-border) bg-(--color-surface) hover:bg-(--color-surface-hover) transition-colors cursor-pointer group h-full">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{ background: sector.color + '20', color: sector.color }}
          >
            {sector.name.charAt(0)}
          </div>
          <span className={cn(
            'flex items-center gap-1 text-sm font-bold',
            isUp ? 'text-(--color-bull)' : 'text-(--color-bear)'
          )}>
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            YTD {isUp ? '+' : ''}{sector.ytdReturn.toFixed(1)}%
          </span>
        </div>

        <h3 className="font-bold text-sm mb-1 group-hover:text-blue-500 transition-colors">
          {sector.name}
        </h3>
        <p className="text-(--color-muted) text-xs leading-relaxed mb-3 line-clamp-2">
          {sector.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {sector.themes.slice(0, 3).map(t => (
            <span key={t.id}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ background: t.color + '20', color: t.color }}
            >
              {t.name}
            </span>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-(--color-border) text-[11px] text-(--color-muted)">
          {sector.companies.length} 家公司
        </div>
      </div>
    </Link>
  );
}
