'use client';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bull' | 'bear' | 'neutral' | 'watch' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-semibold rounded-sm',
      size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-1 text-xs',
      variant === 'bull' && 'bg-(--color-bull-bg) text-(--color-bull)',
      variant === 'bear' && 'bg-(--color-bear-bg) text-(--color-bear)',
      variant === 'neutral' && 'bg-(--color-muted-bg) text-(--color-muted)',
      variant === 'watch' && 'bg-(--color-watch-bg) text-(--color-watch)',
      variant === 'default' && 'bg-(--color-surface) text-(--color-foreground) border border-(--color-border)',
      className
    )}>
      {children}
    </span>
  );
}

export function SignalBadge({ signal }: { signal: string }) {
  const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    BUY: { label: '買進', variant: 'bull' },
    HOLD: { label: '持有', variant: 'neutral' },
    SELL: { label: '賣出', variant: 'bear' },
    WATCH: { label: '觀察', variant: 'watch' },
  };
  const cfg = map[signal] ?? { label: signal, variant: 'default' };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export function MarketBadge({ market }: { market: string }) {
  const colors: Record<string, string> = {
    TW: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950',
    US: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
    JP: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950',
  };
  return (
    <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded-sm text-[11px] font-bold', colors[market] ?? 'bg-(--color-surface)')}>
      {market}
    </span>
  );
}
