"use client";

import { useState, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { ASSET_SLUGS, ASSET_COLORS, TIERS, type TierId } from "@/lib/data";
import { cx, Disclaimer } from "@/components/ui";

/* ------------------------------------------------------------------ donut */

export function AllocationDonut({
  alloc,
  size = 190,
  stroke = 30,
  center,
  trackColor = "rgba(20,33,27,0.06)",
}: {
  alloc: Record<string, number>;
  size?: number;
  stroke?: number;
  center?: ReactNode;
  trackColor?: string;
}) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="ltr-isolate relative inline-block" dir="ltr" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        {ASSET_SLUGS.map((slug) => {
          const pct = alloc[slug] ?? 0;
          const dash = (pct / 100) * C;
          const offset = -(acc / 100) * C;
          acc += pct;
          return (
            <circle
              key={slug}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={ASSET_COLORS[slug]}
              strokeWidth={stroke}
              strokeDasharray={`${Math.max(dash - 2, 0)} ${C}`}
              strokeDashoffset={offset - 1}
              style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.16,1,0.3,1), stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)" }}
            />
          );
        })}
      </svg>
      {center && <div className="absolute inset-0 grid place-items-center text-center">{center}</div>}
    </div>
  );
}

export function AllocationLegend({ alloc, dark }: { alloc: Record<string, number>; dark?: boolean }) {
  const { t } = useLang();
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
      {ASSET_SLUGS.map((slug) => (
        <li key={slug} className="flex items-center gap-2.5 text-sm">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: ASSET_COLORS[slug] }} />
          <span className={cx("flex-1", dark ? "text-cream/85" : "text-ink")}>{t.common.assets[slug].name}</span>
          <span className={cx("ltr-isolate font-bold", dark ? "text-gold-bright" : "text-ink")}>{alloc[slug]}%</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------- interactive explorer */

export default function TierExplorer() {
  const { t } = useLang();
  const [tier, setTier] = useState<TierId>("balanced");
  const data = TIERS[tier];

  return (
    <div className="card grid gap-8 bg-white/90 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="mx-auto">
        <AllocationDonut
          alloc={data.alloc}
          size={230}
          stroke={34}
          center={
            <div>
              <p className="text-2xl font-bold text-ink ltr-isolate">{Math.round(data.rate * 100)}%</p>
              <p className="mx-auto max-w-[110px] text-[11px] leading-tight text-ink-soft">{t.common.perYear}</p>
            </div>
          }
        />
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TIERS) as TierId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTier(id)}
              className={cx(
                "btn !px-5 !py-2.5",
                id === tier ? "btn-emerald" : "border border-line bg-white text-ink-soft hover:border-emerald/50"
              )}
            >
              {t.common.tiers[id].name}
            </button>
          ))}
        </div>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">{t.common.tiers[tier].desc}</p>
        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">{t.learn.tiers.allocation}</p>
          <AllocationLegend alloc={data.alloc} />
        </div>
        <Disclaimer text={t.common.illustrative} />
      </div>
    </div>
  );
}
