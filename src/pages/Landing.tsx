import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LandingProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: "Camera",
    title: "Анализ скриншотов",
    desc: "Загрузите скриншот из TradingView — ИИ автоматически определит валютную пару, точку входа, тейк-профит и стоп-лосс.",
  },
  {
    icon: "BookOpen",
    title: "Торговый журнал",
    desc: "Фиксируйте каждую сделку с описанием, результатом и скриншотом. Фильтрация по годам, месяцам и инструментам.",
  },
  {
    icon: "PieChart",
    title: "Круговая диаграмма",
    desc: "Визуализация распределения по валютным парам. Понимайте, где вы проводите больше всего сделок.",
  },
  {
    icon: "BarChart2",
    title: "Ключевая статистика",
    desc: "Процент прибыли, максимальная просадка, риск на сделку, Win Rate и десятки других профессиональных метрик.",
  },
  {
    icon: "Bell",
    title: "Еженедельные напоминания",
    desc: "Каждое воскресенье система напоминает вам проанализировать прошедшие сделки и сделать выводы.",
  },
  {
    icon: "FileDown",
    title: "PDF-отчёты",
    desc: "Скачивайте профессиональные отчёты по периодам — удобно для самоанализа или представления инвесторам.",
  },
];

const stats = [
  { value: "2 340+", label: "Трейдеров доверяют нам" },
  { value: "148 000+", label: "Сделок проанализировано" },
  { value: "94%", label: "Точность ИИ-анализа" },
  { value: "12 сек", label: "Среднее время добавления сделки" },
];

export default function Landing({ onNavigate }: LandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-ibm overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-background" />
            </div>
            <span className="font-semibold text-lg tracking-tight">
              TrVesper <span className="text-gold">Journal</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Статистика</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("login")}
              className="hidden md:inline-flex text-sm px-4 py-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all"
            >
              Войти
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="text-sm px-4 py-2 rounded bg-gold text-background font-medium hover:bg-gold/90 transition-colors"
            >
              Регистрация
            </button>
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>Возможности</a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>Статистика</a>
            <button onClick={() => { onNavigate("login"); setMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground">Войти</button>
          </div>
        )}
      </header>

      {/* Ticker bar */}
      <div className="border-b border-border bg-surface-1 overflow-hidden">
        <div className="flex gap-10 text-xs font-mono-ibm text-muted-foreground py-2 px-6 whitespace-nowrap">
          <span><span className="text-green-trade">▲</span> EUR/USD 1.08742</span>
          <span><span className="text-red-trade">▼</span> GBP/USD 1.26381</span>
          <span><span className="text-green-trade">▲</span> XAU/USD 2 345.60</span>
          <span><span className="text-red-trade">▼</span> BTC/USD 67 430</span>
          <span><span className="text-green-trade">▲</span> USD/JPY 151.24</span>
          <span><span className="text-green-trade">▲</span> NAS100 18 472</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative grid-line py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 rounded-full px-4 py-1.5 text-xs text-gold font-medium mb-8 animate-fade-in">
            <Icon name="Zap" size={12} />
            ИИ-анализ скриншотов TradingView
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Торговый журнал
            <br />
            <span className="text-gold">нового уровня</span>
          </h1>

          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Загружайте скриншоты из TradingView, получайте автоматический разбор сделок,
            анализируйте статистику и становитесь лучше с каждой неделей.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <button
              onClick={() => onNavigate("register")}
              className="px-8 py-3.5 bg-gold text-background font-semibold rounded text-base hover:bg-gold/90 transition-all hover:scale-105 active:scale-100"
            >
              Начать бесплатно
            </button>
            <button
              onClick={() => onNavigate("journal")}
              className="px-8 py-3.5 border border-border text-foreground rounded text-base hover:border-gold/50 transition-all flex items-center gap-2 justify-center"
            >
              <Icon name="Play" size={16} className="text-gold" />
              Посмотреть демо
            </button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section id="stats" className="border-y border-border surface-1">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-gold mb-1 font-mono-ibm">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-medium uppercase tracking-widest mb-3">Возможности</p>
            <h2 className="text-3xl md:text-4xl font-bold">Всё что нужно профессиональному трейдеру</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border surface-1 hover:border-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded border border-border surface-2 flex items-center justify-center mb-4 group-hover:border-gold/50 transition-colors">
                  <Icon name={f.icon} size={18} className="text-gold" />
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 surface-1 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-medium uppercase tracking-widest mb-3">Как это работает</p>
            <h2 className="text-3xl md:text-4xl font-bold">Три простых шага</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            {[
              { step: "01", icon: "Upload", title: "Загрузите скриншот", desc: "Сделайте скриншот в TradingView и загрузите в журнал" },
              { step: "02", icon: "Cpu", title: "ИИ анализирует", desc: "Система автоматически определяет все параметры сделки" },
              { step: "03", icon: "TrendingUp", title: "Следите за ростом", desc: "Смотрите статистику и улучшайте торговую стратегию" },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                  <Icon name={s.icon} size={24} className="text-gold" />
                </div>
                <div className="text-xs font-mono-ibm text-gold/50 mb-2">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-medium uppercase tracking-widest mb-3">Тарифы</p>
            <h2 className="text-3xl md:text-4xl font-bold">Выберите свой план</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Старт",
                price: "Бесплатно",
                desc: "Для начинающих трейдеров",
                features: ["До 20 сделок/мес", "Базовая статистика", "Ручной ввод сделок"],
                highlight: false,
              },
              {
                name: "Профи",
                price: "990 ₽/мес",
                desc: "Для активных трейдеров",
                features: ["Безлимитные сделки", "ИИ-анализ скриншотов", "Полная статистика", "PDF-отчёты", "Еженедельные напоминания"],
                highlight: true,
              },
              {
                name: "Команда",
                price: "2 490 ₽/мес",
                desc: "Для трейдинговых команд",
                features: ["Всё из Профи", "До 5 пользователей", "Командная аналитика", "Приоритетная поддержка"],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border transition-all flex flex-col ${
                  plan.highlight
                    ? "border-gold bg-gold/5 relative"
                    : "border-border surface-1 hover:border-gold/30"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold text-background text-xs font-semibold rounded-full">
                    Популярный
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">{plan.name}</p>
                  <p className="text-2xl font-bold font-mono-ibm">{plan.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                </div>
                <ul className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={14} className="text-gold flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate("register")}
                  className={`w-full py-2.5 rounded text-sm font-medium transition-all ${
                    plan.highlight
                      ? "bg-gold text-background hover:bg-gold/90"
                      : "border border-border hover:border-gold/50 text-foreground"
                  }`}
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 surface-1 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы стать лучше как трейдер?
          </h2>
          <p className="text-muted-foreground mb-8">
            Начните вести торговый журнал сегодня — первые 20 сделок бесплатно.
          </p>
          <button
            onClick={() => onNavigate("register")}
            className="px-10 py-4 bg-gold text-background font-semibold rounded text-base hover:bg-gold/90 transition-all hover:scale-105"
          >
            Зарегистрироваться бесплатно
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gold rounded-sm flex items-center justify-center">
              <Icon name="TrendingUp" size={12} className="text-background" />
            </div>
            <span className="font-medium text-foreground">TrVesper Journal</span>
          </div>
          <p>© 2026 TrVesper Journal. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
