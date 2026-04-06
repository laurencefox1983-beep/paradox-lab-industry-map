import { supplyChains } from '@/data/supply-chains';
import Link from 'next/link';
import { getStockById } from '@/data/stocks';
import { PriceChange } from '@/components/stock/PriceChange';

export default function SupplyChainIndexPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">供應鏈圖譜</h1>
        <p className="text-(--color-muted) text-sm">互動式供應鏈關係圖，掌握上下游廠商連結與投資機會</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supplyChains.map(chain => {
          const focal = getStockById(chain.focalCompanyId);
          return (
            <Link key={chain.id} href={`/supply-chain/${chain.focalTicker}`}>
              <div className="rounded-xl border border-(--color-border) p-6 hover:bg-(--color-surface) transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold group-hover:text-blue-500 transition-colors">
                      {chain.title}
                    </h2>
                    <p className="text-(--color-muted) text-sm mt-1">{chain.description}</p>
                  </div>
                  {focal && (
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-sm font-bold">{focal.ticker}</div>
                      <PriceChange pct={focal.priceChangePct} />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {chain.nodes.slice(0, 6).map(node => (
                    <span key={node.id}
                      className="text-[11px] px-2 py-1 rounded-full border border-(--color-border) text-(--color-muted)">
                      {node.ticker} {node.name}
                    </span>
                  ))}
                  {chain.nodes.length > 6 && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-(--color-surface) text-(--color-muted)">
                      +{chain.nodes.length - 6} 更多
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-(--color-border) text-[11px] text-(--color-muted)">
                  {chain.nodes.length} 家企業 · {chain.edges.length} 條關係
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
