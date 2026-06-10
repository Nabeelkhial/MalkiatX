"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { ASSET_SLUGS, ASSET_COLORS, type AssetSlug } from "@/lib/data";
import { Section, Reveal, SectionHead, cx } from "@/components/ui";
import { AssetIcon } from "@/components/AssetIcon";
import { StarMark } from "@/components/Logo";

const AssetOrbit = dynamic(() => import("@/components/three/AssetOrbit"), {
  ssr: false,
  loading: () => null,
});

export default function AssetsClient() {
  const { t } = useLang();
  const [selected, setSelected] = useState<AssetSlug>("property");
  const detail = t.assetDetail.items[selected];

  return (
    <>
      {/* hero + constellation */}
      <section className="relative overflow-hidden bg-night pb-20 pt-36 text-cream">
        <div className="container-x relative">
          <div className="max-w-2xl">
            <p className="eyebrow-light">{t.assetsPage.eyebrow}</p>
            <h1 className="hero-h1 font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {t.assetsPage.title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-mint/85 sm:text-lg">{t.assetsPage.sub}</p>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* 3D constellation */}
            <div className="relative h-[380px] sm:h-[460px]">
              <AssetOrbit selected={selected} onSelect={setSelected} />
              <p className="pointer-events-none absolute bottom-1 start-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-cream/45 rtl:translate-x-1/2">
                {t.assetsPage.orbitHint}
              </p>
            </div>

            {/* selection chips + detail panel */}
            <div>
              <div className="flex flex-wrap gap-2">
                {ASSET_SLUGS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelected(s)}
                    className={cx(
                      "chip transition",
                      selected === s ? "border-transparent text-night" : "border-white/20 text-cream/75 hover:border-white/50"
                    )}
                    style={selected === s ? { background: ASSET_COLORS[s] } : undefined}
                  >
                    {t.common.assets[s].name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="card-dark mt-4 p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ background: `${ASSET_COLORS[selected]}26`, color: ASSET_COLORS[selected] }}
                    >
                      <AssetIcon slug={selected} />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-cream">
                        {t.common.assets[selected].name}
                      </h2>
                      <p className="text-xs text-mint/70">{detail.tagline}</p>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-cream/50">{t.assetsPage.panelOwn}</dt>
                      <dd className="mt-1 leading-relaxed text-mint/85">{detail.own}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-cream/50">{t.assetsPage.panelIncome}</dt>
                      <dd className="mt-1 leading-relaxed text-mint/85">{detail.income}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-semibold text-gold-bright">
                    <StarMark size={14} />
                    {t.assetsPage.certText}
                  </p>

                  <Link href={`/assets/${selected}`} className="btn btn-gold mt-5 w-full">
                    {t.assetsPage.open}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* comparison grid */}
      <Section bg="cream">
        <div className="container-x">
          <SectionHead title={t.assetsPage.gridTitle} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ASSET_SLUGS.map((slug, i) => {
              const d = t.assetDetail.items[slug];
              return (
                <Reveal key={slug} delay={i * 0.06}>
                  <Link
                    href={`/assets/${slug}`}
                    className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl"
                        style={{ background: `${ASSET_COLORS[slug]}22`, color: ASSET_COLORS[slug] }}
                      >
                        <AssetIcon slug={slug} />
                      </span>
                      <h3 className="font-display text-xl font-semibold">{t.common.assets[slug].name}</h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{d.tagline}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs">
                      <MiniStat k={t.assetDetail.labels.min} v={d.mech.min} />
                      <MiniStat k={t.assetDetail.labels.liquidity} v={d.mech.liquidity} />
                      <MiniStat k={t.assetDetail.labels.incomeL} v={d.mech.income} />
                      <MiniStat k={t.assetDetail.labels.horizon} v={d.mech.horizon} />
                    </dl>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

function MiniStat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-bold uppercase tracking-wider text-ink-soft/70">{k}</dt>
      <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
    </div>
  );
}
