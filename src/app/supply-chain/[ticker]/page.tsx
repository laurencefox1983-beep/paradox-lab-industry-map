import { supplyChains, getSupplyChainByTicker } from '@/data/supply-chains';
import { SupplyChainFlow } from '@/components/supply-chain/SupplyChainFlow';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function generateStaticParams() {
  return supplyChains.map(c => ({ ticker: c.focalTicker }));
}

export default async function SupplyChainPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const chain = getSupplyChainByTicker(ticker);
  if (!chain) notFound();

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      <Link href="/supply-chain" className="inline-flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-foreground) mb-4">
        <ChevronLeft size={16} /> 返回供應鏈列表
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{chain.title}</h1>
        <p className="text-(--color-muted) text-sm">{chain.description}</p>
      </div>

      <div className="relative">
        <SupplyChainFlow chain={chain} />
      </div>

      {/* Node list */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {chain.nodes.map(node => (
          <Link key={node.id} href={`/stock/${node.ticker}`}>
            <div className="p-3 rounded-lg border border-(--color-border) hover:bg-(--color-surface) transition-colors">
              <div className="text-xs text-(--color-muted) mb-0.5">{node.category}</div>
              <div className="font-bold text-sm">{node.ticker}</div>
              <div className="text-xs text-(--color-muted) truncate">{node.name}</div>
              <div className={`text-xs font-semibold mt-1 ${node.priceChangePct >= 0 ? 'text-(--color-bull)' : 'text-(--color-bear)'}`}>
                {node.priceChangePct >= 0 ? '+' : ''}{node.priceChangePct.toFixed(2)}%
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
