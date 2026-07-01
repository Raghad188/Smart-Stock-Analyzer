"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, Heart } from "lucide-react";
import type { Stock } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";

export function StockRow({ stock, rank }: { stock: Stock; rank?: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const positive = stock.change >= 0;

  function handleFavorite() {
    const adding = !isFavorite(stock.symbol);
    toggleFavorite(stock.symbol);
    showToast(adding ? `تمت إضافة ${stock.name} إلى المفضلة` : `تمت إزالة ${stock.name} من المفضلة`);
  }

  return (
    <div className="stock-row">
      {rank && <span className="rank">{rank}</span>}
      <Link href={`/stocks/${stock.symbol}`} className="stock-identity">
        <span className="stock-logo">{stock.logo}</span>
        <span><strong>{stock.name}</strong><small>{stock.symbol} · {stock.sector}</small></span>
      </Link>
      <div className="stock-price"><strong>{formatPrice(stock.price)} <small>ر.س</small></strong><span className={positive ? "up" : "down"}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}{Math.abs(stock.change)}%</span></div>
      <button onClick={handleFavorite} className={isFavorite(stock.symbol) ? "favorite active" : "favorite"} aria-label="المفضلة"><Heart size={17} fill={isFavorite(stock.symbol) ? "currentColor" : "none"} /></button>
    </div>
  );
}
