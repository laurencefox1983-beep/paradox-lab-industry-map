import { industries, getIndustryBySlug } from '@/data/industries';
import { allStocks, getStockById } from '@/data/stocks';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { IndustryTreemap } from '@/components/industry/IndustryTreemap';
import { PriceChange } from '@/components/stock/PriceChange';
import { SignalBadge } from '@/components/ui/Badge';
import { fmt } from '@/lib/utils/cn';

export function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }));
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const stocks = industry.companies
    .map(id => getStockById(id))
    .filter(Boolean)
    .sort((a, b) => b!.marketCap - a!.marketCap) as NonNullable<ReturnType<typeof getStockById>>[];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <Link href="/industry" className="inline-flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-foreground) mb-4">
        <ChevronLeft size={16} /> 返回產業地圖
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{industry.name}</h1>
          <p className="text-(--color-muted) text-sm max-w-xl">{industry.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-(--color-muted) mb-1">年初至今報酬</div>
          <div className={`text-2xl font-bold ${industry.ytdReturn >= 0 ? 'text-(--color-bull)' : 'text-(--color-bear)'}`}>
            {industry.ytdReturn >= 0 ? '+' : ''}{industry.ytdReturn.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Themes */}
      <div className="flex flex-wrap gap-2 mb-6">
        {industry.themes.map(t => (
          <div key={t.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{ borderColor: t.color + '60', background: t.color + '12', color: t.color }}>
            <span className="font-semibold">{t.name}</span>
            <span className="opacity-70">{t.description}</span>
          </div>
        ))}
      </div>

      {/* Treemap */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-(--color-muted) uppercase tracking-wider mb-3">市值分佈熱力圖</h2>
        <IndustryTreemap stocks={stocks} />
      </div>

      {/* Stock list */}
      <h2 className="text-sm font-bold text-(--color-muted) uppercase tracking-wider mb-3">產業成份股</h2>
      <div className="rounded-xl border border-(--color-border) overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_80px_80px_60px_80px] gap-2 px-4 py-2.5 text-[11px] font-semibold text-(--color-muted) bg-(--color-surface) border-b border-(--color-border)">
          <span>股票</span>
          <span className="text-right">市值(億)</span>
          <span className="text-right">現價</span>
          <span className="text-right">漲跌幅</span>
          <span className="text-center">信號</span>
          <span className="text-right">AI評分</span>
        </div>
        {stocks.map(stock => (
          <Link key={stock.id} href={`/stock/${stock.ticker}`}>
            <div className="grid grid-cols-[1fr_100px_80px_80px_60px_80px] gap-2 px-4 py-3 border-b border-(--color-border) hover:bg-(--color-surface) transition-colors items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{stock.ticker}</span>
                  <span className="text-xs text-(--color-muted)">{stock.name}</span>
                </div>
              </div>
              <span className="text-right text-sm tabular-nums">{stock.marketCap.toLocaleString()}</span>
              <span className="text-right text-sm tabular-nums">{fmt(stock.price)}</span>
              <div className="text-right">
                <PriceChange pct={stock.priceChangePct} size="sm" />
              </div>
              <div className="flex justify-center">
                <SignalBadge signal={stock.signal} />
              </div>
              <div className="flex items-center gap-1 justify-end">
                <div className="w-12 h-1.5 rounded-full bg-(--color-border)">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500"
                    style={{ width: `${stock.aiScore}%` }} />
                </div>
                <span className="text-xs font-bold">{stock.aiScore}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
