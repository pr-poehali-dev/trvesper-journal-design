import Icon from "@/components/ui/icon";

interface StatisticsProps {
  onNavigate: (page: string) => void;
}

const PAIRS_DATA = [
  { pair: "EUR/USD", count: 42, pct: 34, color: "#C9A227" },
  { pair: "XAU/USD", count: 28, pct: 23, color: "#E8D48B" },
  { pair: "GBP/USD", count: 22, pct: 18, color: "#8B7355" },
  { pair: "BTC/USD", count: 16, pct: 13, color: "#D4AF37" },
  { pair: "USD/JPY", count: 9, pct: 7, color: "#A0826D" },
  { pair: "Другие", count: 6, pct: 5, color: "#4A4A5A" },
];

const MONTHLY_DATA = [
  { month: "Янв", pnl: 3.2, trades: 12 },
  { month: "Фев", pnl: -1.1, trades: 8 },
  { month: "Мар", pnl: 5.4, trades: 15 },
  { month: "Апр", pnl: 2.8, trades: 11 },
  { month: "Май", pnl: 4.1, trades: 14 },
  { month: "Июн", pnl: -0.5, trades: 6 },
  { month: "Июл", pnl: 6.2, trades: 18 },
  { month: "Авг", pnl: 3.7, trades: 13 },
  { month: "Сен", pnl: -2.3, trades: 9 },
  { month: "Окт", pnl: 7.1, trades: 20 },
  { month: "Ноя", pnl: 4.5, trades: 16 },
  { month: "Дек", pnl: 2.9, trades: 10 },
];

const maxPnl = Math.max(...MONTHLY_DATA.map(d => Math.abs(d.pnl)));

const metrics = [
  { label: "Win Rate", value: "67.3%", sub: "из 123 сделок", positive: true, icon: "Target" },
  { label: "Общий P&L", value: "+41.0%", sub: "за 2026 год", positive: true, icon: "TrendingUp" },
  { label: "Макс. просадка", value: "-4.8%", sub: "Сентябрь 2026", positive: false, icon: "TrendingDown" },
  { label: "Лучший месяц", value: "+7.1%", sub: "Октябрь 2026", positive: true, icon: "Award" },
  { label: "Средний риск", value: "1.2%", sub: "на сделку", positive: null, icon: "Shield" },
  { label: "Profit Factor", value: "2.31", sub: "Profit / Loss", positive: true, icon: "BarChart" },
  { label: "Avg RR", value: "1:2.1", sub: "Средний R/R", positive: true, icon: "ArrowLeftRight" },
  { label: "Avg сделок", value: "13.6", sub: "в месяц", positive: null, icon: "Calendar" },
];

function PieChart() {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const innerR = 40;

  let cumulative = 0;
  const slices = PAIRS_DATA.map(d => {
    const start = cumulative;
    cumulative += d.pct;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const xi1 = cx + innerR * Math.cos(startAngle);
    const yi1 = cy + innerR * Math.sin(startAngle);
    const xi2 = cx + innerR * Math.cos(endAngle);
    const yi2 = cy + innerR * Math.sin(endAngle);
    const large = d.pct > 50 ? 1 : 0;
    return {
      ...d,
      path: `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${innerR} ${innerR} 0 ${large} 0 ${xi1} ${yi1} Z`,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} opacity={0.9}
          className="hover:opacity-100 transition-opacity cursor-pointer" />
      ))}
    </svg>
  );
}

export default function Statistics({ onNavigate }: StatisticsProps) {
  const maxBarHeight = 100;

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
                    n.key === "statistics"
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
        {/* Title */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Статистика</h1>
            <p className="text-sm text-muted-foreground mt-0.5">2026 год · 123 сделки</p>
          </div>
          <select className="px-3 py-1.5 text-sm rounded border border-border surface-1 text-foreground focus:outline-none focus:border-gold/50">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-lg border border-border surface-1 hover:border-gold/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <Icon name={m.icon} size={13} className="text-muted-foreground" />
              </div>
              <p className={`text-xl font-bold font-mono-ibm ${
                m.positive === true ? "text-green-trade" :
                m.positive === false ? "text-red-trade" :
                "text-foreground"
              }`}>{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pie chart */}
          <div className="p-6 rounded-lg border border-border surface-1">
            <h3 className="font-semibold mb-1 text-sm">Распределение по парам</h3>
            <p className="text-xs text-muted-foreground mb-5">Круговая диаграмма по количеству сделок</p>
            <div className="flex items-center gap-8">
              <PieChart />
              <div className="flex-1 space-y-2.5">
                {PAIRS_DATA.map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-sm font-mono-ibm">{d.pair}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full surface-3 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right font-mono-ibm">{d.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Win/Loss breakdown */}
          <div className="p-6 rounded-lg border border-border surface-1">
            <h3 className="font-semibold mb-1 text-sm">Win / Loss / B/E</h3>
            <p className="text-xs text-muted-foreground mb-5">Соотношение результатов сделок</p>
            <div className="space-y-4">
              {[
                { label: "Прибыльные (WIN)", count: 83, pct: 67, color: "bg-green-trade" },
                { label: "Убыточные (LOSS)", count: 32, pct: 26, color: "bg-red-trade" },
                { label: "Безубыток (B/E)", count: 8, pct: 7, color: "bg-muted" },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-mono-ibm font-medium">{r.count} <span className="text-muted-foreground">({r.pct}%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full surface-3 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${r.color}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
              {[
                { v: "+41.0%", l: "Общий P&L", c: "text-green-trade" },
                { v: "2.31", l: "Profit Factor", c: "text-foreground" },
                { v: "1:2.1", l: "Avg R/R", c: "text-foreground" },
              ].map((s, i) => (
                <div key={i}>
                  <p className={`text-lg font-bold font-mono-ibm ${s.c}`}>{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly bar chart */}
        <div className="p-6 rounded-lg border border-border surface-1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-sm mb-0.5">P&L по месяцам</h3>
              <p className="text-xs text-muted-foreground">Процент прибыли/убытка за каждый месяц 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-trade/70 inline-block" /> Прибыль</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-trade/70 inline-block" /> Убыток</span>
            </div>
          </div>

          <div className="flex items-end gap-2 h-32 border-b border-border pb-0">
            {MONTHLY_DATA.map((d, i) => {
              const height = Math.abs(d.pnl) / maxPnl * maxBarHeight;
              const isPositive = d.pnl >= 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className={`w-full rounded-t transition-all group-hover:opacity-100 opacity-80 ${
                      isPositive ? "bg-green-trade/70" : "bg-red-trade/70"
                    }`}
                    style={{ height: `${height}%`, minHeight: "4px" }}
                  />
                  <div className="w-px bg-border" style={{ height: "8px" }} />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-1">
            {MONTHLY_DATA.map((d, i) => (
              <div key={i} className="flex-1 text-center">
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>

          {/* Month values below */}
          <div className="flex gap-2 mt-1">
            {MONTHLY_DATA.map((d, i) => (
              <div key={i} className="flex-1 text-center">
                <span className={`text-xs font-mono-ibm ${d.pnl >= 0 ? "text-green-trade" : "text-red-trade"}`}>
                  {d.pnl > 0 ? "+" : ""}{d.pnl}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
