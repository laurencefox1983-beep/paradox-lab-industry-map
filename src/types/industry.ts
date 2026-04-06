export interface InvestmentTheme {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface IndustrySector {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  themes: InvestmentTheme[];
  companies: string[];
  ytdReturn: number;
  color: string;
}
