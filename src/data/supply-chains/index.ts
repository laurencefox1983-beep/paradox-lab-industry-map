import { SupplyChain } from '@/types/supply-chain';

export const supplyChains: SupplyChain[] = [
  {
    id: 'tsmc-chain',
    focalCompanyId: 'tw-2330',
    focalTicker: '2330',
    title: '台積電供應鏈',
    description: '台積電作為全球最先進的晶圓代工廠，其供應鏈涵蓋上游設備材料、客戶設計，及下游封測組裝。',
    nodes: [
      // Upstream - Equipment
      { id: 'asml', stockId: 'us-asml', ticker: 'ASML', name: '艾司摩爾', nameEn: 'ASML', tier: 'upstream', category: '光刻設備', description: 'EUV光刻機唯一供應商', marketCap: 2680, priceChangePct: 1.25 },
      { id: 'amat', stockId: 'us-amat', ticker: 'AMAT', name: '應用材料', nameEn: 'Applied Materials', tier: 'upstream', category: '薄膜沉積設備', description: 'CVD/PVD設備龍頭', marketCap: 1420, priceChangePct: 1.53 },
      { id: 'lrcx', stockId: 'us-lrcx', ticker: 'LRCX', name: '科林研發', nameEn: 'Lam Research', tier: 'upstream', category: '蝕刻清洗設備', description: '蝕刻設備全球第二', marketCap: 980, priceChangePct: 1.48 },
      { id: 'disco', stockId: 'jp-6146', ticker: '6146', name: '迪斯科', nameEn: 'Disco', tier: 'upstream', category: '切割磨削設備', description: '晶圓切割設備龍頭', marketCap: 380, priceChangePct: 2.88 },
      // Upstream - Materials
      { id: 'shinetsu', stockId: 'jp-4063', ticker: '4063', name: '信越化學', nameEn: 'Shin-Etsu', tier: 'upstream', category: '矽晶圓', description: '矽晶圓全球市佔超30%', marketCap: 920, priceChangePct: 1.52 },
      // Focal
      { id: 'tsmc', stockId: 'tw-2330', ticker: '2330', name: '台積電', nameEn: 'TSMC', tier: 'focal', category: '晶圓代工', description: '全球最先進晶圓代工廠', marketCap: 18500, priceChangePct: 1.59 },
      // Downstream - Design customers
      { id: 'nvda', stockId: 'us-nvda', ticker: 'NVDA', name: '輝達', nameEn: 'NVIDIA', tier: 'downstream', category: 'AI GPU設計', description: 'H100/B100 GPU委外代工', marketCap: 32000, priceChangePct: 3.75 },
      { id: 'amd', stockId: 'us-amd', ticker: 'AMD', name: 'AMD', nameEn: 'AMD', tier: 'downstream', category: 'CPU/GPU設計', description: 'EPYC/MI300X委外代工', marketCap: 6800, priceChangePct: 2.49 },
      { id: 'arm', stockId: 'us-arm', ticker: 'ARM', name: 'ARM控股', nameEn: 'ARM', tier: 'downstream', category: '晶片架構授權', description: 'AI晶片架構主流選擇', marketCap: 1580, priceChangePct: 3.60 },
      { id: 'mtk', stockId: 'tw-2454', ticker: '2454', name: '聯發科', nameEn: 'MediaTek', tier: 'downstream', category: '手機/AIoT晶片', description: 'AI手機晶片委外代工', marketCap: 1350, priceChangePct: -1.68 },
      { id: 'avgo', stockId: 'us-avgo', ticker: 'AVGO', name: '博通', nameEn: 'Broadcom', tier: 'downstream', category: '自定義AI晶片', description: 'Google XPU委外代工', marketCap: 9800, priceChangePct: 1.72 },
      // Customer
      { id: 'ase', stockId: 'tw-3711', ticker: '3711', name: '日月光投控', nameEn: 'ASE', tier: 'customer', category: 'IC封測', description: 'CoWoS先進封裝主力廠', marketCap: 680, priceChangePct: 1.62 },
      { id: 'quanta', stockId: 'tw-2382', ticker: '2382', name: '廣達電腦', nameEn: 'Quanta', tier: 'customer', category: 'AI伺服器組裝', description: '整機伺服器代工廠', marketCap: 780, priceChangePct: 2.97 },
    ],
    edges: [
      { id: 'e1', source: 'asml', target: 'tsmc', relation: 'supplies', label: 'EUV光刻機' },
      { id: 'e2', source: 'amat', target: 'tsmc', relation: 'supplies', label: '薄膜沉積設備' },
      { id: 'e3', source: 'lrcx', target: 'tsmc', relation: 'supplies', label: '蝕刻設備' },
      { id: 'e4', source: 'disco', target: 'tsmc', relation: 'supplies', label: '切割設備' },
      { id: 'e5', source: 'shinetsu', target: 'tsmc', relation: 'supplies', label: '矽晶圓' },
      { id: 'e6', source: 'tsmc', target: 'nvda', relation: 'manufactures', label: 'N3/N4 GPU製造', animated: true },
      { id: 'e7', source: 'tsmc', target: 'amd', relation: 'manufactures', label: 'N3晶片製造', animated: true },
      { id: 'e8', source: 'tsmc', target: 'mtk', relation: 'manufactures', label: 'N4晶片製造', animated: true },
      { id: 'e9', source: 'tsmc', target: 'avgo', relation: 'manufactures', label: 'N3 XPU製造', animated: true },
      { id: 'e10', source: 'arm', target: 'mtk', relation: 'designs', label: 'ARM架構授權' },
      { id: 'e11', source: 'arm', target: 'avgo', relation: 'designs', label: 'ARM架構授權' },
      { id: 'e12', source: 'nvda', target: 'ase', relation: 'distributes', label: 'CoWoS封裝' },
      { id: 'e13', source: 'nvda', target: 'quanta', relation: 'distributes', label: 'AI伺服器整機' },
    ],
  },
  {
    id: 'nvidia-chain',
    focalCompanyId: 'us-nvda',
    focalTicker: 'NVDA',
    title: 'NVIDIA AI伺服器供應鏈',
    description: 'NVIDIA作為AI GPU霸主，供應鏈涵蓋台灣多家伺服器及零組件廠商。',
    nodes: [
      { id: 'tsmc-n', stockId: 'tw-2330', ticker: '2330', name: '台積電', nameEn: 'TSMC', tier: 'upstream', category: 'GPU晶片代工', description: 'H100/B100 GPU晶圓製造', marketCap: 18500, priceChangePct: 1.59 },
      { id: 'ase-n', stockId: 'tw-3711', ticker: '3711', name: '日月光投控', nameEn: 'ASE', tier: 'upstream', category: 'CoWoS封裝', description: 'HBM+GPU異質整合封裝', marketCap: 680, priceChangePct: 1.62 },
      { id: 'mu-n', stockId: 'us-mu', ticker: 'MU', name: '美光科技', nameEn: 'Micron', tier: 'upstream', category: 'HBM記憶體', description: 'HBM3E高頻寬記憶體', marketCap: 1020, priceChangePct: 3.59 },
      { id: 'delta-n', stockId: 'tw-2308', ticker: '2308', name: '台達電', nameEn: 'Delta', tier: 'upstream', category: '電源供應器', description: '高效率伺服器電源', marketCap: 920, priceChangePct: -1.23 },
      { id: 'nvda-n', stockId: 'us-nvda', ticker: 'NVDA', name: '輝達', nameEn: 'NVIDIA', tier: 'focal', category: 'AI加速器', description: 'GPU設計及AI生態系', marketCap: 32000, priceChangePct: 3.75 },
      { id: 'quanta-n', stockId: 'tw-2382', ticker: '2382', name: '廣達電腦', nameEn: 'Quanta', tier: 'downstream', category: 'DGX系統代工', description: 'NVL72超級電腦代工', marketCap: 780, priceChangePct: 2.97 },
      { id: 'wiwynn-n', stockId: 'tw-6669', ticker: '6669', name: '緯穎', nameEn: 'Wiwynn', tier: 'downstream', category: 'CSP客製伺服器', description: 'Meta/MS AI伺服器', marketCap: 580, priceChangePct: 2.49 },
      { id: 'giga-n', stockId: 'tw-2376', ticker: '2376', name: '技嘉', nameEn: 'GIGABYTE', tier: 'downstream', category: 'GPU伺服器系統', description: 'H100/H200伺服器整機', marketCap: 160, priceChangePct: 1.96 },
      { id: 'accton-n', stockId: 'tw-2345', ticker: '2345', name: '智邦', nameEn: 'Accton', tier: 'downstream', category: '網路交換器', description: 'NVLink Switch網路', marketCap: 185, priceChangePct: 2.11 },
    ],
    edges: [
      { id: 'ne1', source: 'tsmc-n', target: 'nvda-n', relation: 'manufactures', label: 'GPU晶圓代工', animated: true },
      { id: 'ne2', source: 'ase-n', target: 'nvda-n', relation: 'manufactures', label: 'CoWoS封裝' },
      { id: 'ne3', source: 'mu-n', target: 'nvda-n', relation: 'supplies', label: 'HBM3E記憶體' },
      { id: 'ne4', source: 'delta-n', target: 'quanta-n', relation: 'supplies', label: '伺服器電源' },
      { id: 'ne5', source: 'nvda-n', target: 'quanta-n', relation: 'distributes', label: 'DGX系統授權', animated: true },
      { id: 'ne6', source: 'nvda-n', target: 'wiwynn-n', relation: 'distributes', label: 'GPU模組供應', animated: true },
      { id: 'ne7', source: 'nvda-n', target: 'giga-n', relation: 'distributes', label: 'GPU卡供應', animated: true },
      { id: 'ne8', source: 'accton-n', target: 'quanta-n', relation: 'supplies', label: '機架交換器' },
    ],
  },
];

export function getSupplyChainByTicker(ticker: string): SupplyChain | undefined {
  return supplyChains.find(c => c.focalTicker === ticker);
}

export function getSupplyChainById(id: string): SupplyChain | undefined {
  return supplyChains.find(c => c.id === id);
}
