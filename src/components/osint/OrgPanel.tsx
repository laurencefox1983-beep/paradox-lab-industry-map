'use client';
import { useState } from 'react';
import { Search, Loader2, AlertTriangle, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ── 型別 ──────────────────────────────────────────────────────
type Finding = { type: string; msg: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

// ── 共用元件 ─────────────────────────────────────────────────
function FindingBadge({ f }: { f: Finding }) {
  const isWarn = f.type === 'warning';
  return (
    <div className={cn(
      'flex items-start gap-2 text-xs px-3 py-2 rounded-lg mb-2',
      isWarn ? 'bg-amber-950/60 text-amber-300 border border-amber-800' : 'bg-blue-950/60 text-blue-300 border border-blue-800'
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
      <span className="break-all">{value}</span>
    </div>
  );
}

// ── 商工登記 ─────────────────────────────────────────────────
function OrgSection({ data }: { data: AnyObj }) {
  const companies: AnyObj[] = (data.companies ?? []).filter((c: AnyObj) => c?.name);
  const findings: Finding[] = data.findings ?? [];
  if (!companies.length && !findings.length) return null;

  return (
    <SectionCard title="商工登記資料">
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      {companies.map((c, i) => {
        const capRaw = String(c.capital ?? '').replace(/,/g, '');
        const cap = /^\d+$/.test(capRaw) ? `NT$${parseInt(capRaw).toLocaleString()}` : c.capital;
        return (
          <div key={i} className={cn(i > 0 && 'mt-4 pt-4 border-t border-(--color-border)')}>
            <p className="text-blue-400 font-semibold text-sm mb-2">#{i + 1} {c.name}</p>
            <div className="space-y-0.5">
              <KV label="統一編號" value={c.business_no} />
              <KV label="登記機關" value={c.registered_by} />
              <KV label="公司狀態" value={c.status} />
              <KV label="資本額" value={cap} />
              <KV label="負責人" value={c.representative} />
              <KV label="地址" value={c.address} />
              <KV label="設立日期" value={c.established} />
              <KV label="主要業務" value={(c.business_items ?? []).join('、')} />
            </div>
          </div>
        );
      })}
    </SectionCard>
  );
}

// ── 公開資訊觀測站 ───────────────────────────────────────────
function MopsSection({ data }: { data: AnyObj }) {
  const c = data.company;
  const findings: Finding[] = data.findings ?? [];
  if (!c && !findings.length) return null;

  const shareholders: AnyObj[] = data.major_shareholders ?? c?.major_shareholders ?? [];
  const announcements: AnyObj[] = data.announcements ?? c?.announcements ?? [];

  return (
    <SectionCard title="公開資訊觀測站（上市/上櫃）">
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      {c && (
        <div className="space-y-0.5 mb-4">
          <KV label="股票代號" value={c.stock_code} />
          <KV label="公司名稱" value={c.company_name} />
          <KV label="市場別" value={c.market} />
          <KV label="產業類別" value={c.industry} />
          <KV label="股本" value={c.capital} />
          <KV label="董事長" value={c.chairman} />
          <KV label="總經理" value={c.ceo} />
          <KV label="成立日期" value={c.established} />
          <KV label="上市日期" value={c.listed_date} />
        </div>
      )}
      {shareholders.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">主要股東</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="text-(--color-muted) border-b border-(--color-border)">
                <th className="text-left py-1 pr-4">股東名稱</th>
                <th className="text-right py-1 pr-3">持股數</th>
                <th className="text-right py-1 pr-3">質押股數</th>
                <th className="text-right py-1">質押比率</th>
              </tr></thead>
              <tbody>
                {shareholders.map((s: AnyObj, i: number) => (
                  <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                    <td className="py-1 pr-4">{s.name}</td>
                    <td className={cn('py-1 pr-3 text-right', s.pledged_shares ? 'text-amber-400' : '')}>{s.shares ?? '—'}</td>
                    <td className={cn('py-1 pr-3 text-right', s.pledged_shares ? 'text-amber-400' : 'text-(--color-muted)')}>{s.pledged_shares ?? '—'}</td>
                    <td className={cn('py-1 text-right', s.pledged_ratio ? 'text-amber-300' : 'text-(--color-muted)')}>{s.pledged_ratio ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {announcements.length > 0 && (
        <div className="mt-4 pt-3 border-t border-(--color-border)">
          <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-wider mb-2">近期重大訊息</p>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {announcements.map((a: AnyObj, i: number) => (
              <div key={i} className="rounded-lg bg-(--color-background) border border-(--color-border) px-3 py-2 text-xs">
                <span className="text-(--color-muted) mr-3">{a.date} {a.time}</span>
                <span>{a.subject}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ── 制裁名單 ─────────────────────────────────────────────────
function SanctionsSection({ data }: { data: AnyObj }) {
  const hits: AnyObj[] = data.hits ?? [];
  const findings: Finding[] = data.findings ?? [];
  const checked = data.checked ?? {};
  const lists = [checked.ofac && 'OFAC', checked.un && 'UN'].filter(Boolean).join(' + ');

  return (
    <SectionCard
      title={`制裁名單比對${lists ? ` (${lists})` : ''}`}
      badge={hits.length > 0
        ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/50 text-red-300">⚠ {hits.length} 筆命中</span>
        : <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">✓ 未命中</span>
      }
    >
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      {hits.map((hit: AnyObj, i: number) => (
        <div key={i} className="rounded-lg border-l-2 border-red-600 bg-(--color-background) px-3 py-2 mb-2">
          <div className="flex gap-2 flex-wrap mb-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300">{hit.list}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/50 text-red-300">{hit.type}</span>
            {hit.program && <span className="text-[10px] text-(--color-muted)">{hit.program}</span>}
          </div>
          <div className="text-xs space-y-0.5">
            <div><span className="text-(--color-muted)">查詢對象：</span>{hit.target}</div>
            <div><span className="text-(--color-muted)">名單比對：</span><span className="text-red-300 font-semibold">{hit.matched}</span></div>
            {hit.listed && <div><span className="text-(--color-muted)">列名日期：</span>{hit.listed}</div>}
          </div>
        </div>
      ))}
      {!hits.length && !findings.length && (
        <p className="text-xs text-(--color-muted)">查無制裁名單命中紀錄</p>
      )}
    </SectionCard>
  );
}

// ── 政府採購 ─────────────────────────────────────────────────
function ProcurementSection({ data }: { data: AnyObj }) {
  const awards: AnyObj[] = data.awards ?? [];
  const findings: Finding[] = data.findings ?? [];
  if (!awards.length && !findings.length) return null;

  return (
    <SectionCard title="政府採購得標紀錄" badge={
      awards.length > 0 ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--color-muted-bg) text-(--color-muted)">{awards.length} 筆</span> : undefined
    }>
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      {awards.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-(--color-muted) border-b border-(--color-border)">
              <th className="text-left py-1 pr-3">決標日期</th>
              <th className="text-left py-1 pr-3">機關名稱</th>
              <th className="text-left py-1 pr-3">標案名稱</th>
              <th className="text-right py-1">金額</th>
            </tr></thead>
            <tbody>
              {awards.map((a: AnyObj, i: number) => {
                const amt = Number(a.amount_int);
                const fmtAmt = amt >= 1e8 ? `${(amt / 1e8).toFixed(1)}億` : amt >= 1e4 ? `${(amt / 1e4).toFixed(0)}萬` : String(a.amount ?? '—');
                return (
                  <tr key={i} className="border-b border-(--color-border) hover:bg-(--color-surface-hover)">
                    <td className="py-1 pr-3 text-(--color-muted)">{a.award_date ?? '—'}</td>
                    <td className="py-1 pr-3">{a.org_name ?? '—'}</td>
                    <td className="py-1 pr-3">{a.case_name ?? '—'}</td>
                    <td className="py-1 text-right">{fmtAmt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}

// ── 裁罰紀錄 ─────────────────────────────────────────────────
function PenaltySection({ data }: { data: AnyObj }) {
  const all: AnyObj[] = [...(data.fsc ?? []), ...(data.mol ?? []), ...(data.epa ?? [])];
  const findings: Finding[] = data.findings ?? [];
  if (!all.length && !findings.length) return null;

  return (
    <SectionCard title="裁罰紀錄" badge={
      all.length > 0 ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300">{all.length} 筆</span> : undefined
    }>
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {all.map((p: AnyObj, i: number) => (
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
}

// ── 商標與專利 ───────────────────────────────────────────────
function TipoSection({ data }: { data: AnyObj }) {
  const trademarks: AnyObj[] = data.trademarks ?? [];
  const patents: AnyObj[] = data.patents ?? [];
  const findings: Finding[] = data.findings ?? [];
  if (!trademarks.length && !patents.length && !findings.some(f => f.type === 'warning')) return null;

  return (
    <SectionCard title="商標與專利（TIPO）">
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      {trademarks.length > 0 && (
        <>
          <p className="text-[10px] text-(--color-muted) mb-2">商標（{trademarks.length} 筆）</p>
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
                {trademarks.map((t: AnyObj, i: number) => (
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
      {patents.length > 0 && (
        <>
          <p className="text-[10px] text-(--color-muted) mb-2">專利（{patents.length} 筆）</p>
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
                {patents.map((p: AnyObj, i: number) => (
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
  );
}

// ── 新聞輿情 ─────────────────────────────────────────────────
function NewsSection({ data }: { data: AnyObj }) {
  const articles: AnyObj[] = data.articles ?? [];
  const riskCount: number = data.risk_count ?? 0;
  const findings: Finding[] = data.findings ?? [];
  if (!articles.length && !findings.length) return null;

  return (
    <SectionCard title="新聞輿情" badge={
      riskCount > 0
        ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300">{riskCount} 則風險</span>
        : <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">無風險關鍵字</span>
    }>
      {findings.map((f, i) => <FindingBadge key={i} f={f} />)}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {articles.map((a: AnyObj, i: number) => {
          const isRisk = a.sentiment === 'risk';
          const isPos = a.sentiment === 'positive';
          return (
            <div key={i} className={cn(
              'rounded-lg bg-(--color-background) px-3 py-2 border-l-2',
              isRisk ? 'border-red-600' : isPos ? 'border-green-600' : 'border-(--color-border)'
            )}>
              <a href={a.link} target="_blank" rel="noopener noreferrer"
                className="text-xs hover:text-blue-400 leading-snug flex items-start gap-1 mb-1">
                {a.title}
                <ExternalLink size={10} className="shrink-0 mt-0.5 opacity-50" />
              </a>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-(--color-muted)">{a.source}</span>
                <span className="text-[10px] text-(--color-muted)">{a.pub_date}</span>
                {(a.keywords ?? []).map((kw: string, j: number) => (
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
  );
}

// ── 主元件 ───────────────────────────────────────────────────
interface AllResults {
  org: AnyObj | null;
  mops: AnyObj | null;
  sanctions: AnyObj | null;
  procurement: AnyObj | null;
  penalty: AnyObj | null;
  tipo: AnyObj | null;
  news: AnyObj | null;
}

export function OrgPanel() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AllResults | null>(null);
  const [error, setError] = useState('');

  const search = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setLoading(true);
    setResults(null);
    setError('');

    try {
      const enc = encodeURIComponent(q);

      // 並行查詢所有來源
      const [orgRes, mopsRes, newsRes, procRes, penaltyRes, tipoRes] = await Promise.allSettled([
        fetch(`/api/osint/org?q=${enc}`).then(r => r.json()),
        fetch(`/api/osint/mops?q=${enc}`).then(r => r.json()),
        fetch(`/api/osint/news?q=${enc}`).then(r => r.json()),
        fetch(`/api/osint/procurement?q=${enc}`).then(r => r.json()),
        fetch(`/api/osint/penalty?q=${enc}`).then(r => r.json()),
        fetch(`/api/osint/tipo?q=${enc}`).then(r => r.json()),
      ]);

      // 取得董監事名單後再查制裁名單
      const mopsData = mopsRes.status === 'fulfilled' ? mopsRes.value : null;
      const directors = mopsData?.directors ?? mopsData?.company?.directors ?? [];
      const sanctionsRes = await fetch(
        `/api/osint/sanctions?q=${enc}&directors=${encodeURIComponent(JSON.stringify(directors))}`
      ).then(r => r.json()).catch(() => null);

      setResults({
        org: orgRes.status === 'fulfilled' ? orgRes.value : null,
        mops: mopsData,
        sanctions: sanctionsRes,
        procurement: procRes.status === 'fulfilled' ? procRes.value : null,
        penalty: penaltyRes.status === 'fulfilled' ? penaltyRes.value : null,
        tipo: tipoRes.status === 'fulfilled' ? tipoRes.value : null,
        news: newsRes.status === 'fulfilled' ? newsRes.value : null,
      });
    } catch {
      setError('查詢失敗，請確認後端服務正在執行');
    } finally {
      setLoading(false);
    }
  };

  const hasAnyResult = results && Object.values(results).some(v => v !== null);

  return (
    <div className="space-y-4">
      {/* 搜尋框 */}
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
        <p className="text-xs text-(--color-muted)">
          同時查詢：商工登記 · 公開資訊觀測站 · 制裁名單（OFAC/UN）· 裁罰紀錄 · 政府採購 · 商標專利 · 新聞輿情
        </p>
      </div>

      {/* 載入中 */}
      {loading && (
        <div className="flex items-center gap-3 text-sm text-(--color-muted) py-4">
          <Loader2 size={18} className="animate-spin text-blue-500" />
          正在並行查詢所有資料來源...
        </div>
      )}

      {/* 錯誤 */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {/* 查無資料 */}
      {results && !hasAnyResult && (
        <div className="rounded-xl border border-(--color-border) p-6 text-center text-(--color-muted) text-sm">
          找不到任何相符資料
        </div>
      )}

      {/* 結果 */}
      {results && (
        <div className="space-y-3">
          {results.org && <OrgSection data={results.org} />}
          {results.mops && <MopsSection data={results.mops} />}
          {results.sanctions && <SanctionsSection data={results.sanctions} />}
          {results.procurement && <ProcurementSection data={results.procurement} />}
          {results.penalty && <PenaltySection data={results.penalty} />}
          {results.tipo && <TipoSection data={results.tipo} />}
          {results.news && <NewsSection data={results.news} />}
        </div>
      )}
    </div>
  );
}
