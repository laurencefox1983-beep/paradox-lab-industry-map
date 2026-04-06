import { Market } from './stock';

export type NewsCategory = 'MACRO' | 'SECTOR' | 'COMPANY' | 'EARNINGS' | 'POLICY';
export type NewsSentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  market: Market[];
  sector: string | null;
  relatedTickers: string[];
  sentiment: NewsSentiment;
  category: NewsCategory;
  imageUrl?: string;
}
