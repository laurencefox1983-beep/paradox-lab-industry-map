export type NodeTier = 'upstream' | 'focal' | 'downstream' | 'customer';
export type EdgeRelation = 'supplies' | 'manufactures' | 'designs' | 'distributes' | 'partners';

export interface ChainNode {
  id: string;
  stockId: string;
  ticker: string;
  name: string;
  nameEn: string;
  tier: NodeTier;
  category: string;
  description: string;
  marketCap: number;
  priceChangePct: number;
  position?: { x: number; y: number };
}

export interface ChainEdge {
  id: string;
  source: string;
  target: string;
  relation: EdgeRelation;
  label: string;
  animated?: boolean;
}

export interface SupplyChain {
  id: string;
  focalCompanyId: string;
  focalTicker: string;
  title: string;
  description: string;
  nodes: ChainNode[];
  edges: ChainEdge[];
}
