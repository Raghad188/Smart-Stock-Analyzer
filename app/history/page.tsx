"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, CalendarDays, CheckCircle2, Clock3, Download, Search, SlidersHorizontal } from "lucide-react";
import { history } from "@/lib/data";
import { Card, ImpactBadge, PageHeader } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");
  const [newest, setNewest] = useState(true);
  const { showToast } = useToast();
  const filtered = useMemo(() => history.filter((item) => (filter === "الكل" || item.prediction === filter) && `${item.stock} ${item.company}`.toLowerCase().includes(query.toLowerCase())), [query, filter]);
  const displayed = newest ? filtered : [...filtered].reverse();

  return (
    <>
      <PageHeader title="سجل التحليلات" description="راجع التوقعات السابقة وقِس أداء المحرك الذكي" action={<button className="secondary-button" onClick={() => showToast("تم تجهيز تقرير العرض التجريبي")}><Download /> تصدير التقرير</button>} />
      <div className="history-stats">
        <Card><span className="stat-icon blue"><Clock3 /></span><div><small>إجمالي التحليلات</small><strong>128</strong></div></Card>
        <Card><span className="stat-icon green"><CheckCircle2 /></span><div><small>توقعات تحققت</small><strong>87%</strong></div></Card>
        <Card><span className="stat-icon purple"><CalendarDays /></span><div><small>هذا الأسبوع</small><strong>24</strong></div></Card>
      </div>
      <Card className="history-panel">
        <div className="history-toolbar">
          <label className="toolbar-search"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن شركة أو سهم..." /></label>
          <div className="filter-tabs"><SlidersHorizontal size={17} />{["الكل", "إيجابي", "محايد", "سلبي"].map((value) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{value}</button>)}</div>
          <button className="sort-button" onClick={() => setNewest(!newest)}><ArrowDownUp /> {newest ? "الأحدث أولاً" : "الأقدم أولاً"}</button>
        </div>
        <div className="history-table">
          <div className="table-head"><span>السهم / الشركة</span><span>التاريخ</span><span>التوقع</span><span>الثقة</span><span>النتيجة</span></div>
          {displayed.map((item) => (
            <div className="table-row" key={item.id}>
              <div><span className="stock-logo">{item.stock[0]}</span><span><strong>{item.stock}</strong><small>{item.company}</small></span></div>
              <span>{item.date}</span>
              <ImpactBadge impact={item.prediction} />
              <div className="mini-confidence"><span><i style={{ width: `${item.confidence}%` }} /></span><strong>{item.confidence}%</strong></div>
              <span className={item.result.includes("تحقق") ? "result-success" : "result-pending"}>{item.result}</span>
            </div>
          ))}
        </div>
        {!displayed.length && <div className="empty-state"><Search /><h3>لا توجد نتائج</h3><p>جرّب تغيير عبارة البحث أو الفلتر.</p></div>}
      </Card>
    </>
  );
}
