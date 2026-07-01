export type Impact = "إيجابي" | "محايد" | "سلبي";

export interface Stock {
  symbol: string;
  name: string;
  englishName: string;
  sector: string;
  price: number;
  change: number;
  changeValue: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: string;
  marketCap: string;
  recommendation: string;
  confidence: number;
  logo: string;
}

export interface News {
  id: string;
  stock: string;
  source: string;
  time: string;
  headline: string;
  summary: string;
  analysis: string;
  impact: Impact;
  confidence: number;
  reason: string;
}
