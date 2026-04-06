'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarketStore } from '@/lib/store/useMarketStore';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils/cn';
import { BarChart2, Search } from 'lucide-react';
import { Market } from '@/types/stock';

const markets: { id: Market; label: string }[] = [
  { id: 'TW', label: '台股' },
  { id: 'US', label: '美股' },
  { id: 'JP', label: '日股' },
];

const navLinks = [
  { href: '/market', label: '市場熱力圖' },
  { href: '/supply-chain', label: '供應鏈圖' },
  { href: '/industry', label: '產業地圖' },
  { href: '/ai-ranking', label: 'AI排行榜' },
  { href: '/news', label: '產業新聞' },
  { href: '/osint', label: '商業情報調查', highlight: true },
];

export function Navbar() {
  const pathname = usePathname();
  const { activeMarket, setActiveMarket, searchQuery, setSearchQuery } = useMarketStore();

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)/95 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Top row */}
        <div className="flex items-center gap-4 h-12">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm shrink-0">
            <BarChart2 size={20} className="text-blue-500" />
            <span className="hidden sm:inline">【Paradox Lab】產業智慧地圖</span>
          </Link>

          {/* Market tabs */}
          <div className="flex items-center gap-1 border border-(--color-border) rounded-md p-0.5">
            {markets.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMarket(m.id)}
                className={cn(
                  'px-3 py-1 text-xs font-semibold rounded transition-colors',
                  activeMarket === m.id
                    ? 'bg-(--color-foreground) text-(--color-background)'
                    : 'text-(--color-muted) hover:text-(--color-foreground)'
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-(--color-border) bg-(--color-surface) text-sm">
            <Search size={14} className="text-(--color-muted) shrink-0" />
            <input
              type="text"
              placeholder="搜尋股票代號或名稱..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-(--color-muted)"
            />
          </div>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5 overflow-x-auto pb-0">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors',
                pathname.startsWith(link.href)
                  ? 'border-(--color-foreground) text-(--color-foreground)'
                  : 'border-transparent text-(--color-muted) hover:text-(--color-foreground)',
                (link as { highlight?: boolean }).highlight && !pathname.startsWith(link.href) && 'text-blue-500 hover:text-blue-400'
              )}
            >
              {link.label}
              {(link as { highlight?: boolean }).highlight && (
                <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-blue-500/20 text-blue-400 align-middle">NEW</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
