import { Building2 } from 'lucide-react';
import { OrgPanel } from '@/components/osint/OrgPanel';

export default function OsintPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
          <Building2 size={20} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">商業情報調查</h1>
          <p className="text-sm text-(--color-muted)">企業盡職調查 · 商工登記 · 制裁名單 · 裁罰紀錄 · 政府採購 · 商標專利</p>
        </div>
        <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-amber-900/30 text-amber-400 border border-amber-800/50">
          僅供合法授權調查使用
        </div>
      </div>

      <OrgPanel />
    </div>
  );
}
