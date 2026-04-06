export function getHeatmapColor(pctChange: number): string {
  const clamp = Math.max(-8, Math.min(8, pctChange));
  const intensity = Math.abs(clamp) / 8;

  if (pctChange > 0.3) {
    const l = 0.62 - intensity * 0.18;
    const c = 0.12 + intensity * 0.10;
    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} 142)`;
  } else if (pctChange < -0.3) {
    const l = 0.62 - intensity * 0.18;
    const c = 0.12 + intensity * 0.10;
    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} 25)`;
  }
  return 'oklch(0.55 0 0)';
}

export function getHeatmapTextColor(pctChange: number): string {
  return Math.abs(pctChange) > 1 ? '#ffffff' : '#ffffff';
}
