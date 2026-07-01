"use client";

import { Bell, Bot, ChartNoAxesCombined, CheckCheck, Newspaper, ShieldAlert, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

const items = [
  { icon: Newspaper, type: "خبر عاجل", title: "أرامكو تعلن عن توسع استراتيجي جديد", text: "حلل محركنا الخبر وحدد أثراً إيجابياً بثقة 91%.", time: "منذ 18 دقيقة", color: "blue" },
  { icon: Bot, type: "توصية ذكية", title: "إشارة شراء قوية لمصرف الراجحي", text: "تجاوز الزخم السعري والحجم متوسط آخر 20 جلسة.", time: "منذ 47 دقيقة", color: "purple" },
  { icon: TrendingUp, type: "تنبيه سعر", title: "إس تي سي تجاوز 45 ريالاً", text: "وصل السهم إلى مستوى السعر الذي تتابعه.", time: "منذ ساعة", color: "green" },
  { icon: ChartNoAxesCombined, type: "ملخص السوق", title: "تاسي يغلق مرتفعاً 1.25%", text: "البنوك والطاقة يقودان الارتفاع مع نمو السيولة.", time: "منذ ساعتين", color: "cyan" },
  { icon: ShieldAlert, type: "تنبيه المحفظة", title: "تذبذب مرتفع متوقع في قطاع المواد", text: "قد تتأثر سابك بتقلبات أسعار البتروكيماويات.", time: "منذ 3 ساعات", color: "orange" }
];

export default function NotificationsPage() {
  const [read, setRead] = useState<string[]>([]);
  const { showToast } = useToast();
  const markAll = () => { setRead(items.map((item) => item.title)); showToast("تم تعليم جميع الإشعارات كمقروءة"); };

  return (
    <>
      <PageHeader title="مركز الإشعارات" description="تنبيهات السوق والتوصيات الذكية في الوقت المناسب" action={<button className="secondary-button" onClick={markAll}><CheckCheck /> تعليم الكل كمقروء</button>} />
      <div className="notifications-layout">
        <Card className="notification-list">
          <div className="notification-tabs"><button className="active">الكل <b>{items.length - read.length}</b></button><button>الأخبار</button><button>التوصيات</button><button>الأسعار</button></div>
          {items.map(({ icon: Icon, ...item }) => (
            <button key={item.title} onClick={() => setRead([...read, item.title])} className={`notification-item ${read.includes(item.title) ? "read" : ""}`}>
              <span className={`notification-icon ${item.color}`}><Icon /></span>
              <div><small>{item.type}</small><h3>{item.title}</h3><p>{item.text}</p><time>{item.time}</time></div>
              {!read.includes(item.title) && <i />}
            </button>
          ))}
        </Card>
        <Card className="notification-settings"><span className="panel-icon"><Bell /></span><h2>إشعارات ذكية لا ضوضاء</h2><p>نرتّب التنبيهات حسب أهميتها وتأثيرها المحتمل على الأسهم التي تتابعها.</p>{["الأخبار العاجلة", "توصيات الذكاء الاصطناعي", "تنبيهات الأسعار", "الملخص اليومي"].map((label, i) => <label key={label}><span>{label}</span><input type="checkbox" defaultChecked={i < 3} /><i /></label>)}</Card>
      </div>
    </>
  );
}
