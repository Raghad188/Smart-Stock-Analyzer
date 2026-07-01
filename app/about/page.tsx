import { AtSign, Bot, BrainCircuit, ChartSpline, Code2, DatabaseZap, Github, Goal, Lightbulb, Linkedin, Mail, Newspaper, Rocket, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Card, PageHeader, SectionTitle } from "@/components/ui";

const tech = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "Lucide"];
const team = [
  { name: "عمر العمري", role: "قائد المنتج وتجربة المستخدم", initials: "ع ع" },
  { name: "سارة القحطاني", role: "مهندسة ذكاء اصطناعي", initials: "س ق" },
  { name: "عبدالله الغامدي", role: "مهندس برمجيات", initials: "ع غ" },
  { name: "نورة العتيبي", role: "محللة أسواق مالية", initials: "ن ع" }
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="عن محلل الأسهم الذكي" description="رؤية أوضح للسوق السعودي عبر قوة الذكاء الاصطناعي" action={<span className="hackathon-badge"><Rocket /> Hackathon MVP 2026</span>} />
      <Card className="about-hero">
        <div><span className="hero-badge"><Sparkles /> فكرتنا</span><h1>نجعل الخبر المالي <em>قراراً قابلاً للفهم</em></h1><p>منصة تجريبية تحلل أخبار الشركات السعودية، تفهم سياقها، وتتوقع اتجاه أثرها السعري مع تفسير واضح ودرجة ثقة قابلة للقياس.</p></div>
        <div className="about-logo"><Bot /><span /></div>
      </Card>
      <div className="about-pair">
        <Card><span className="about-icon red"><Lightbulb /></span><h2>المشكلة</h2><p>تصل الأخبار المالية بسرعة وبكثافة، بينما يحتاج المستثمر وقتاً لربط الخبر بأداء الشركة والقطاع والسوق. هذا التأخير يجعل القرار أصعب وأكثر تأثراً بالضوضاء.</p></Card>
        <Card><span className="about-icon blue"><BrainCircuit /></span><h2>الحل</h2><p>محرك ذكاء اصطناعي يختصر الخبر، يحلل نبرته وسياقه، يحدد الأثر المتوقع، ويشرح أسباب التوقع في واجهة عربية مصممة للسوق السعودي.</p></Card>
      </div>
      <Card className="objectives">
        <SectionTitle title="أهداف المشروع" subtitle="ما الذي صُممت التجربة لتحقيقه؟" />
        <div className="objective-grid">
          {[
            [Target, "تسريع الفهم", "تحويل الأخبار الطويلة إلى رؤى عملية خلال ثوانٍ."],
            [ShieldCheck, "رفع جودة القرار", "إظهار الثقة والأسباب بدل تقديم توصية غامضة."],
            [Newspaper, "تقليل الضوضاء", "ترتيب الأخبار حسب أهميتها وأثرها المتوقع."],
            [ChartSpline, "تجربة محلية", "واجهة عربية تراعي احتياجات المستثمر السعودي."]
          ].map(([Icon, title, text]) => {
            const ObjectiveIcon = Icon as typeof Goal;
            return <div key={title as string}><ObjectiveIcon /><h3>{title as string}</h3><p>{text as string}</p></div>;
          })}
        </div>
      </Card>
      <div className="about-pair">
        <Card>
          <SectionTitle title="الذكاء الاصطناعي في المنصة" />
          <div className="ai-features">
            {[[BrainCircuit, "تحليل النبرة والسياق"], [DatabaseZap, "ربط الخبر ببيانات السهم"], [Bot, "تفسير التوقع بلغة واضحة"], [Sparkles, "تقدير التأثير ودرجة الثقة"]].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof Bot;
              return <div key={label as string}><FeatureIcon /><span>{label as string}</span><i /></div>;
            })}
          </div>
        </Card>
        <Card>
          <SectionTitle title="التقنيات المستخدمة" />
          <div className="tech-cloud"><span className="tech-main"><Code2 /> Frontend-first</span>{tech.map((item) => <span key={item}>{item}</span>)}</div>
          <p className="tech-note">تعمل نسخة الهاكاثون بالكامل ببيانات محاكاة وLocal Storage، من دون خادم أو مفاتيح API.</p>
        </Card>
      </div>
      <Card className="team-section">
        <SectionTitle title="فريق الهاكاثون" subtitle="تخصصات متنوعة تجمع التقنية والمنتج والسوق" />
        <div className="team-grid">{team.map((member) => <div key={member.name}><span>{member.initials}</span><h3>{member.name}</h3><p>{member.role}</p><div><Linkedin /><Github /></div></div>)}</div>
      </Card>
      <Card className="contact-card"><span><AtSign /></span><div><h2>تواصل معنا</h2><p>يسعدنا مشاركة الفكرة وتطويرها بعد الهاكاثون.</p></div><a href="mailto:team@smartstock.sa"><Mail /> team@smartstock.sa</a></Card>
    </>
  );
}
