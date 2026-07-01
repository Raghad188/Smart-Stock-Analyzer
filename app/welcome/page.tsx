"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Bot, BrainCircuit, ChartNoAxesCombined, CheckCircle2, Newspaper, ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Logo } from "@/components/logo";

const features = [
  { icon: Newspaper, title: "رصد الأخبار لحظياً", text: "تجميع الأخبار المالية وربطها مباشرة بالشركات المدرجة." },
  { icon: BrainCircuit, title: "تحليل ذكي للسياق", text: "فهم نبرة الخبر وأسبابه وليس الكلمات المفتاحية فقط." },
  { icon: ChartNoAxesCombined, title: "استشراف الأثر السعري", text: "توقع نوع التأثير ودرجة الثقة بلغة واضحة وسريعة." }
];

export default function WelcomePage() {
  return (
    <div className="landing">
      <div className="landing-glow one" /><div className="landing-glow two" /><div className="landing-grid-bg" />
      <header className="landing-nav"><Logo /><div><Link href="/about">عن المشروع</Link><Link href="/" className="nav-cta">افتح المنصة</Link></div></header>
      <main>
        <section className="hero">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <span className="hero-badge"><Sparkles size={15} /> مدعوم بالذكاء الاصطناعي</span>
            <h1>محلل الأسهم <em>الذكي</em></h1>
            <p>تحليل الأخبار المالية واستشراف حركة الأسهم السعودية باستخدام الذكاء الاصطناعي.</p>
            <div className="hero-actions"><Link href="/" className="primary-button large">ابدأ التحليل <ArrowLeft /></Link><span><CheckCircle2 /> تجربة مباشرة بلا تسجيل</span></div>
            <div className="hero-trust"><span><ShieldCheck /> بيانات آمنة</span><span><Zap /> تحليل فوري</span><span><BarChart3 /> سوق تداول</span></div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .92, rotateY: -8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: .8, delay: .15 }}>
            <div className="floating-card signal"><span><TrendingUp /></span><div><small>إشارة اليوم</small><strong>زخم إيجابي</strong></div><b>87%</b></div>
            <div className="visual-window">
              <div className="visual-head"><span><i /><i /><i /></span><small>تحليل السوق المباشر</small></div>
              <div className="visual-chart"><svg viewBox="0 0 500 220" preserveAspectRatio="none"><defs><linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#1688ff" stopOpacity=".45"/><stop offset="1" stopColor="#1688ff" stopOpacity="0"/></linearGradient></defs><path d="M0 182 C38 165 46 174 78 145 S132 155 164 118 S216 138 248 100 S302 115 338 72 S396 84 432 48 S474 52 500 20 V220 H0Z" fill="url(#heroFill)"/><path d="M0 182 C38 165 46 174 78 145 S132 155 164 118 S216 138 248 100 S302 115 338 72 S396 84 432 48 S474 52 500 20" fill="none" stroke="#3fb8ff" strokeWidth="4"/></svg></div>
              <div className="visual-stats"><div><small>تاسي</small><strong>11,924.32</strong></div><div><small>التغير</small><strong className="up">+1.25%</strong></div><div><small>السيولة</small><strong>7.84B</strong></div></div>
            </div>
            <div className="floating-card ai"><span><Bot /></span><div><small>تحليل خبر جديد</small><strong>تأثير إيجابي متوقع</strong></div></div>
          </motion.div>
        </section>

        <section className="landing-stats">
          <div><strong>+240</strong><span>شركة مدرجة</span></div><div><strong>94%</strong><span>دقة تحليل النبرة</span></div><div><strong>&lt; 3s</strong><span>زمن التحليل</span></div><div><strong>24/7</strong><span>رصد الأخبار</span></div>
        </section>

        <section className="features"><div className="landing-title"><span>ذكاء يعمل من أجلك</span><h2>من الخبر إلى القرار في لحظات</h2><p>طبقة ذكية تمنح المستثمر سياقاً أوضح وسط ضجيج الأخبار.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, text }, i) => <motion.div className="feature-card" key={title} whileHover={{ y: -8 }}><span>0{i + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></motion.div>)}</div></section>
      </main>
      <footer className="landing-footer"><Logo /><p>مشروع هاكاثون تجريبي · جميع البيانات محاكاة لأغراض العرض.</p><span>صُنع بشغف في المملكة العربية السعودية 🇸🇦</span></footer>
    </div>
  );
}
