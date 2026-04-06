import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmt(n: number, decimals = 2): string {
  return n.toLocaleString('zh-TW', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

export function fmtPct(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

export function fmtBillion(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}兆`;
  if (n >= 100) return `${n.toFixed(0)}億`;
  return `${n.toFixed(1)}億`;
}

export function fmtVolume(n: number): string {
  if (n >= 1e8) return `${(n / 1e8).toFixed(2)}億`;
  if (n >= 1e4) return `${(n / 1e4).toFixed(1)}萬`;
  return n.toString();
}
