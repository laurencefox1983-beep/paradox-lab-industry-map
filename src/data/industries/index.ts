import { IndustrySector } from '@/types/industry';

export const industries: IndustrySector[] = [
  {
    id: 'semiconductor',
    slug: 'semiconductor',
    name: '半導體',
    nameEn: 'Semiconductor',
    description: '涵蓋IC設計、晶圓代工、封測及半導體設備，是台灣科技業核心支柱。',
    icon: 'Cpu',
    color: '#3b82f6',
    ytdReturn: 18.6,
    themes: [
      { id: 'ai-chip', name: 'AI晶片', color: '#8b5cf6', description: 'AI訓練及推論加速器需求爆發' },
      { id: 'advanced-packaging', name: '先進封裝', color: '#06b6d4', description: 'CoWoS、SoIC等異質整合技術' },
      { id: 'hbm', name: 'HBM記憶體', color: '#f59e0b', description: 'AI訓練高頻寬記憶體需求' },
    ],
    companies: ['tw-2330', 'tw-2454', 'tw-3711', 'tw-2303', 'tw-2379', 'tw-3034', 'tw-6415', 'tw-6770', 'tw-2344', 'tw-2337', 'us-nvda', 'us-amd', 'us-avgo', 'us-mu', 'us-asml', 'us-amat', 'us-lrcx', 'us-arm', 'jp-4063', 'jp-6857', 'jp-6146'],
  },
  {
    id: 'server',
    slug: 'server',
    name: 'AI伺服器',
    nameEn: 'AI Server',
    description: 'AI運算基礎設施建設浪潮，包含伺服器代工、機板、電源及散熱元件。',
    icon: 'Server',
    color: '#8b5cf6',
    ytdReturn: 32.4,
    themes: [
      { id: 'gpu-server', name: 'GPU伺服器', color: '#8b5cf6', description: 'NVIDIA GPU整機系統組裝' },
      { id: 'liquid-cooling', name: '液冷散熱', color: '#06b6d4', description: 'AI晶片高密度散熱需求' },
      { id: 'power-supply', name: '高效電源', color: '#f59e0b', description: 'AI資料中心電源密度提升' },
    ],
    companies: ['tw-2382', 'tw-6669', 'tw-2308', 'tw-2376', 'tw-2345', 'us-nvda', 'us-smci'],
  },
  {
    id: 'shipping',
    slug: 'shipping',
    name: '航運',
    nameEn: 'Shipping',
    description: '貨櫃航運、散裝運輸，受惠全球貿易復甦及地緣政治供應鏈重組。',
    icon: 'Ship',
    color: '#0ea5e9',
    ytdReturn: 28.8,
    themes: [
      { id: 'container', name: '貨櫃運輸', color: '#0ea5e9', description: '跨太平洋運費回升' },
      { id: 'nearshoring', name: '供應鏈重組', color: '#10b981', description: '近岸製造帶動亞洲航線需求' },
    ],
    companies: ['tw-2603', 'tw-2609', 'tw-2615'],
  },
  {
    id: 'defense',
    slug: 'defense',
    name: '國防軍工',
    nameEn: 'Defense',
    description: '台灣國防自主意識提升，無人機、雷達及通訊設備需求大幅增加。',
    icon: 'Shield',
    color: '#10b981',
    ytdReturn: 45.2,
    themes: [
      { id: 'drone', name: '無人機系統', color: '#10b981', description: '軍用及商業無人機需求' },
      { id: 'radar', name: '雷達通訊', color: '#f59e0b', description: '國防電子系統升級' },
      { id: 'cybersec', name: '資安防護', color: '#ef4444', description: '關鍵基礎設施資安需求' },
    ],
    companies: ['tw-2345', 'tw-2404'],
  },
  {
    id: 'cpo',
    slug: 'cpo',
    name: 'CPO光學',
    nameEn: 'CPO / Silicon Photonics',
    description: '共同封裝光學(CPO)及矽光子技術，解決AI資料中心高速互連瓶頸。',
    icon: 'Zap',
    color: '#f59e0b',
    ytdReturn: 62.8,
    themes: [
      { id: 'cpo-tech', name: '共同封裝光學', color: '#f59e0b', description: '800G/1.6T光電整合技術' },
      { id: 'silicon-photonics', name: '矽光子', color: '#8b5cf6', description: '低功耗高頻寬光學互連' },
    ],
    companies: ['tw-3008'],
  },
  {
    id: 'finance',
    slug: 'finance',
    name: '金融',
    nameEn: 'Finance',
    description: '台灣金控、銀行、保險，受惠升息環境及金融科技數位轉型。',
    icon: 'TrendingUp',
    color: '#6366f1',
    ytdReturn: 8.4,
    themes: [
      { id: 'fintech', name: '金融科技', color: '#6366f1', description: '數位銀行及支付平台' },
    ],
    companies: ['tw-2891', 'tw-2881'],
  },
];

export function getIndustryBySlug(slug: string): IndustrySector | undefined {
  return industries.find(i => i.slug === slug);
}
