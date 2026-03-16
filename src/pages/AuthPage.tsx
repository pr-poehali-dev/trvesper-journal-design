import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthPageProps {
  mode: "login" | "register";
  onNavigate: (page: string) => void;
}

export default function AuthPage({ mode, onNavigate }: AuthPageProps) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const isRegister = mode === "register";

  return (
    <div className="min-h-screen bg-background font-ibm flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-background" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            TrVesper <span className="text-gold">Journal</span>
          </span>
        </button>
        <button
          onClick={() => onNavigate("landing")}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <Icon name="ArrowLeft" size={14} />
          На главную
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Decorative line */}
          <div className="ticker-separator mb-8" />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {isRegister ? "Создать аккаунт" : "Добро пожаловать"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isRegister
                ? "Начните вести торговый журнал прямо сейчас"
                : "Войдите в свой торговый журнал"}
            </p>
          </div>

          <div className="p-8 rounded-lg border border-border surface-1">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onNavigate("journal"); }}>
              {isRegister && (
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded border border-border surface-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="trader@example.com"
                  className="w-full px-4 py-3 rounded border border-border surface-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium block mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded border border-border surface-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gold text-background font-semibold rounded hover:bg-gold/90 transition-all hover:scale-[1.01] active:scale-100 mt-2"
              >
                {isRegister ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-border text-center text-sm">
              {isRegister ? (
                <span className="text-muted-foreground">
                  Уже есть аккаунт?{" "}
                  <button onClick={() => onNavigate("login")} className="text-gold hover:underline">
                    Войти
                  </button>
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Нет аккаунта?{" "}
                  <button onClick={() => onNavigate("register")} className="text-gold hover:underline">
                    Зарегистрироваться
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="ticker-separator mt-8" />

          <p className="text-center text-xs text-muted-foreground mt-6">
            Нажимая кнопку, вы соглашаетесь с условиями использования и политикой конфиденциальности
          </p>
        </div>
      </div>
    </div>
  );
}
