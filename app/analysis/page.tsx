"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, BrainCircuit, Check, ChevronLeft, CircleDot, Newspaper, Search, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { news, stocks } from "@/lib/data";
import { Card, ImpactBadge, PageHeader } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

function AnalysisContent() {
  const params = useSearchParams();
  const initialId = params.get("news") || news[0].id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [customDone, setCustomDone] = useState(false);
  const { showToast } = useToast();
  const item = news.find((entry) => entry.id === selectedId) || news[0];
  const stock = stocks.find((entry) => entry.symbol === item.stock)!;
  const filtered = useMemo(() => news.filter((entry) => entry.headline.includes(query) || entry.source.includes(query)), [query]);

  function runAnalysis() {
    setAnalyzing(true);
    setCustomDone(false);
    window.setTimeout(() => {
      setAnalyzing(false);
      setCustomDone(true);
      showToast("اكتمل تحليل الخبر بنجاح");
    }, 1500);
  }

  return (
    <>
      <PageHeader title="تحليل الأخبار بالذكاء الاصطناعي" description="افهم أثر الخبر قبل أن ينعكس على حركة السوق" action={<span className="engine-status"><i /> المحرك يعمل لحظياً</span>} />
      <div className="analysis-layout">
        <div className="analysis-feed">
          <Card className="custom-analysis">
            <span className="panel-icon"><BrainCircuit /></span>
            <div><h2>لديك خبر تريد تحليله؟</h2><p>الصق عنوان الخبر أو نصه، وسيحلل المحرك نبرته وتأثيره المتوقع.</p></div>
            <button onClick={runAnalysis} disabled={analyzing} className="primary-button">{analyzing ? <><span className="spinner" /> جارٍ التحليل...</> : <><Sparkles size={17} /> تحليل سريع</>}</button>
            {customDone && <div className="quick-result"><Check /> تم التحليل: النبرة إيجابية بثقة 88%</div>}
          </Card>
          <div className="feed-head"><div><h2>تدفق الأخبار</h2><span>{filtered.length} أخبار مختارة</span></div><label><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="بحث في الأخبار" /></label></div>
          {filtered.map((entry) => (
            <button className={`feed-card ${selectedId === entry.id ? "selected" : ""}`} onClick={() => setSelectedId(entry.id)} key={entry.id}>
              <span className="feed-icon"><Newspaper /></span>
              <div><small>{entry.source} · {entry.time}</small><h3>{entry.headline}</h3><p>{entry.summary}</p><div><ImpactBadge impact={entry.impact} /><span>ثقة {entry.confidence}%</span></div></div>
              <ChevronLeft />
            </button>
          ))}
        </div>

        <Card className="analysis-result">
          <div className="result-head"><div><span className="stock-logo">{stock.logo}</span><div><small>{stock.symbol} · {stock.englishName}</small><h2>{stock.name}</h2></div></div><ImpactBadge impact={item.impact} /></div>
          <div className="article-meta"><span>{item.source}</span><i /> <span>{item.time}</span></div>
          <h1>{item.headline}</h1>
          <p className="article-summary">{item.summary}</p>
          <div className="ai-analysis-block"><span><Bot /></span><div><small>التحليل المولّد بالذكاء الاصطناعي</small><p>{item.analysis}</p></div></div>
          <div className="impact-meter">
            <div className="meter-title"><span>الأثر المتوقع على السهم</span><strong className={item.impact === "سلبي" ? "down" : item.impact === "محايد" ? "neutral-text" : "up"}>{item.impact === "سلبي" ? <TrendingDown /> : <TrendingUp />}{item.impact}</strong></div>
            <div className="spectrum"><i style={{ right: `${item.impact === "إيجابي" ? 82 : item.impact === "سلبي" ? 18 : 50}%` }} /></div>
            <div className="spectrum-labels"><span>سلبي</span><span>محايد</span><span>إيجابي</span></div>
          </div>
          <div className="confidence-circle" style={{ "--confidence": `${item.confidence * 3.6}deg` } as React.CSSProperties}><div><strong>{item.confidence}%</strong><small>درجة الثقة</small></div></div>
          <div className="reason-card"><CircleDot /><div><strong>لماذا هذا التوقع؟</strong><p>{item.reason}</p></div></div>
          <div className="analysis-actions"><Link href={`/stocks/${stock.symbol}`} className="primary-button">عرض تفاصيل السهم <ArrowLeft /></Link><button onClick={() => showToast("تم حفظ التحليل في السجل")}><Check /> حفظ التحليل</button></div>
          <p className="analysis-note">هذا تحليل تجريبي مولّد آلياً ولا يُعد توصية استثمارية.</p>
        </Card>
      </div>
    </>
  );
}

export default function AnalysisPage() {
  return <Suspense><AnalysisContent /></Suspense>;
}
