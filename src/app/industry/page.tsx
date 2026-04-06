import { industries } from '@/data/industries';
import { SectorCard } from '@/components/industry/SectorCard';

export default function IndustryPage() {
  const sorted = [...industries].sort((a, b) => b.ytdReturn - a.ytdReturn);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">產業地圖</h1>
        <p className="text-(--color-muted) text-sm">掌握各產業動態、投資主題與重點企業佈局</p>
      </div>

      {/* Performance summary */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
        {sorted.map(ind => (
          <div key={ind.id} className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border border-(--color-border) text-xs">
            <span className="font-medium">{ind.name}</span>
            <span className={ind.ytdReturn >= 0 ? 'text-(--color-bull) font-bold' : 'text-(--color-bear) font-bold'}>
              {ind.ytdReturn >= 0 ? '+' : ''}{ind.ytdReturn.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(sector => (
          <SectorCard key={sector.id} sector={sector} />
        ))}
      </div>
    </div>
  );
}
