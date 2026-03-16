import { useState } from "react";
import Icon from "@/components/ui/icon";
import TradeReplay from "@/components/TradeReplay";

interface Trade {
  id: number;
  pair: string;
  direction: "LONG" | "SHORT";
  entry: string;
  tp: string;
  sl: string;
  result: "win" | "loss" | "be";
  pnl: number;
  date: string;
  description: string;
  screenshot?: string;
}

const DEMO_TRADES: Trade[] = [
  { id: 1, pair: "EUR/USD", direction: "LONG", entry: "1.08210", tp: "1.08850", sl: "1.07900", result: "win", pnl: 2.3, date: "2026-03-14", description: "Отработка уровня поддержки на H4. Подтверждение по RSI." },
  { id: 2, pair: "GBP/USD", direction: "SHORT", entry: "1.26540", tp: "1.25800", sl: "1.26900", result: "loss", pnl: -1.0, date: "2026-03-12", description: "Пробой трендовой линии. Стоп выбит на новостях." },
  { id: 3, pair: "XAU/USD", direction: "LONG", entry: "2318.00", tp: "2345.00", sl: "2305.00", result: "win", pnl: 3.5, date: "2026-03-10", description: "Золото от ключевой поддержки. RR 1:2.5." },
  { id: 4, pair: "BTC/USD", direction: "LONG", entry: "64200", tp: "67000", sl: "63000", result: "win", pnl: 1.8, date: "2026-03-08", description: "Накопление перед выходом. Пробой консолидации вверх." },
  { id: 5, pair: "USD/JPY", direction: "SHORT", entry: "151.80", tp: "150.50", sl: "152.20", result: "be", pnl: 0, date: "2026-03-06", description: "Дивергенция на MACD. Закрыл в безубыток." },
  { id: 6, pair: "NAS100", direction: "LONG", entry: "18100", tp: "18450", sl: "17950", result: "win", pnl: 2.1, date: "2026-03-04", description: "Открытие сессии, гэп вверх. Откат к EMA20." },
];

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const YEARS = [2024, 2025, 2026];

interface JournalProps {
  onNavigate: (page: string) => void;
}

export default function Journal({ onNavigate }: JournalProps) {
  const [trades] = useState<Trade[]>(DEMO_TRADES);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [replayTrade, setReplayTrade] = useState<Trade | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [newTrade, setNewTrade] = useState({
    pair: "", direction: "LONG", entry: "", tp: "", sl: "", description: ""
  });

  const filtered = trades.filter(t => {
    const d = new Date(t.date);
    if (d.getFullYear() !== selectedYear) return false;
    if (selectedMonth !== null && d.getMonth() !== selectedMonth) return false;
    return true;
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file.name);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name);
  };

  const simulateUpload = (name: string) => {
    setUploadedFile(name);
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setNewTrade({
        pair: "EUR/USD",
        direction: "LONG",
        entry: "1.08415",
        tp: "1.09120",
        sl: "1.07980",
        description: "",
      });
    }, 2500);
  };

  const resultColor = (r: string) =>
    r === "win" ? "text-green-trade" : r === "loss" ? "text-red-trade" : "text-muted-foreground";
  const resultBg = (r: string) =>
    r === "win" ? "bg-green-trade/10 border-green-trade/30" : r === "loss" ? "bg-red-trade/10 border-red-trade/30" : "bg-muted/30 border-border";
  const resultLabel = (r: string) =>
    r === "win" ? "WIN" : r === "loss" ? "LOSS" : "B/E";

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
                    n.key === "journal"
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gold text-background text-sm font-medium rounded hover:bg-gold/90 transition-all"
            >
              <Icon name="Plus" size={14} />
              <span className="hidden sm:block">Добавить сделку</span>
            </button>
            <div className="w-8 h-8 rounded-full surface-2 border border-border flex items-center justify-center">
              <Icon name="User" size={14} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold">Торговый журнал</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length} {filtered.length === 1 ? "сделка" : "сделок"} · {selectedYear}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Year filter */}
            <div className="flex rounded border border-border overflow-hidden surface-1">
              {YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    selectedYear === y ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Month filter */}
            <select
              value={selectedMonth ?? ""}
              onChange={e => setSelectedMonth(e.target.value === "" ? null : Number(e.target.value))}
              className="px-3 py-1.5 text-sm rounded border border-border surface-1 text-foreground focus:outline-none focus:border-gold/50"
            >
              <option value="">Все месяцы</option>
              {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего сделок", value: filtered.length.toString(), icon: "Activity" },
            { label: "Win Rate", value: `${Math.round((filtered.filter(t => t.result === "win").length / (filtered.length || 1)) * 100)}%`, icon: "Target", color: "text-green-trade" },
            { label: "Общий P&L", value: `${filtered.reduce((a, t) => a + t.pnl, 0).toFixed(1)}%`, icon: "TrendingUp", color: filtered.reduce((a, t) => a + t.pnl, 0) >= 0 ? "text-green-trade" : "text-red-trade" },
            { label: "Прибыльных", value: filtered.filter(t => t.result === "win").toString(), icon: "CheckCircle", color: "text-green-trade" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-lg border border-border surface-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <Icon name={s.icon} size={14} className="text-muted-foreground" />
              </div>
              <p className={`text-xl font-bold font-mono-ibm ${s.color || "text-foreground"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Trades list */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="surface-2 border-b border-border px-5 py-3 hidden md:grid grid-cols-12 gap-2 text-xs text-muted-foreground uppercase tracking-wider">
            <span className="col-span-1">Рез.</span>
            <span className="col-span-2">Пара</span>
            <span className="col-span-1">Напр.</span>
            <span className="col-span-2">Вход</span>
            <span className="col-span-1">TP</span>
            <span className="col-span-1">SL</span>
            <span className="col-span-1">P&L</span>
            <span className="col-span-2">Дата</span>
            <span className="col-span-1">Описание</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Icon name="BookOpen" size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Нет сделок за выбранный период</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-4 py-2 text-sm bg-gold text-background rounded hover:bg-gold/90 transition-colors"
              >
                Добавить первую сделку
              </button>
            </div>
          ) : (
            filtered.map((t, i) => (
              <div
                key={t.id}
                className={`px-5 py-4 grid grid-cols-2 md:grid-cols-12 gap-2 items-center hover:bg-white/3 transition-colors cursor-pointer ${
                  i !== filtered.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-1">
                  <span className={`text-xs font-medium font-mono-ibm px-2 py-0.5 rounded border ${resultBg(t.result)} ${resultColor(t.result)}`}>
                    {resultLabel(t.result)}
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                  <span className="font-medium text-sm">{t.pair}</span>
                  <button
                    onClick={e => { e.stopPropagation(); setReplayTrade(t); }}
                    className="md:hidden flex items-center gap-1 px-1.5 py-0.5 rounded border border-border text-xs text-muted-foreground hover:border-gold/50 hover:text-gold transition-all"
                  >
                    <Icon name="Play" size={10} />
                  </button>
                </div>
                <div className="col-span-2 md:col-span-1 text-right md:text-left">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${t.direction === "LONG" ? "bg-green-trade/10 text-green-trade" : "bg-red-trade/10 text-red-trade"}`}>
                    {t.direction}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-2">
                  <span className="font-mono-ibm text-sm">{t.entry}</span>
                </div>
                <div className="col-span-1 hidden md:block">
                  <span className="font-mono-ibm text-sm text-green-trade">{t.tp}</span>
                </div>
                <div className="col-span-1 hidden md:block">
                  <span className="font-mono-ibm text-sm text-red-trade">{t.sl}</span>
                </div>
                <div className="col-span-1 hidden md:block">
                  <span className={`font-mono-ibm text-sm font-medium ${t.pnl > 0 ? "text-green-trade" : t.pnl < 0 ? "text-red-trade" : "text-muted-foreground"}`}>
                    {t.pnl > 0 ? "+" : ""}{t.pnl}%
                  </span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="text-sm text-muted-foreground">{new Date(t.date).toLocaleDateString("ru-RU")}</span>
                </div>
                <div className="col-span-1 hidden md:flex justify-end">
                  <button
                    onClick={e => { e.stopPropagation(); setReplayTrade(t); }}
                    className="flex items-center gap-1 px-2 py-1 rounded border border-border text-xs text-muted-foreground hover:border-gold/50 hover:text-gold transition-all"
                  >
                    <Icon name="Play" size={11} />
                    Replay
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Trade Replay Modal */}
      {replayTrade && (
        <TradeReplay trade={replayTrade} onClose={() => setReplayTrade(null)} />
      )}

      {/* Add Trade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg surface-1 rounded-lg border border-border shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold">Новая сделка</h2>
              <button onClick={() => { setShowAddModal(false); setUploadedFile(null); setAnalyzing(false); setAnalyzed(false); }}>
                <Icon name="X" size={18} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Screenshot upload */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
                  Скриншот TradingView
                </label>
                <div
                  onDrop={handleFileDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                    dragOver ? "border-gold/70 bg-gold/5" : uploadedFile ? "border-gold/40 bg-gold/5" : "border-border hover:border-gold/30"
                  }`}
                >
                  {analyzing ? (
                    <div className="space-y-3">
                      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-gold">ИИ анализирует скриншот...</p>
                      <p className="text-xs text-muted-foreground">Определяю валютную пару, уровни входа, TP и SL</p>
                    </div>
                  ) : analyzed ? (
                    <div className="space-y-2">
                      <Icon name="CheckCircle" size={28} className="text-green-trade mx-auto" />
                      <p className="text-sm text-green-trade font-medium">Анализ завершён</p>
                      <p className="text-xs text-muted-foreground">{uploadedFile} — данные заполнены автоматически</p>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Icon name="Upload" size={28} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Перетащите скриншот сюда</p>
                      <p className="text-xs text-muted-foreground mt-1">или нажмите для выбора файла</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG до 10 МБ</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                    </label>
                  )}
                </div>
              </div>

              {/* Pair & Direction */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Пара</label>
                  <input
                    value={newTrade.pair}
                    onChange={e => setNewTrade({ ...newTrade, pair: e.target.value })}
                    placeholder="EUR/USD"
                    className="w-full px-3 py-2.5 rounded border border-border surface-2 text-sm focus:outline-none focus:border-gold/50 transition-colors font-mono-ibm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">Направление</label>
                  <div className="flex rounded border border-border overflow-hidden surface-2">
                    {["LONG", "SHORT"].map(d => (
                      <button
                        key={d}
                        onClick={() => setNewTrade({ ...newTrade, direction: d })}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                          newTrade.direction === d
                            ? d === "LONG" ? "bg-green-trade/20 text-green-trade" : "bg-red-trade/20 text-red-trade"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Entry / TP / SL */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "entry", label: "Точка входа" },
                  { key: "tp", label: "Take Profit" },
                  { key: "sl", label: "Stop Loss" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">{f.label}</label>
                    <input
                      value={newTrade[f.key as keyof typeof newTrade]}
                      onChange={e => setNewTrade({ ...newTrade, [f.key]: e.target.value })}
                      placeholder="0.00000"
                      className="w-full px-3 py-2.5 rounded border border-border surface-2 text-sm focus:outline-none focus:border-gold/50 transition-colors font-mono-ibm"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
                  Описание сделки
                </label>
                <textarea
                  value={newTrade.description}
                  onChange={e => setNewTrade({ ...newTrade, description: e.target.value })}
                  placeholder="Обоснование входа, паттерны, ожидания..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded border border-border surface-2 text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>

              <button
                onClick={() => { setShowAddModal(false); setUploadedFile(null); setAnalyzing(false); setAnalyzed(false); }}
                className="w-full py-3 bg-gold text-background font-semibold rounded hover:bg-gold/90 transition-all"
              >
                Сохранить сделку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}