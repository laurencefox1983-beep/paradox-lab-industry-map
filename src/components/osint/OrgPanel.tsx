'use client';
import { useState } from 'react';
import { Search, Loader2, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

function FindingBadge({ f }: { f: { type: string; msg: string } }) {
  const isWarn = f.type === 'warning';
  return (
    <div className={cn(
      'flex items-start gap-2 text-xs px-3 py-2 rounded-lg mb-2',
      isWarn
        ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
        : 'bg-blue-950/60 text-blue-300 border border-blue-800'
    )}>
      {isWarn ? <AlertTriangle size={12} className="shrink-0 mt-0.5" /> : <Info size={12} className="shrink-0 mt-0.5" />}
      {f.msg}
    </div>
  );
}

function SectionCard({ title, children, badge }: { title: string; children: React.ReactNode; badge?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden">
      <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-(--color-surface-hover) transition-colors"
        onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {badge}
        </div>
        {open ? <ChevronUp size={14} className="text-(--color-muted)" /> : <ChevronDown size={14} className="text-(--color-muted)" />}
      </button>
      {open && <div className="px-4 pb-4 border-t border-(--color-border) pt-3">{children}</div>}
    </div>
  );
}

function KV({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-xs py-0.5">
      <span className="text-(--color-muted) w-28 shrink-0">{label}</span>
      <span className="text-(--color-foreground) break-all">{value}</span>
    </div>
  );
}

function OrgResults({ data }: { data: Record<string, unknown> }) {
  const findings = (data.findings as { type: string; msg: string }[]) ?? [];
  const basic = data.basic as Record<string, unknown> | null;
  const mops = data.mops as Record<string, unknown> | null;
  const sanctions = data.sanctions as Record<string, unknown> | null;
  const procurement = data.procurement as Record<string, unknown> | null;
  const penalty = data.penalty as Record<string, unknown> | null;
  const tipo = data.tipo as Record<string, unknown> | null;
  const news = data.news as Record<string, unknown> | null;

  return (
    <div className="space-y-3">
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}

      {/* 基本資料 */}
      {basic && (
        <SectionCard title="商工登記基本資料">
          <div className="space-y-0.5">
            <KV label="公司名稱" value={basic.company_name as string} />
            <KV label="統一編號" value={basic.tax_id as string} />
            <KV label="負責人" value={basic.representative as string} />
            <KV label="公司狀態" value={basic.status as string} />
            <KV label="資本額" value={basic.capital as string} />
            <KV label="設立日期" value={basic.establishment_date as string} />
            <KV label="地址" value={basic.address as string} />
            <KV label="主要業務" value={basic.business as string} />
          </div>
          {(basic.directors as unknown[])?.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">董監事名單</p>
              <div className="space-y-1">
                {(basic.directors as Record<string, string>[]).map((d, i) => (
                  <div key={i} className="flex gap-4 text-xs">
                    <span className="text-(--color-muted) w-16 shrink-0">{d.title}</span>
                    <span className="text-(--color-foreground)">{d.name}</span>
                    {d.shares && <span className="text-(--color-muted)">{d.shares} 股</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {/* 公開資訊觀測站 */}
      {mops && (
        <SectionCard title="公開資訊觀測站（上市/上櫃）">
          <div className="space-y-0.5">
            <KV label="股票代號" value={mops.stock_code as string} />
            <KV label="公司名稱" value={mops.company_name as string} />
            <KV label="市場別" value={mops.market as string} />
            <KV label="產業類別" value={mops.industry as string} />
            <KV label="股本" value={mops.capital as string} />
            <KV label="董事長" value={mops.chairman as string} />
            <KV label="總經理" value={mops.ceo as string} />
            <KV label="成立日期" value={mops.established as string} />
            <KV label="上市日期" value={mops.listed_date as string} />
          </div>
          {/* 大股東 */}
          {(mops.major_shareholders as unknown[])?.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">主要股東</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-(--color-muted) border-b border-(--color-border)">
                      <th className="text-left py-1 pr-4">股東名稱</th>
                      <th className="text-right py-1 pr-3">持股數</th>
                      <th className="text-right py-1 pr-3">質押股數</th>
                      <th className="text-right py-1">質押比率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mops.major_shareholders as Record<string, string>[]).map((s, i) => (
                      <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                        <td className="py-1 pr-4">{s.name}</td>
                        <td className="py-1 pr-3 text-right">{s.shares ?? '—'}</td>
                        <td className={cn('py-1 pr-3 text-right', s.pledged_shares ? 'text-amber-400' : 'text-(--color-muted)')}>{s.pledged_shares ?? '—'}</td>
                        <td className={cn('py-1 text-right', s.pledged_ratio ? 'text-amber-300' : 'text-(--color-muted)')}>{s.pledged_ratio ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* 重大訊息 */}
          {(mops.announcements as unknown[])?.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">近期重大訊息</p>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {(mops.announcements as Record<string, string>[]).map((a, i) => (
                  <div key={i} className="rounded-lg bg-(--color-background) border border-(--color-border) px-3 py-2">
                    <div className="flex gap-3 text-xs">
                      <span className="text-(--color-muted) shrink-0">{a.date} {a.time}</span>
                      <span>{a.subject}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {/* 制裁名單 */}
      {sanctions && (
        <SectionCard
          title="制裁名單比對"
          badge={
            (sanctions.hits as unknown[])?.length > 0
              ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300">⚠ {(sanctions.hits as unknown[]).length} 筆命中</span>
              : <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">未命中</span>
          }
        >
          {(sanctions.findings as { type: string; msg: string }[] ?? []).map((f, i) => <FindingBadge key={i} f={f} />)}
          {(sanctions.hits as Record<string, string>[])?.map((hit, i) => (
            <div key={i} className="rounded-lg border-l-2 border-red-600 bg-(--color-background) px-3 py-2 mb-2">
              <div className="flex gap-2 flex-wrap mb-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300">{hit.list}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/50 text-red-300">{hit.type}</span>
                {hit.program && <span className="text-[10px] text-(--color-muted)">{hit.program}</span>}
              </div>
              <div className="text-xs space-y-0.5">
                <div><span className="text-(--color-muted)">名單比對：</span><span className="text-red-300 font-semibold">{hit.matched}</span></div>
                {hit.listed && <div><span className="text-(--color-muted)">列名日期：</span>{hit.listed}</div>}
              </div>
            </div>
          ))}
        </SectionCard>
      )}

      {/* 政府採購 */}
      {procurement && (procurement.awards as unknown[])?.length > 0 && (
        <SectionCard title="政府採購得標紀錄" badge={
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--color-surface-hover) text-(--color-muted)">{(procurement.awards as unknown[]).length} 筆</span>
        }>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-(--color-muted) border-b border-(--color-border)">
                  <th className="text-left py-1 pr-3">決標日期</th>
                  <th className="text-left py-1 pr-3">機關名稱</th>
                  <th className="text-left py-1 pr-3">標案名稱</th>
                  <th className="text-right py-1">金額</th>
                </tr>
              </thead>
              <tbody>
                {(procurement.awards as Record<string, unknown>[]).map((a, i) => {
                  const amt = Number(a.amount_int);
                  const fmtAmt = amt >= 1e8 ? `${(amt / 1e8).toFixed(1)}億` : amt >= 1e4 ? `${(amt / 1e4).toFixed(0)}萬` : String(a.amount ?? '—');
                  return (
                    <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                      <td className="py-1 pr-3 text-(--color-muted)">{String(a.award_date ?? '—')}</td>
                      <td className="py-1 pr-3">{String(a.org_name ?? '—')}</td>
                      <td className="py-1 pr-3">{String(a.case_name ?? '—')}</td>
                      <td className="py-1 text-right">{fmtAmt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* 裁罰紀錄 */}
      {penalty && (() => {
        const all = [
          ...((penalty.fsc as unknown[]) ?? []),
          ...((penalty.mol as unknown[]) ?? []),
          ...((penalty.epa as unknown[]) ?? []),
        ];
        if (!all.length) return null;
        return (
          <SectionCard title="裁罰紀錄" badge={
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300">{all.length} 筆</span>
          }>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {(all as Record<string, string>[]).map((p, i) => (
                <div key={i} className="rounded-lg border-l-2 border-amber-600 bg-(--color-background) px-3 py-2">
                  <div className="flex gap-2 items-center mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300">{p.source}</span>
                    <span className="text-xs text-(--color-muted)">{p.date}</span>
                  </div>
                  {p.reason && <p className="text-xs mb-0.5">{p.reason}</p>}
                  {p.penalty && <p className="text-xs text-amber-300">裁罰：{p.penalty}</p>}
                  {p.amount && <p className="text-xs text-amber-300">積欠金額：{p.amount}</p>}
                </div>
              ))}
            </div>
          </SectionCard>
        );
      })()}

      {/* 商標與專利 */}
      {tipo && ((tipo.trademarks as unknown[])?.length > 0 || (tipo.patents as unknown[])?.length > 0) && (
        <SectionCard title="商標與專利（TIPO）">
          {(tipo.trademarks as Record<string, string>[])?.length > 0 && (
            <>
              <p className="text-[10px] text-(--color-muted) mb-2">商標（{(tipo.trademarks as unknown[]).length} 筆）</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                  <thead><tr className="text-(--color-muted) border-b border-(--color-border)">
                    <th className="text-left py-1 pr-3">申請號</th>
                    <th className="text-left py-1 pr-3">商標名稱</th>
                    <th className="text-left py-1 pr-3">類別</th>
                    <th className="text-left py-1 pr-3">狀態</th>
                    <th className="text-left py-1">申請日</th>
                  </tr></thead>
                  <tbody>
                    {(tipo.trademarks as Record<string, string>[]).map((t, i) => (
                      <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                        <td className="py-1 pr-3 text-(--color-muted)">{t.app_no}</td>
                        <td className="py-1 pr-3">{t.name}</td>
                        <td className="py-1 pr-3 text-(--color-muted)">{t.class}</td>
                        <td className="py-1 pr-3">{t.status}</td>
                        <td className="py-1 text-(--color-muted)">{t.app_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {(tipo.patents as Record<string, string>[])?.length > 0 && (
            <>
              <p className="text-[10px] text-(--color-muted) mb-2">專利（{(tipo.patents as unknown[]).length} 筆）</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-(--color-muted) border-b border-(--color-border)">
                    <th className="text-left py-1 pr-3">申請號</th>
                    <th className="text-left py-1 pr-3">發明名稱</th>
                    <th className="text-left py-1 pr-3">類型</th>
                    <th className="text-left py-1 pr-3">狀態</th>
                    <th className="text-left py-1">申請日</th>
                  </tr></thead>
                  <tbody>
                    {(tipo.patents as Record<string, string>[]).map((p, i) => (
                      <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                        <td className="py-1 pr-3 text-(--color-muted)">{p.app_no}</td>
                        <td className="py-1 pr-3">{p.title}</td>
                        <td className="py-1 pr-3 text-(--color-muted)">{p.type}</td>
                        <td className="py-1 pr-3">{p.status}</td>
                        <td className="py-1 text-(--color-muted)">{p.app_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </SectionCard>
      )}

      {/* 新聞輿情 */}
      {news && (news.articles as unknown[])?.length > 0 && (
        <SectionCard title="新聞輿情" badge={
          (news.risk_count as number) > 0
            ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300">{news.risk_count as number} 則風險</span>
            : <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">無風險關鍵字</span>
        }>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {(news.articles as Record<string, unknown>[]).map((a, i) => {
              const isRisk = a.sentiment === 'risk';
              const isPos = a.sentiment === 'positive';
              return (
                <div key={i} className={cn(
                  'rounded-lg bg-(--color-background) px-3 py-2 border-l-2',
                  isRisk ? 'border-red-600' : isPos ? 'border-green-600' : 'border-(--color-border)'
                )}>
                  <a href={String(a.link)} target="_blank" rel="noopener noreferrer"
                    className="text-xs hover:text-blue-400 leading-snug block mb-1">
                    {String(a.title)}
                  </a>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-(--color-muted)">{String(a.source ?? '')}</span>
                    <span className="text-[10px] text-(--color-muted)">{String(a.pub_date ?? '')}</span>
                    {(a.keywords as string[] ?? []).map((kw, j) => (
                      <span key={j} className={cn('text-[10px] px-1.5 py-0.5 rounded-full', isRisk ? 'bg-amber-900/50 text-amber-300' : 'bg-green-900/50 text-green-400')}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

export function OrgPanel() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');

  const search = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await fetch(`/api/osint/org?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setError('查詢失敗，請確認 OSINT 後端服務正在執行');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
        <div className="flex gap-3 mb-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="輸入公司名稱或股票代號，例如: 台灣積體電路 / 2330"
            className="flex-1 bg-(--color-background) border border-(--color-border) rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={search}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 text-white"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {loading ? '查詢中' : '查詢'}
          </button>
        </div>
        <p className="text-xs text-(--color-muted)">同時查詢：商工登記資料 + 公開資訊觀測站（上市/上櫃）+ 制裁名單 + 裁罰紀錄</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {result && <OrgResults data={result} />}
    </div>
  );
}
