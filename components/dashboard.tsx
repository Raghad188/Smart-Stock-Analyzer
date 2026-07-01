"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Bot, CircleDollarSign, Newspaper, Search, Sparkles, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { Card, ImpactBadge, SectionTitle } from "./ui";
import { MarketAreaChart, SectorBarChart } from "./charts";
import { news, stocks } from "@/lib/data";
import { StockRow } from "./stock-row";

export function Dashboard() {
  const [query, setQuery] = useState("");
  const filtered = stocks.filter((stock) => `${stock.name} ${stock.englishName} ${stock.symbol}`.toLowerCase().includes(query.toLowerCase()));
  const gainers = [...stocks].sort((a, b) => b.change - a.change).slice(0, 3);
  const losers = [...stocks].sort((a, b) => a.change - b.change).slice(0, 3);

  return (
    <>
      <div className="dashboard-greeting">
        <div><span>الأربعاء، 1 يوليو 2026</span><h1>مرحباً بك في نبض السوق <em>✦</em></h1><p>نحوّل أخبار السوق السعودي إلى قرارات أوضح، في لحظتها.</p></div>
        <Link href="/analysis" className="primary-button"><Sparkles size={18} /> حلّل خبراً الآن</Link>
      </div>

      <div className="dashboard-search">
        <Search size={20} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم الشركة أو رمز السهم..." />
        <span>مدعوم بالذكاء الاصطناعي <Bot size={16} /></span>
        {query && (
          <div className="search-results">
            {filtered.length ? filtered.map((stock) => <StockRow key={stock.symbol} stock={stock} />) : <p>لا توجد نتائج مطابقة.</p>}
          </div>
        )}
      </div>

      <div className="stats-grid">
        <Card className="stat-card" delay={0.02}><span className="stat-icon blue"><CircleDollarSign /></span><div><small>المؤشر العام (تاسي)</small><strong>11,924.32</strong><em className="up"><TrendingUp /> +1.25%</em></div><i>+147.26 نقطة</i></Card>
        <Card className="stat-card" delay={0.06}><span className="stat-icon green"><TrendingUp /></span><div><small>الشركات المرتفعة</small><strong>143</strong><em className="up">68% من السوق</em></div></Card>
        <Card className="stat-card" delay={0.1}><span className="stat-icon red"><TrendingDown /></span><div><small>الشركات المنخفضة</small><strong>67</strong><em className="down">32% من السوق</em></div></Card>
        <Card className="stat-card" delay={0.14}><span className="stat-icon purple"><Zap /></span><div><small>قيمة التداول</small><strong>7.84B</strong><em>318.5M سهم</em></div></Card>
      </div>

      <div className="dashboard-grid">
        <Card className="market-chart-card">
          <SectionTitle title="أداء السوق اليوم" subtitle="المؤشر العام للسوق السعودي" action={<div className="range-tabs"><button className="active">يوم</button><button>أسبوع</button><button>شهر</button></div>} />
          <div className="chart-highlight"><strong>11,924.32</strong><span className="up"><ArrowUpLeft /> +1.25%</span></div>
          <MarketAreaChart />
        </Card>
        <Card className="ai-insight-card">
          <div className="ai-orbit"><Bot /><span /></div>
          <small><Sparkles size={14} /> قراءة الذكاء الاصطناعي</small>
          <h2>زخم السوق <span>إيجابي</span></h2>
          <p>ارتفاع السيولة في قطاعي البنوك والطاقة يعزز احتمالية استمرار الاتجاه الصاعد خلال الجلسة.</p>
          <div className="confidence-row"><span>درجة الثقة</span><strong>87%</strong></div>
          <div className="confidence-bar"><i style={{ width: "87%" }} /></div>
          <Link href="/analysis">عرض التحليل الكامل <ArrowLeft size={16} /></Link>
        </Card>
      </div>

      <div className="dashboard-grid lower">
        <Card>
          <SectionTitle title="الأسهم الأكثر نشاطاً" subtitle="تحديث مباشر للأسعار" action={<Link href="/favorites" className="text-link">عرض الكل <ArrowLeft size={15} /></Link>} />
          <div className="stocks-table">{stocks.slice(0, 5).map((stock, i) => <StockRow key={stock.symbol} stock={stock} rank={i + 1} />)}</div>
        </Card>
        <Card>
          <SectionTitle title="أداء القطاعات" subtitle="نسبة التغير اليومي" />
          <SectorBarChart />
          <div className="sector-note"><span className="up"><TrendingUp size={16} /> الأفضل: البنوك +2.1%</span><span className="down"><TrendingDown size={16} /> الأضعف: المواد -0.6%</span></div>
        </Card>
      </div>

      <div className="dashboard-grid lower">
        <Card>
          <SectionTitle title="أحدث الأخبار وتحليلها" subtitle="مختارة بواسطة محركنا الذكي" action={<Link href="/analysis" className="text-link">جميع الأخبار <ArrowLeft size={15} /></Link>} />
          <div className="news-list">
            {news.slice(0, 3).map((item) => (
              <Link href={`/analysis?news=${item.id}`} className="news-item" key={item.id}>
                <span className="news-icon"><Newspaper /></span>
                <div><div><small>{item.source} · {item.time}</small><ImpactBadge impact={item.impact} /></div><h3>{item.headline}</h3><p>{item.summary}</p></div>
              </Link>
            ))}
          </div>
        </Card>
        <div className="movers-stack">
          <Card>
            <SectionTitle title="الأكثر ارتفاعاً" />
            {gainers.map((stock) => <StockRow key={stock.symbol} stock={stock} />)}
          </Card>
          <Card>
            <SectionTitle title="الأكثر انخفاضاً" />
            {losers.map((stock) => <StockRow key={stock.symbol} stock={stock} />)}
          </Card>
        </div>
      </div>
      <p className="demo-disclaimer">البيانات المعروضة تجريبية لأغراض الهاكاثون ولا تُعد توصية استثمارية.</p>
    </>
  );
}
