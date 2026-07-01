import stocksJson from "@/data/stocks.json";
import newsJson from "@/data/news.json";
import historyJson from "@/data/history.json";
import type { News, Stock } from "./types";

export const stocks = stocksJson as Stock[];
export const news = newsJson as News[];
export const history = historyJson;

export const priceSeries = [
  { time: "10:00", price: 11762, volume: 42 },
  { time: "10:30", price: 11791, volume: 54 },
  { time: "11:00", price: 11783, volume: 47 },
  { time: "11:30", price: 11825, volume: 62 },
  { time: "12:00", price: 11816, volume: 51 },
  { time: "12:30", price: 11864, volume: 73 },
  { time: "13:00", price: 11853, volume: 58 },
  { time: "13:30", price: 11892, volume: 68 },
  { time: "14:00", price: 11906, volume: 77 },
  { time: "14:30", price: 11898, volume: 64 },
  { time: "15:00", price: 11924, volume: 82 }
];

export function stockSeries(stock: Stock) {
  const factors = [-0.018, -0.011, -0.014, -0.004, 0.003, -0.001, 0.008, 0.004, 0.013, 0.009, stock.change / 100];
  return factors.map((factor, i) => ({
    time: `${10 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"}`,
    price: Number((stock.price / (1 + stock.change / 100) * (1 + factor)).toFixed(2))
  }));
}

export const marketSectors = [
  { name: "البنوك", value: 2.1 },
  { name: "الطاقة", value: 1.3 },
  { name: "الاتصالات", value: 0.8 },
  { name: "المواد", value: -0.6 },
  { name: "التجزئة", value: 1.1 }
];
