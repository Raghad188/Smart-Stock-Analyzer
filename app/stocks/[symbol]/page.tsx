import { notFound } from "next/navigation";
import { stocks } from "@/lib/data";
import { StockDetails } from "@/components/stock-details";

export function generateStaticParams() {
  return stocks.map((stock) => ({ symbol: stock.symbol }));
}

export default async function StockPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const stock = stocks.find((item) => item.symbol === symbol);
  if (!stock) notFound();
  return <StockDetails stock={stock} />;
}
