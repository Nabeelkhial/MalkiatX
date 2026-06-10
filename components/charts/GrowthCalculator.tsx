"use client";

import { useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { TIERS, futureValue, type TierId } from "@/lib/data";
import { formatPKR, formatPKRShort } from "@/lib/format";
import { cx, Disclaimer } from "@/components/ui";

const W = 560;
const H = 270;
const PAD_B = 24;

export default function GrowthCalculator() {
  const { t, lang } = useLang();
  const [monthly, setMonthly] = useState(10_000);
  const [years, setYears] = useState(10);
  const [tier, setTier] = useState<TierId>("balanced");
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const rate = TIERS[tier].rate;

  const series = useMemo(() => {
    const pts: { y: number; contrib: number; value: number }[] = [];
    for (let y = 0; y <= years; y++) {
      pts.push({ y, contrib: monthly * 12 * y, value: futureValue(monthly, rate, y) });
    }
    return pts;
  }, [monthly, years, rate]);

  const maxV = series[series.length - 1].value * 1.06;
  const px = (y: number) => (y / years) * W;
  const py = (v: number) => H - PAD_B - (v / maxV) * (H - PAD_B - 10);

  const line = (key: "contrib" | "value") =>
    series.map((p, i) => `${i === 0 ? "M" : "L"}${px(p.y).toFixed(1)},${py(p[key]).toFixed(1)}`).join(" ");
  const area = (key: "contrib" | "value") =>
    `${line(key)} L${W},${H - PAD_B} L0,${H - PAD_B} Z`;

  const end = series[series.length - 1];
  const multiple = end.contrib > 0 ? (end.value / end.contrib).toFixed(1) : "0";
  const hovered = hover !== null ? series[hover] : null;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    setHover(Math.max(0, Math.min(years, Math.round((x / W) * years))));
  };

  const xStep = Math.max(1, Math.round(years / 6));

  return (
    <div className="card overflow-hidden bg-white/90 p-5 sm:p-8">
      {/* controls */}
      <div className="grid gap-6 sm:grid-cols-2">
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

      {/* tier chips */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="me-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">{t.learn.calc.tier}</span>
        {(Object.keys(TIERS) as TierId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTier(id)}
            className={cx(
              "chip transition",
              tier === id ? "border-emerald bg-emerald text-cream" : "border-line bg-white text-ink-soft hover:border-emerald/50"
            )}
          >
            {t.common.tiers[id].name}
            <span className="ltr-isolate opacity-75">{Math.round(TIERS[id].rate * 100)}%</span>
          </button>
        ))}
      </div>

      {/* chart */}
      <div className="ltr-isolate relative mt-6" dir="ltr">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair touch-none select-none"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="gcv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#c9a24b" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="gcc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e6b4f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0e6b4f" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* gridlines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <g key={f}>
              <line x1="0" x2={W} y1={py(maxV * f)} y2={py(maxV * f)} stroke="#15211b" strokeOpacity="0.07" />
              <text x="4" y={py(maxV * f) - 5} fontSize="10" fill="#54655c">
                {formatPKRShort(maxV * f)}
              </text>
            </g>
          ))}

          <path d={area("value")} fill="url(#gcv)" />
          <path d={line("value")} fill="none" stroke="#c9a24b" strokeWidth="2.5" />
          <path d={area("contrib")} fill="url(#gcc)" />
          <path d={line("contrib")} fill="none" stroke="#0e6b4f" strokeWidth="2" strokeDasharray="1 0" />

          {/* x labels */}
          {series
            .filter((p) => p.y % xStep === 0)
            .map((p) => (
              <text key={p.y} x={px(p.y)} y={H - 7} fontSize="10" fill="#54655c" textAnchor="middle">
                {p.y}
              </text>
            ))}

          {/* hover guide */}
          {hovered && (
            <g>
              <line x1={px(hovered.y)} x2={px(hovered.y)} y1="6" y2={H - PAD_B} stroke="#15211b" strokeOpacity="0.25" strokeDasharray="3 3" />
              <circle cx={px(hovered.y)} cy={py(hovered.value)} r="4.5" fill="#c9a24b" stroke="#fff" strokeWidth="2" />
              <circle cx={px(hovered.y)} cy={py(hovered.contrib)} r="4" fill="#0e6b4f" stroke="#fff" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute top-2 rounded-xl border border-line bg-white/95 px-3.5 py-2.5 text-xs shadow-card"
            style={{
              left: `${(px(hovered.y) / W) * 100}%`,
              transform: px(hovered.y) > W * 0.62 ? "translateX(-108%)" : "translateX(8%)",
            }}
          >
            <p className="font-bold text-ink">
              {t.learn.calc.year} {hovered.y}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-gold" style={{ color: "#a07f2f" }}>
              <i className="h-2 w-2 rounded-full" style={{ background: "#c9a24b" }} />
              {formatPKR(hovered.value, lang)}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-emerald">
              <i className="h-2 w-2 rounded-full" style={{ background: "#0e6b4f" }} />
              {formatPKR(hovered.contrib, lang)}
            </p>
          </div>
        )}
      </div>

      {/* results */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-sand/70 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#0e6b4f" }} />
            {t.learn.calc.contributed}
          </p>
          <p className="mt-1.5 text-lg font-bold text-ink">{formatPKR(end.contrib, lang)}</p>
        </div>
        <div className="rounded-xl bg-gold-soft/60 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <i className="h-2.5 w-2.5 rounded-full" style={{ background: "#c9a24b" }} />
            {t.learn.calc.value}
          </p>
          <p className="mt-1.5 text-lg font-bold text-ink">{formatPKR(end.value, lang)}</p>
        </div>
        <div className="rounded-xl bg-night p-4 text-cream">
          <p className="text-xs font-semibold text-mint/80">{t.common.tiers[tier].name}</p>
          <p className="mt-1.5 text-lg font-bold text-gold-bright">
            <span className="ltr-isolate">{multiple}</span> {t.learn.calc.multiple}
          </p>
        </div>
      </div>

      <Disclaimer text={t.common.illustrative} />
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
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</span>
        <span className="text-base font-bold text-ink">{display}</span>
      </span>
      <input
        type="range"
        className="slider mt-3"
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
