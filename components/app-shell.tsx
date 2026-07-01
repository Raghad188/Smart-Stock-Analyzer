"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Bot, ChartNoAxesCombined, Clock3, Heart, Home, Menu, Search, Sparkles, X
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { ToastProvider } from "@/hooks/use-toast";

const nav = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/analysis", label: "تحليل الأخبار", icon: Bot },
  { href: "/history", label: "سجل التحليلات", icon: Clock3 },
  { href: "/favorites", label: "المفضلة", icon: Heart },
  { href: "/notifications", label: "الإشعارات", icon: Bell },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/welcome") return <ToastProvider>{children}</ToastProvider>;

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <ToastProvider>
      <div className="app-shell">
        <aside className="sidebar">
          <Logo />
          <div className="ai-status"><Sparkles size={16} /><span>محرك الذكاء الاصطناعي</span><i /></div>
          <nav>
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={active(href) ? "active" : ""}>
                <Icon size={19} /><span>{label}</span>
                {href === "/notifications" && <b>5</b>}
              </Link>
            ))}
          </nav>

          <div className="market-open"><span /><div><strong>السوق مفتوح</strong><small>يغلق 3:00 م</small></div></div>
        </aside>

        <div className="main-area">
          <header className="topbar">
            <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="فتح القائمة"><Menu /></button>
            <div className="top-search"><Search size={18} /><input placeholder="ابحث عن سهم، شركة أو خبر..." /><kbd>⌘ K</kbd></div>
            <div className="top-actions">
              <span className="live-pill"><i /> مباشر</span>
              <Link href="/notifications" className="icon-btn" aria-label="الإشعارات"><Bell size={19} /><b /></Link>
              <div className="demo-avatar">AI</div>
            </div>
          </header>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="page-content"
          >
            {children}
          </motion.main>
        </div>

        <nav className="bottom-nav">
          {nav.slice(0, 5).map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={active(href) ? "active" : ""}><Icon size={20} /><span>{label.replace("سجل ", "")}</span></Link>
          ))}
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
              <motion.aside className="mobile-drawer" initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}>
                <div className="drawer-head"><Logo /><button onClick={() => setMobileOpen(false)}><X /></button></div>
                {nav.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={active(href) ? "active" : ""}><Icon size={19} />{label}</Link>
                ))}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}
