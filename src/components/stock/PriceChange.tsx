import { cn, fmtPct } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  pct: number;
  abs?: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceChange({ pct, abs, showIcon = false, size = 'md' }: Props) {
  const isUp = pct > 0.05;
  const isDown = pct < -0.05;

  return (
    <span className={cn(
      'inline-flex items-center gap-1 font-semibold tabular-nums',
      size === 'sm' && 'text-[11px]',
      size === 'md' && 'text-xs',
      size === 'lg' && 'text-sm',
      isUp && 'text-(--color-bull)',
      isDown && 'text-(--color-bear)',
      !isUp && !isDown && 'text-(--color-muted)',
    )}>
      {showIcon && (isUp ? <TrendingUp size={12} /> : isDown ? <TrendingDown size={12} /> : <Minus size={12} />)}
      {abs !== undefined && <span>{abs > 0 ? '+' : ''}{abs.toFixed(2)}</span>}
      <span>({fmtPct(pct)})</span>
    </span>
  );
}
