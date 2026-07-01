import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="محلل الأسهم الذكي">
      <span className="brand-mark"><BarChart3 size={24} /></span>
      {!compact && (
        <span>
          <strong>محلل الأسهم الذكي</strong>
          <small>Smart Stock Analyzer</small>
        </span>
      )}
    </Link>
  );
}
