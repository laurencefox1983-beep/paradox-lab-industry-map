import { allStocks, getStockByTicker } from '@/data/stocks';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { StockDetailPanel } from '@/components/stock/StockDetailPanel';
import { supplyChains } from '@/data/supply-chains';

export function generateStaticParams() {
  return allStocks.map(s => ({ ticker: s.ticker }));
}

export default async function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const stock = getStockByTicker(ticker);
  if (!stock) notFound();

  const chain = supplyChains.find(c =>
    c.nodes.some(n => n.ticker === ticker)
  );

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <Link href="/market" className="inline-flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-foreground) mb-4">
        <ChevronLeft size={16} /> 返回市場
      </Link>

      <StockDetailPanel stock={stock} />

      {chain && (
        <div className="mt-8 p-4 rounded-xl border border-(--color-border) bg-(--color-surface)">
          <h3 className="text-sm font-bold mb-3">所屬供應鏈</h3>
          <Link href={`/supply-chain/${chain.focalTicker}`}
            className="inline-flex items-center gap-2 text-sm text-blue-500 hover:underline">
            查看 {chain.title} →
          </Link>
        </div>
      )}
    </div>
  );
}
