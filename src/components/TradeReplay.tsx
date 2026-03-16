import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface TradeReplayProps {
  trade: {
    pair: string;
    direction: "LONG" | "SHORT";
    entry: string;
    tp: string;
    sl: string;
    result: "win" | "loss" | "be";
    pnl: number;
  };
  onClose: () => void;
}

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

function generateCandles(
  entry: number,
  tp: number,
  sl: number,
  direction: "LONG" | "SHORT",
  result: "win" | "loss" | "be"
): Candle[] {
  const candles: Candle[] = [];
  const range = Math.abs(tp - entry) + Math.abs(entry - sl);
  const volatility = range * 0.12;

  // 8 pre-entry candles (market context)
  let price = direction === "LONG" ? entry - range * 0.3 : entry + range * 0.3;
  for (let i = 0; i < 8; i++) {
    const move = (Math.random() - 0.45) * volatility * (direction === "LONG" ? 1 : -1);
    const o = price;
    price += move;
    const c = price;
    const h = Math.max(o, c) + Math.random() * volatility * 0.4;
    const l = Math.min(o, c) - Math.random() * volatility * 0.4;
    candles.push({ open: o, close: c, high: h, low: l });
  }

  // Entry candle
  const entryOpen = price;
  const entryClose = entry + (direction === "LONG" ? volatility * 0.3 : -volatility * 0.3);
  candles.push({
    open: entryOpen,
    close: entryClose,
    high: Math.max(entryOpen, entryClose) + volatility * 0.2,
    low: Math.min(entryOpen, entryClose) - volatility * 0.1,
  });
  price = entryClose;

  // Post-entry candles heading toward result
  const target = result === "win" ? tp : result === "loss" ? sl : entry;
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const progress = (i + 1) / steps;
    const noise = (Math.random() - 0.5) * volatility * 0.6;
    const trend = (target - price) * (0.15 + progress * 0.1);
    const o = price;
    price = price + trend + noise;
    const c = price;
    const wick = volatility * 0.3;
    const h = Math.max(o, c) + Math.random() * wick;
    const l = Math.min(o, c) - Math.random() * wick;
    candles.push({ open: o, close: c, high: h, low: l });
  }

  // Final close candle at result
  const lastPrice = price;
  candles.push({
    open: lastPrice,
    close: target,
    high: Math.max(lastPrice, target) + volatility * 0.1,
    low: Math.min(lastPrice, target) - volatility * 0.1,
  });

  return candles;
}

export default function TradeReplay({ trade, onClose }: TradeReplayProps) {
  const entry = parseFloat(trade.entry);
  const tp = parseFloat(trade.tp);
  const sl = parseFloat(trade.sl);

  const allCandles = generateCandles(entry, tp, sl, trade.direction, trade.result);

  const [visibleCount, setVisibleCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const entryIndex = 8;

  const visibleCandles = allCandles.slice(0, Math.max(visibleCount, 1));
  const allPrices = visibleCandles.flatMap(c => [c.high, c.low]);
  allPrices.push(entry, tp, sl);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  const W = 560;
  const H = 220;
  const PAD = { top: 20, bottom: 20, left: 54, right: 16 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const candleSlotW = chartW / allCandles.length;
  const candleW = Math.max(candleSlotW * 0.55, 3);

  const toY = (p: number) => PAD.top + chartH - ((p - minPrice) / priceRange) * chartH;
  const toX = (i: number) => PAD.left + i * candleSlotW + candleSlotW / 2;

  const entryY = toY(entry);
  const tpY = toY(tp);
  const slY = toY(sl);

  const play = () => {
    if (finished) {
      setVisibleCount(0);
      setFinished(false);
    }
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  const reset = () => {
    setPlaying(false);
    setFinished(false);
    setVisibleCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setVisibleCount(prev => {
          if (prev >= allCandles.length) {
            setPlaying(false);
            setFinished(true);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, speed, allCandles.length]);

  const resultColor = trade.result === "win" ? "#4ade80" : trade.result === "loss" ? "#f87171" : "#94a3b8";
  const resultLabel = trade.result === "win" ? "ТП ДОСТИГНУТ" : trade.result === "loss" ? "СТОП ВЫБИТ" : "БЕЗУБЫТОК";

  const priceLabels = 5;
  const priceStep = priceRange / (priceLabels - 1);

  return (
    <div className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl surface-1 rounded-lg border border-border shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded surface-2 border border-border flex items-center justify-center">
              <Icon name="Play" size={14} className="text-gold" />
            </div>
            <div>
              <p className="font-semibold text-sm">Воспроизведение сделки</p>
              <p className="text-xs text-muted-foreground font-mono-ibm">{trade.pair} · {trade.direction}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Chart */}
        <div className="px-5 pt-5 pb-2">
          <div className="rounded-lg border border-border surface-2 overflow-hidden relative">
            {/* Finished overlay */}
            {finished && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                  className="px-5 py-2.5 rounded-lg border text-sm font-bold font-mono-ibm animate-fade-in"
                  style={{ borderColor: resultColor + "50", backgroundColor: resultColor + "15", color: resultColor }}
                >
                  {resultLabel} &nbsp; {trade.pnl > 0 ? "+" : ""}{trade.pnl}%
                </div>
              </div>
            )}

            <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="block">
              {/* Grid lines */}
              {Array.from({ length: priceLabels }).map((_, i) => {
                const p = minPrice + i * priceStep;
                const y = toY(p);
                return (
                  <g key={i}>
                    <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="hsl(220 12% 18%)" strokeWidth="1" />
                    <text x={PAD.left - 4} y={y + 4} textAnchor="end" fontSize="9" fill="hsl(215 15% 42%)" fontFamily="IBM Plex Mono, monospace">
                      {p.toFixed(p > 1000 ? 0 : p > 10 ? 2 : 5)}
                    </text>
                  </g>
                );
              })}

              {/* Vertical entry line */}
              <line
                x1={toX(entryIndex)}
                x2={toX(entryIndex)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="hsl(43 74% 52% / 0.35)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* TP zone fill */}
              <rect
                x={PAD.left}
                y={Math.min(tpY, entryY)}
                width={chartW}
                height={Math.abs(tpY - entryY)}
                fill="hsl(152 60% 42% / 0.06)"
              />
              {/* SL zone fill */}
              <rect
                x={PAD.left}
                y={Math.min(slY, entryY)}
                width={chartW}
                height={Math.abs(slY - entryY)}
                fill="hsl(0 62% 50% / 0.06)"
              />

              {/* TP line */}
              <line x1={PAD.left} x2={W - PAD.right} y1={tpY} y2={tpY} stroke="hsl(152 60% 42%)" strokeWidth="1" strokeDasharray="5 3" opacity={0.7} />
              <rect x={W - PAD.right - 30} y={tpY - 9} width={30} height={14} fill="hsl(152 60% 42% / 0.15)" rx="2" />
              <text x={W - PAD.right - 15} y={tpY + 1} textAnchor="middle" fontSize="8" fill="hsl(152 60% 42%)" fontFamily="IBM Plex Mono">TP</text>

              {/* SL line */}
              <line x1={PAD.left} x2={W - PAD.right} y1={slY} y2={slY} stroke="hsl(0 62% 50%)" strokeWidth="1" strokeDasharray="5 3" opacity={0.7} />
              <rect x={W - PAD.right - 30} y={slY - 9} width={30} height={14} fill="hsl(0 62% 50% / 0.15)" rx="2" />
              <text x={W - PAD.right - 15} y={slY + 1} textAnchor="middle" fontSize="8" fill="hsl(0 62% 50%)" fontFamily="IBM Plex Mono">SL</text>

              {/* Entry line */}
              <line x1={PAD.left} x2={W - PAD.right} y1={entryY} y2={entryY} stroke="hsl(43 74% 52%)" strokeWidth="1.5" strokeDasharray="6 3" opacity={0.85} />
              <rect x={W - PAD.right - 38} y={entryY - 9} width={38} height={14} fill="hsl(43 74% 52% / 0.2)" rx="2" />
              <text x={W - PAD.right - 19} y={entryY + 1} textAnchor="middle" fontSize="8" fill="hsl(43 74% 52%)" fontFamily="IBM Plex Mono">ВХОД</text>

              {/* Candles */}
              {visibleCandles.map((c, i) => {
                const x = toX(i);
                const isEntry = i === entryIndex;
                const isBull = c.close >= c.open;
                const bodyTop = toY(Math.max(c.open, c.close));
                const bodyH = Math.max(Math.abs(toY(c.open) - toY(c.close)), 1);
                const wickColor = isEntry
                  ? "hsl(43 74% 52%)"
                  : isBull
                  ? "hsl(152 60% 42%)"
                  : "hsl(0 62% 50%)";
                const bodyColor = isEntry
                  ? "hsl(43 74% 52%)"
                  : isBull
                  ? "hsl(152 60% 42%)"
                  : "hsl(0 62% 50%)";

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line
                      x1={x} x2={x}
                      y1={toY(c.high)} y2={toY(c.low)}
                      stroke={wickColor}
                      strokeWidth="1"
                      opacity={0.7}
                    />
                    {/* Body */}
                    <rect
                      x={x - candleW / 2}
                      y={bodyTop}
                      width={candleW}
                      height={bodyH}
                      fill={bodyColor}
                      opacity={isEntry ? 1 : 0.75}
                      rx="0.5"
                    />
                  </g>
                );
              })}

              {/* Current price dot */}
              {visibleCount > 0 && visibleCount < allCandles.length && (() => {
                const last = visibleCandles[visibleCandles.length - 1];
                const cx = toX(visibleCandles.length - 1);
                const cy = toY(last.close);
                return (
                  <g>
                    <line x1={PAD.left} x2={W - PAD.right} y1={cy} y2={cy} stroke="hsl(43 74% 52% / 0.4)" strokeWidth="0.5" />
                    <circle cx={cx} cy={cy} r="3" fill="hsl(43 74% 52%)" />
                    <circle cx={cx} cy={cy} r="5" fill="hsl(43 74% 52% / 0.25)" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 py-4">
          {/* Progress bar */}
          <div className="w-full h-1 surface-3 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${(visibleCount / allCandles.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Playback buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="w-8 h-8 rounded surface-2 border border-border flex items-center justify-center hover:border-gold/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Icon name="SkipBack" size={13} />
              </button>

              <button
                onClick={playing ? pause : play}
                className="w-10 h-10 rounded bg-gold text-background flex items-center justify-center hover:bg-gold/90 transition-colors"
              >
                <Icon name={playing ? "Pause" : "Play"} size={16} />
              </button>

              <button
                onClick={() => setVisibleCount(allCandles.length)}
                className="w-8 h-8 rounded surface-2 border border-border flex items-center justify-center hover:border-gold/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Icon name="SkipForward" size={13} />
              </button>
            </div>

            {/* Speed */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Скорость:</span>
              <div className="flex rounded border border-border overflow-hidden surface-2">
                {[["1×", 500], ["2×", 250], ["4×", 100]].map(([label, ms]) => (
                  <button
                    key={label}
                    onClick={() => setSpeed(ms as number)}
                    className={`px-2.5 py-1 text-xs transition-colors ${
                      speed === ms ? "bg-gold text-background font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Levels legend */}
            <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-px bg-gold inline-block" style={{ borderTop: "2px dashed hsl(43 74% 52%)" }} />
                Вход
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-px inline-block" style={{ borderTop: "2px dashed hsl(152 60% 42%)" }} />
                TP
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-px inline-block" style={{ borderTop: "2px dashed hsl(0 62% 50%)" }} />
                SL
              </span>
            </div>
          </div>
        </div>

        {/* Trade info row */}
        <div className="px-5 pb-5">
          <div className="grid grid-cols-4 gap-3 surface-2 rounded border border-border p-3">
            {[
              { label: "Вход", value: trade.entry, color: "text-gold" },
              { label: "Take Profit", value: trade.tp, color: "text-green-trade" },
              { label: "Stop Loss", value: trade.sl, color: "text-red-trade" },
              { label: "Результат", value: `${trade.pnl > 0 ? "+" : ""}${trade.pnl}%`, color: trade.pnl >= 0 ? "text-green-trade" : "text-red-trade" },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-muted-foreground mb-0.5">{f.label}</p>
                <p className={`text-sm font-semibold font-mono-ibm ${f.color}`}>{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
