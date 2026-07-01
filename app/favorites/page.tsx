"use client";

import { Heart, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { stocks } from "@/lib/data";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, PageHeader } from "@/components/ui";
import { StockRow } from "@/components/stock-row";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();
  const [query, setQuery] = useState("");
  const favoriteStocks = stocks.filter((stock) => favorites.includes(stock.symbol) && `${stock.name} ${stock.symbol}`.includes(query));

  return (
    <>
      <PageHeader title="الأسهم المفضلة" description="راقب الأسهم التي تهمك في مكان واحد" action={<span className="count-badge"><Heart fill="currentColor" /> {favorites.length} أسهم</span>} />
      <Card className="favorites-panel">
        <div className="favorites-head"><label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث في المفضلة..." /></label><span><Sparkles /> يتم حفظ اختياراتك تلقائياً على هذا الجهاز</span></div>
        <div className="favorites-grid">
          {ready && favoriteStocks.map((stock) => <Card className="favorite-stock-card" key={stock.symbol}><StockRow stock={stock} /><div className="favorite-metrics"><span><small>التوصية الذكية</small><strong>{stock.recommendation}</strong></span><span><small>درجة الثقة</small><strong>{stock.confidence}%</strong></span><span><small>القيمة السوقية</small><strong>{stock.marketCap}</strong></span></div></Card>)}
        </div>
        {ready && !favoriteStocks.length && <div className="empty-state"><Heart /><h3>لا توجد أسهم مفضلة هنا</h3><p>أضف الأسهم من لوحة السوق لتظهر في هذه القائمة.</p></div>}
      </Card>
    </>
  );
}
