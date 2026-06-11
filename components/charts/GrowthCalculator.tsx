"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { TIERS, futureValue, type TierId } from "@/lib/data";
import { formatPKR, formatPKRShort } from "@/lib/format";
import { cx, Octagon } from "@/components/ui";

const W = 560;
const H = 260;
const PAD_B = 22;
// Wealth milestones marked on the curve: 10 lakh, 50 lakh, 1 / 5 / 10 crore
const MILESTONES = [1_000_000, 5_000_000, 10_000_000, 50_000_000, 100_000_000];

/** Eased count-up so the big readouts roll to their new value. */
function useCountUp(target: number, dur = 650) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target, dur]);
  return value;
}

export default function GrowthCalculator() {
  const { t, lang } = useLang();
  const [monthly, setMonthly] = useState(10_000);
  const [years, setYears] = useState(10);
  const [tier, setTier] = useState<TierId>("balanced");
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gridId = useId().replace(/[:]/g, "");

  const rate = TIERS[tier].rate;

  const series = useMemo(() => {
    const pts: { y: number; contrib: number; value: number }[] = [];
    for (let y = 0; y <= years; y++) {
      pts.push({ y, contrib: monthly * 12 * y, value: futureValue(monthly, rate, y) });
    }
    return pts;
  }, [monthly, years, rate]);

  const end = series[series.length - 1];
  const maxV = end.value * 1.08;
  // Round to 0.1px: Math.pow can differ by 1 ulp between server and browser
  // engines, and raw floats in SVG attributes would break hydration.
  const px = (y: number) => +((y / years) * W).toFixed(1);
  const py = (v: number) => +(H - PAD_B - (v / maxV) * (H - PAD_B - 14)).toFixed(1);

  const line = (key: "contrib" | "value") =>
    series.map((p, i) => `${i === 0 ? "M" : "L"}${px(p.y).toFixed(1)},${py(p[key]).toFixed(1)}`).join(" ");
  const area = (key: "contrib" | "value") => `${line(key)} L${W},${H - PAD_B} L0,${H - PAD_B} Z`;

  const lineD = line("value");
  const chartKey = `${monthly}-${years}-${tier}`;

  const milestones = MILESTONES.filter((m) => end.value >= m)
    .slice(-2)
    .map((m) => {
      const idx = series.findIndex((p) => p.value >= m);
      return { x: px(series[idx].y), y: py(series[idx].value), label: formatPKRShort(m) };
    });

  const multiple = end.contrib > 0 ? (end.value / end.contrib).toFixed(1) : "0";
  const hovered = hover !== null && hover < series.length ? series[hover] : null;

  const animContrib = useCountUp(end.contrib);
  const animValue = useCountUp(end.value);
  const tokens = Math.max(1, Math.floor(animContrib / 5000));

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    setHover(Math.max(0, Math.min(years, Math.round((x / W) * years))));
  };

  const xStep = Math.max(1, Math.round(years / 6));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-night text-cream shadow-glow">
      {/* holo backdrop: fine grid + ambient glows */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
        <defs>
          <pattern id={`hgrid-${gridId}`} width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M42 0H0v42" fill="none" stroke="#e7c878" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hgrid-${gridId})`} />
      </svg>
      <div className="pointer-events-none absolute -start-20 -top-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -end-16 h-72 w-72 rounded-full bg-emerald/25 blur-3xl" />

      <div className="relative p-5 sm:p-8">
        {/* console header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-bright">
            <Octagon size={14} />
            {t.learn.calc.engine}
            <span className="relative ms-1 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-bright" />
            </span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(TIERS) as TierId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTier(id)}
                className={cx(
                  "chip transition",
                  tier === id
                    ? "border-gold bg-gold text-night shadow-glow"
                    : "border-white/15 text-cream/65 hover:border-gold/60 hover:text-cream"
                )}
              >
                {t.common.tiers[id].name}
                <span className="ltr-isolate opacity-75">{Math.round(TIERS[id].rate * 100)}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <SliderField
            label={t.learn.calc.monthly}
            display={formatPKR(monthly, lang)}
            min={1000}
            max={100000}
            step={1000}
            value={monthly}
            onChange={setMonthly}
          />
          <SliderField
            label={t.learn.calc.years}
            display={`${years}`}
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={setYears}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[5000, 10000, 25000, 50000].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setMonthly(v)}
              className={cx(
                "chip ltr-isolate transition",
                monthly === v ? "border-emerald-bright bg-emerald/30 text-mint" : "border-white/12 text-cream/55 hover:border-emerald-bright/60"
              )}
            >
              {v.toLocaleString("en-US")}
            </button>
          ))}
        </div>

        {/* chart */}
        <div className="ltr-isolate relative mt-7" dir="ltr">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full cursor-crosshair touch-none select-none"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id={`gv-${gridId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e7c878" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e7c878" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id={`gc-${gridId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2e9e78" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2e9e78" stopOpacity="0.02" />
              </linearGradient>
              <filter id={`glow-${gridId}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* gridlines */}
            {[0.25, 0.5, 0.75].map((f) => (
              <g key={f}>
                <line x1="0" x2={W} y1={py(maxV * f)} y2={py(maxV * f)} stroke="#faf6ed" strokeOpacity="0.07" />
                <text x="4" y={py(maxV * f) - 5} fontSize="10" fill="rgba(250,246,237,0.4)">
                  {formatPKRShort(maxV * f)}
                </text>
              </g>
            ))}

            {/* animated series (remounts on input change to redraw) */}
            <g key={chartKey}>
              <path className="area-fade" d={area("value")} fill={`url(#gv-${gridId})`} />
              <path className="area-fade" d={area("contrib")} fill={`url(#gc-${gridId})`} />
              <path
                className="chart-draw"
                pathLength={1}
                d={line("contrib")}
                fill="none"
                stroke="#2e9e78"
                strokeWidth="1.8"
                strokeDasharray="1"
              />
              <path
                className="chart-draw"
                pathLength={1}
                d={lineD}
                fill="none"
                stroke="#e7c878"
                strokeWidth="2.6"
                filter={`url(#glow-${gridId})`}
              />
              {/* spark traveling along the curve */}
              <g className="motion-reduce:hidden">
                <circle r="6" fill="#e7c878" opacity="0.25">
                  <animateMotion dur="5s" repeatCount="indefinite" path={lineD} />
                </circle>
                <circle r="2.6" fill="#fff7e0">
                  <animateMotion dur="5s" repeatCount="indefinite" path={lineD} />
                </circle>
              </g>
              {/* end-point beacon */}
              <circle cx={px(end.y)} cy={py(end.value)} r="4.5" fill="#e7c878" stroke="#062019" strokeWidth="2" />

              {/* milestone markers */}
              {milestones.map((m, i) => (
                <g key={i} transform={`translate(${m.x}, ${m.y})`}>
                  <path d="M0 -7l1.8 3 3 1.8-3 1.8-1.8 3-1.8-3-3-1.8 3-1.8 1.8-3z" fill="#e7c878" opacity="0.9" />
                  <text y="-12" fontSize="10" fontWeight="700" fill="#e7c878" textAnchor="middle">
                    {m.label}
                  </text>
                </g>
              ))}
            </g>

            {/* x labels */}
            {series
              .filter((p) => p.y % xStep === 0)
              .map((p) => (
                <text key={p.y} x={px(p.y)} y={H - 6} fontSize="10" fill="rgba(250,246,237,0.4)" textAnchor="middle">
                  {p.y}
                </text>
              ))}

            {/* hover guide */}
            {hovered && (
              <g>
                <line x1={px(hovered.y)} x2={px(hovered.y)} y1="6" y2={H - PAD_B} stroke="#faf6ed" strokeOpacity="0.3" strokeDasharray="3 3" />
                <circle cx={px(hovered.y)} cy={py(hovered.value)} r="4.5" fill="#e7c878" stroke="#062019" strokeWidth="2" />
                <circle cx={px(hovered.y)} cy={py(hovered.contrib)} r="3.6" fill="#2e9e78" stroke="#062019" strokeWidth="2" />
              </g>
            )}
          </svg>

          {hovered && (
            <div
              className="pointer-events-none absolute top-2 rounded-xl border border-white/15 bg-night-2/95 px-3.5 py-2.5 text-xs shadow-card backdrop-blur"
              style={{
                left: `${(px(hovered.y) / W) * 100}%`,
                transform: px(hovered.y) > W * 0.62 ? "translateX(-108%)" : "translateX(8%)",
              }}
            >
              <p className="font-bold text-cream">
                {t.learn.calc.year} {hovered.y}
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-gold-bright">
                <i className="h-2 w-2 rounded-full bg-gold-bright" />
                {formatPKR(hovered.value, lang)}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-emerald-bright">
                <i className="h-2 w-2 rounded-full bg-emerald-bright" />
                {formatPKR(hovered.contrib, lang)}
              </p>
            </div>
          )}
        </div>

        {/* readouts */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cream/50">
              <i className="h-2 w-2 rounded-full bg-emerald-bright" />
              {t.learn.calc.contributed}
            </p>
            <p className="mt-1.5 text-lg font-bold text-mint">{formatPKR(Math.round(animContrib), lang)}</p>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cream/50">
              <i className="h-2 w-2 rounded-full bg-gold-bright" />
              {t.learn.calc.value}
            </p>
            <p className="font-display mt-1.5 text-xl font-semibold text-gold-bright">
              {formatPKR(Math.round(animValue), lang)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-cream/50">{t.common.tiers[tier].name}</p>
            <p className="mt-1.5 text-lg font-bold text-cream">
              <span className="ltr-isolate text-gold-bright">{multiple}</span> {t.learn.calc.multiple}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-cream/55">
              <Octagon size={10} />
              <span className="ltr-isolate font-semibold text-cream/80">{tokens.toLocaleString("en-US")}</span>
              {t.learn.calc.tokens}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-cream/40">{t.common.illustrative}</p>
      </div>
    </div>
  );
}

function SliderField({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-cream/50">{label}</span>
        <span className="text-base font-bold text-gold-bright">{display}</span>
      </span>
      <input
        type="range"
        className="slider slider-dark mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ backgroundSize: `${pct}% 100%` }}
        dir="ltr"
      />
    </label>
  );
}
