import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ReportsProps {
  onNavigate: (page: string) => void;
}

const REPORT_TEMPLATES = [
  {
    id: "monthly",
    title: "Месячный отчёт",
    desc: "Все сделки за выбранный месяц с детальной статистикой и графиками",
    icon: "Calendar",
    pages: "4–6 стр.",
    includes: ["Список всех сделок", "P&L по неделям", "Win Rate", "Распределение по парам", "Лучшие и худшие сделки"],
  },
  {
    id: "quarterly",
    title: "Квартальный отчёт",
    desc: "Глубокий анализ торговли за квартал с выводами и рекомендациями",
    icon: "FileBarChart",
    pages: "8–12 стр.",
    includes: ["Сводная статистика", "Графики P&L", "Анализ рисков", "Сравнение с предыдущим кварталом", "ИИ-рекомендации"],
  },
  {
    id: "annual",
    title: "Годовой отчёт",
    desc: "Полный годовой анализ торговой деятельности — как для себя, так и для инвесторов",
    icon: "BookOpen",
    pages: "15–20 стр.",
    includes: ["Полная история сделок", "Кривая доходности", "Сезонный анализ", "Риск-менеджмент", "Стратегические выводы"],
  },
];

const RECENT_REPORTS = [
  { name: "Отчёт — Февраль 2026", type: "Месячный", date: "01.03.2026", size: "1.2 МБ", pnl: "+3.2%" },
  { name: "Отчёт — Январь 2026", type: "Месячный", date: "01.02.2026", size: "0.9 МБ", pnl: "+5.1%" },
  { name: "Отчёт — Q4 2025", type: "Квартальный", date: "05.01.2026", size: "3.4 МБ", pnl: "+14.7%" },
  { name: "Отчёт — 2025 год", type: "Годовой", date: "10.01.2026", size: "8.1 МБ", pnl: "+38.2%" },
];

export default function Reports({ onNavigate }: ReportsProps) {
  const [generating, setGenerating] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setDone(null);
    setTimeout(() => {
      setGenerating(null);
      setDone(id);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background font-ibm flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 hover:opacity-80">
              <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center">
                <Icon name="TrendingUp" size={14} className="text-background" />
              </div>
              <span className="font-semibold tracking-tight hidden sm:block">
                TrVesper <span className="text-gold">Journal</span>
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { key: "journal", label: "Журнал", icon: "BookOpen" },
                { key: "statistics", label: "Статистика", icon: "BarChart2" },
                { key: "reports", label: "Отчёты", icon: "FileText" },
              ].map(n => (
                <button
                  key={n.key}
                  onClick={() => onNavigate(n.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all ${
                    n.key === "reports"
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={n.icon} size={14} />
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="w-8 h-8 rounded-full surface-2 border border-border flex items-center justify-center">
            <Icon name="User" size={14} className="text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Отчёты</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Создавайте и скачивайте профессиональные PDF-отчёты</p>
        </div>

        {/* Weekly reminder banner */}
        <div className="mb-8 p-4 rounded-lg border border-gold/30 bg-gold/5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Bell" size={14} className="text-gold" />
          </div>
          <div>
            <p className="text-sm font-medium">Напоминание на этой неделе</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Следующее воскресенье — время анализировать сделки за неделю. 
              Напоминание придёт в воскресенье в 10:00 на вашу почту.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button className="text-xs text-gold hover:underline">Изменить время</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Отключить</button>
            </div>
          </div>
        </div>

        {/* Report templates */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Создать отчёт</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {REPORT_TEMPLATES.map(r => (
            <div key={r.id} className="p-6 rounded-lg border border-border surface-1 hover:border-gold/30 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded border border-border surface-2 flex items-center justify-center">
                  <Icon name={r.icon} size={18} className="text-gold" />
                </div>
                <span className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5 font-mono-ibm">
                  {r.pages}
                </span>
              </div>

              <h3 className="font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{r.desc}</p>

              <ul className="space-y-1 mb-5">
                {r.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Check" size={12} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Period selector */}
              <select className="w-full px-3 py-2 text-sm rounded border border-border surface-2 text-foreground focus:outline-none focus:border-gold/50 mb-3">
                {r.id === "monthly" && (
                  <>
                    <option>Март 2026</option>
                    <option>Февраль 2026</option>
                    <option>Январь 2026</option>
                  </>
                )}
                {r.id === "quarterly" && (
                  <>
                    <option>Q1 2026</option>
                    <option>Q4 2025</option>
                    <option>Q3 2025</option>
                  </>
                )}
                {r.id === "annual" && (
                  <>
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                  </>
                )}
              </select>

              <button
                onClick={() => handleGenerate(r.id)}
                disabled={generating === r.id}
                className={`w-full py-2.5 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  done === r.id
                    ? "bg-green-trade/20 text-green-trade border border-green-trade/30"
                    : generating === r.id
                    ? "bg-gold/20 text-gold cursor-not-allowed"
                    : "bg-gold text-background hover:bg-gold/90"
                }`}
              >
                {generating === r.id ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    Генерирую PDF...
                  </>
                ) : done === r.id ? (
                  <>
                    <Icon name="CheckCircle" size={14} />
                    Скачать PDF
                  </>
                ) : (
                  <>
                    <Icon name="FileDown" size={14} />
                    Сформировать PDF
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Recent reports */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Последние отчёты</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="surface-2 border-b border-border px-5 py-3 hidden md:grid grid-cols-12 gap-2 text-xs text-muted-foreground uppercase tracking-wider">
            <span className="col-span-5">Название</span>
            <span className="col-span-2">Тип</span>
            <span className="col-span-2">P&L</span>
            <span className="col-span-2">Создан</span>
            <span className="col-span-1">Размер</span>
          </div>

          {RECENT_REPORTS.map((r, i) => (
            <div
              key={i}
              className={`px-5 py-4 flex md:grid md:grid-cols-12 gap-2 items-center hover:bg-white/3 transition-colors ${
                i !== RECENT_REPORTS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3 col-span-5 flex-1 md:flex-none">
                <div className="w-8 h-8 rounded surface-2 border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={14} className="text-gold" />
                </div>
                <span className="text-sm font-medium">{r.name}</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">{r.type}</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-sm font-mono-ibm text-green-trade font-medium">{r.pnl}</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="text-sm text-muted-foreground">{r.date}</span>
              </div>
              <div className="col-span-1 hidden md:flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono-ibm">{r.size}</span>
              </div>
              <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-border hover:border-gold/50 text-muted-foreground hover:text-foreground transition-all">
                <Icon name="Download" size={12} />
                <span className="hidden md:block">Скачать</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-6 p-4 rounded-lg surface-2 border border-border text-sm text-muted-foreground flex items-start gap-3">
          <Icon name="Info" size={16} className="text-gold mt-0.5 flex-shrink-0" />
          <p>
            PDF-отчёты формируются на основе данных вашего торгового журнала. Отчёты содержат профессиональное оформление и могут быть использованы для личного анализа или предоставления инвесторам.
          </p>
        </div>
      </div>
    </div>
  );
}
