import { OHLCVBar } from '@/types/stock';

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  // skip weekends
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() - 1);
  }
  return d.toISOString().split('T')[0];
}

export function generateOHLCV(
  currentPrice: number,
  days: number,
  volatility = 0.018,
  drift = 0.0002
): OHLCVBar[] {
  const bars: OHLCVBar[] = [];
  let price = currentPrice * (0.65 + Math.random() * 0.15);
  const baseVolume = 1000000 + Math.random() * 50000000;

  for (let i = days; i >= 0; i--) {
    const dayVolatility = volatility * (0.5 + Math.random());
    const change = price * (drift + (Math.random() - 0.47) * dayVolatility);
    const open = price;
    const close = Math.max(price + change, price * 0.85);
    const high = Math.max(open, close) * (1 + Math.random() * 0.008);
    const low = Math.min(open, close) * (1 - Math.random() * 0.008);
    const volume = Math.floor(baseVolume * (0.5 + Math.random() * 1.5));
    price = close;

    bars.push({
      time: formatDate(i),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    });
  }
  return bars;
}

export function calcMA(data: OHLCVBar[], period: number): { time: string; value: number }[] {
  return data
    .map((bar, idx) => {
      if (idx < period - 1) return null;
      const slice = data.slice(idx - period + 1, idx + 1);
      const avg = slice.reduce((s, b) => s + b.close, 0) / period;
      return { time: bar.time, value: +avg.toFixed(2) };
    })
    .filter(Boolean) as { time: string; value: number }[];
}
