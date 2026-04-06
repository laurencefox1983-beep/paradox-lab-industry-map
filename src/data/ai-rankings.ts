import { Market, Signal } from '@/types/stock';

export interface AIRanking {
  rank: number;
  stockId: string;
  ticker: string;
  name: string;
  market: Market;
  sector: string;
  aiScore: number;
  signal: Signal;
  momentum: number;
  fundamentals: number;
  sentiment: number;
  technical: number;
  targetPrice: number;
  currentPrice: number;
  upside: number;
  aiComment: string;
}

export const aiRankings: AIRanking[] = [
  { rank: 1, stockId: 'us-nvda', ticker: 'NVDA', name: '輝達', market: 'US', sector: '半導體', aiScore: 96, signal: 'BUY', momentum: 95, fundamentals: 88, sentiment: 98, technical: 94, targetPrice: 185, currentPrice: 134.25, upside: 37.8, aiComment: 'Blackwell架構需求超出預期，資料中心營收持續爆發性成長，供應鏈瓶頸解除，上調目標價。' },
  { rank: 2, stockId: 'tw-2330', ticker: '2330', name: '台積電', market: 'TW', sector: '半導體', aiScore: 92, signal: 'BUY', momentum: 90, fundamentals: 94, sentiment: 92, technical: 91, targetPrice: 1180, currentPrice: 960, upside: 22.9, aiComment: 'CoWoS產能擴增帶動ASP提升，2nm製程如期量產，法說會後上修全年展望，外資持續買超。' },
  { rank: 3, stockId: 'us-avgo', ticker: 'AVGO', name: '博通', market: 'US', sector: '半導體', aiScore: 89, signal: 'BUY', momentum: 88, fundamentals: 92, sentiment: 86, technical: 88, targetPrice: 310, currentPrice: 248.6, upside: 24.7, aiComment: '自定義AI晶片(XPU)訂單能見度高，Google TPU及Meta MTIA均為主要客戶，軟體訂閱收入貢獻提升。' },
  { rank: 4, stockId: 'us-msft', ticker: 'MSFT', name: '微軟', market: 'US', sector: '科技', aiScore: 88, signal: 'BUY', momentum: 86, fundamentals: 90, sentiment: 88, technical: 86, targetPrice: 520, currentPrice: 415.6, upside: 25.1, aiComment: 'Azure AI成長加速，Copilot商業化超預期，OpenAI投資價值仍未完全反映，估值仍具吸引力。' },
  { rank: 5, stockId: 'us-arm', ticker: 'ARM', name: 'ARM控股', market: 'US', sector: '半導體', aiScore: 86, signal: 'BUY', momentum: 92, fundamentals: 72, sentiment: 90, technical: 88, targetPrice: 265, currentPrice: 195.6, upside: 35.5, aiComment: 'Armv9授權費率提升，AI晶片幾乎均採用ARM架構，授權及權利金雙引擎驅動高速成長。' },
  { rank: 6, stockId: 'us-meta', ticker: 'META', name: 'Meta', market: 'US', sector: '科技', aiScore: 86, signal: 'BUY', momentum: 84, fundamentals: 88, sentiment: 86, technical: 84, targetPrice: 820, currentPrice: 636.4, upside: 28.8, aiComment: '廣告AI精準投放ROI提升，Llama開源生態系建立競爭護城河，Reality Labs虧損趨勢收窄。' },
  { rank: 7, stockId: 'jp-6857', ticker: '6857', name: '愛德萬測試', market: 'JP', sector: '測試設備', aiScore: 84, signal: 'BUY', momentum: 86, fundamentals: 80, sentiment: 84, technical: 86, targetPrice: 11500, currentPrice: 8650, upside: 32.9, aiComment: 'HBM3E測試需求爆發，SSD及AI推論晶片測試訂單持續增加，訂單能見度已看到2027年。' },
  { rank: 8, stockId: 'us-googl', ticker: 'GOOGL', name: 'Alphabet', market: 'US', sector: '科技', aiScore: 84, signal: 'BUY', momentum: 80, fundamentals: 86, sentiment: 82, technical: 86, targetPrice: 228, currentPrice: 185.4, upside: 23.0, aiComment: 'Gemini 2.0模型競爭力大幅提升，Google Cloud AI工作負載高速成長，廣告市場份額守穩。' },
  { rank: 9, stockId: 'us-amd', ticker: 'AMD', name: 'AMD', market: 'US', sector: '半導體', aiScore: 82, signal: 'BUY', momentum: 84, fundamentals: 78, sentiment: 84, technical: 80, targetPrice: 155, currentPrice: 115.4, upside: 34.3, aiComment: 'MI300X AI加速器搶攻NVIDIA市佔，EPYC Turin伺服器CPU市佔率持續提升，估值折價明顯。' },
  { rank: 10, stockId: 'jp-6146', ticker: '6146', name: '迪斯科', market: 'JP', sector: '半導體設備', aiScore: 82, signal: 'BUY', momentum: 80, fundamentals: 82, sentiment: 82, technical: 84, targetPrice: 56000, currentPrice: 42800, upside: 30.8, aiComment: '先進封裝晶圓切割需求旺盛，CoWoS及HBM等3D封裝持續帶動設備採購，市場壟斷地位穩固。' },
  { rank: 11, stockId: 'us-asml', ticker: 'ASML', name: '艾司摩爾', market: 'US', sector: '半導體設備', aiScore: 84, signal: 'BUY', momentum: 80, fundamentals: 88, sentiment: 82, technical: 84, targetPrice: 900, currentPrice: 682.4, upside: 31.9, aiComment: 'High-NA EUV光刻機訂單超預期，2nm製程量產帶動設備密集採購，出口管制衝擊已充分反映。' },
  { rank: 12, stockId: 'tw-6669', ticker: '6669', name: '緯穎', market: 'TW', sector: 'AI伺服器', aiScore: 88, signal: 'BUY', momentum: 88, fundamentals: 84, sentiment: 90, technical: 88, targetPrice: 2450, currentPrice: 1850, upside: 32.4, aiComment: 'Meta及Microsoft雲端AI伺服器主要供應商，GB200 NVL72系統已進入量產，訂單能見度高。' },
  { rank: 13, stockId: 'tw-2382', ticker: '2382', name: '廣達電腦', market: 'TW', sector: 'AI伺服器', aiScore: 85, signal: 'BUY', momentum: 86, fundamentals: 82, sentiment: 86, technical: 84, targetPrice: 375, currentPrice: 295, upside: 27.1, aiComment: 'AI伺服器最大代工廠，NVIDIA DGX系統及Dell合作持續擴大，下半年出貨加速，毛利率改善。' },
  { rank: 14, stockId: 'tw-6415', ticker: '6415', name: '矽力-KY', market: 'TW', sector: '半導體', aiScore: 80, signal: 'BUY', momentum: 82, fundamentals: 78, sentiment: 78, technical: 82, targetPrice: 1650, currentPrice: 1280, upside: 28.9, aiComment: '電源管理IC滲透率提升，AI伺服器及電動車市場需求旺盛，中國市場市佔率持續擴大。' },
  { rank: 15, stockId: 'us-mu', ticker: 'MU', name: '美光科技', market: 'US', sector: '半導體', aiScore: 78, signal: 'BUY', momentum: 78, fundamentals: 76, sentiment: 80, technical: 78, targetPrice: 130, currentPrice: 92.4, upside: 40.7, aiComment: 'HBM3E大量出貨驅動ASP及毛利率大幅改善，HBM4開始出樣，AI記憶體市場需求持續強勁。' },
  { rank: 16, stockId: 'tw-2345', ticker: '2345', name: '智邦', market: 'TW', sector: '網路設備', aiScore: 82, signal: 'BUY', momentum: 84, fundamentals: 78, sentiment: 82, technical: 82, targetPrice: 740, currentPrice: 580, upside: 27.6, aiComment: 'AI資料中心400G/800G交換器需求旺盛，台灣國防網路建設也帶來新商機，法說會上修展望。' },
  { rank: 17, stockId: 'tw-3711', ticker: '3711', name: '日月光投控', market: 'TW', sector: '半導體', aiScore: 74, signal: 'BUY', momentum: 76, fundamentals: 74, sentiment: 72, technical: 74, targetPrice: 168, currentPrice: 132, upside: 27.3, aiComment: 'CoWoS先進封裝產能全滿，SiP及先進封裝佔比提升帶動毛利率改善，全年獲利創歷史新高可期。' },
  { rank: 18, stockId: 'tw-2376', ticker: '2376', name: '技嘉', market: 'TW', sector: '電腦設備', aiScore: 72, signal: 'BUY', momentum: 74, fundamentals: 68, sentiment: 72, technical: 74, targetPrice: 465, currentPrice: 365, upside: 27.4, aiComment: 'H100/H200/B200 GPU伺服器系統出貨量快速成長，主機板業務AI升級需求也同步受惠。' },
  { rank: 19, stockId: 'tw-2404', ticker: '2404', name: '漢唐', market: 'TW', sector: '機電工程', aiScore: 76, signal: 'BUY', momentum: 78, fundamentals: 74, sentiment: 76, technical: 76, targetPrice: 345, currentPrice: 268, upside: 28.7, aiComment: '台積電2nm廠擴建帶動廠務工程需求，美國鳳凰城廠也有大量工程合約，訂單能見度超過2年。' },
  { rank: 20, stockId: 'us-amzn', ticker: 'AMZN', name: '亞馬遜', market: 'US', sector: '科技', aiScore: 85, signal: 'BUY', momentum: 84, fundamentals: 86, sentiment: 84, technical: 84, targetPrice: 275, currentPrice: 215.8, upside: 27.4, aiComment: 'AWS AI服務高速成長，Trainium2自研晶片降低GPU採購成本，電商廣告業務AI賦能效益顯現。' },
];
