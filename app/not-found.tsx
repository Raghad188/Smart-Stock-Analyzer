import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return <div className="not-found"><SearchX /><h1>لم نجد هذه الصفحة</h1><p>ربما تغير الرابط أو أن السهم غير موجود في بيانات العرض.</p><Link href="/" className="primary-button"><ArrowRight /> العودة إلى السوق</Link></div>;
}
