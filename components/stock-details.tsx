"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Bot, Calendar, Heart, Newspaper, Share2, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Stock } from "@/lib/types";
import { news, stockSeries } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Card, ImpactBadge, SectionTitle } from "./ui";
import { MarketAreaChart } from "./charts";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

export function StockDetails({ stock }: { stock: Stock }) {
  const [range, setRange] = useState("1D");
  const [analyzing, setAnalyzing] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const positive = stock.change >= 0;
  const related = news.filter((item) => item.stock === stock.symbol);

  function analyze() {
    setAnalyzing(true);
    window.setTimeout(() => {
      setAnalyzing(false);
      showToast(`اكتمل التحليل الذكي لسهم ${stock.name}`);
    }, 1300);
  }

  return (
    <>
      <div className="stock-page-head">
        <Link href="/" className="back-link"><ArrowRight /> العودة للسوق</Link>
        <div><button onClick={() => showToast("تم نسخ رابط السهم")}><Share2 /></button><button className={isFavorite(stock.symbol) ? "active" : ""} onClick={() => { toggleFavorite(stock.symbol); showToast(isFavorite(stock.symbol) ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة"); }}><Heart fill={isFavorite(stock.symbol) ? "currentColor" : "none"} /></button></div>
      </div>
      <Card className="stock-summary">
        <div className="stock-title"><span className="stock-logo large">{stock.logo}</span><div><small>{stock.englishName} · {stock.symbol}</small><h1>{stock.name}</h1><span>{stock.sector} · تداول السعودية</span></div></div>
        <div className="stock-live-price"><small><i /> السوق مفتوح</small><strong>{formatPrice(stock.price)} <em>ر.س</em></strong><span className={positive ? "up" : "down"}>{positive ? <ArrowUpRight /> : <ArrowDownLeft />}{positive ? "+" : ""}{stock.changeValue.toFixed(2)} ({positive ? "+" : ""}{stock.change}%) اليوم</span></div>
      </Card>
      <div className="stock-details-grid">
        <Card className="stock-chart">
          <SectionTitle title="حركة السعر" action={<div className="range-tabs">{["1D", "1W", "1M", "3M", "1Y"].map((value) => <button className={range === value ? "active" : ""} onClick={() => setRange(value)} key={value}>{value}</button>)}</div>} />
          <MarketAreaChart data={stockSeries(stock)} />
          <div className="ohlc-grid">
            {[["الافتتاح", stock.open], ["الأعلى", stock.high], ["الأدنى", stock.low], ["الإغلاق", stock.close]].map(([label, value]) => <div key={label as string}><small>{label}</small><strong>{formatPrice(value as number)}</strong></div>)}
          </div>
        </Card>
        <div className="stock-side">
          <Card className="ai-recommendation">
            <span className="panel-icon"><Bot /></span><small><Sparkles /> توصية الذكاء الاصطناعي</small><h2>{stock.recommendation}</h2>
            <div className="recommendation-score"><span style={{ "--score": `${stock.confidence * 3.6}deg` } as React.CSSProperties}><strong>{stock.confidence}%</strong></span><p>ثقة مرتفعة مبنية على حركة السعر، زخم القطاع، وآخر الأخبار.</p></div>
            <button className="primary-button" onClick={analyze} disabled={analyzing}>{analyzing ? <><span className="spinner" /> جارٍ التحليل...</> : <><Bot /> تحليل السهم بالذكاء الاصطناعي</>}</button>
          </Card>
          <Card className="key-stats">
            <SectionTitle title="بيانات أساسية" />
            <div><span>حجم التداول</span><strong>{stock.volume}</strong></div><div><span>القيمة السوقية</span><strong>{stock.marketCap}</strong></div><div><span>نطاق اليوم</span><strong>{stock.low} — {stock.high}</strong></div><div><span>آخر تحديث</span><strong>الآن</strong></div>
          </Card>
        </div>
      </div>
      <div className="stock-news">
        <SectionTitle title="آخر الأخبار المرتبطة" subtitle={`أخبار وتحليلات ${stock.name}`} />
        <div className="news-card-grid">
          {(related.length ? related : news.slice(0, 2)).map((item) => <Card key={item.id}><div><span className="news-icon"><Newspaper /></span><ImpactBadge impact={item.impact} /></div><small><Calendar /> {item.time} · {item.source}</small><h3>{item.headline}</h3><p>{item.summary}</p><Link href={`/analysis?news=${item.id}`}>عرض التحليل <ArrowRight /></Link></Card>)}
        </div>
      </div>
    </>
  );
}
