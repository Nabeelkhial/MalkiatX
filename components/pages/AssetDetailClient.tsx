"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/i18n";
import { ASSET_SLUGS, ASSET_COLORS, type AssetSlug } from "@/lib/data";
import { Section, SectionHead, Btn, Reveal, Disclaimer } from "@/components/ui";
import Pattern from "@/components/Pattern";
import { AssetIcon } from "@/components/AssetIcon";
import { StarMark } from "@/components/Logo";
import { DownloadCTA } from "@/components/pages/HomeClient";

const AssetMini = dynamic(() => import("@/components/three/AssetMini"), {
  ssr: false,
  loading: () => null,
});

export default function AssetDetailClient({ slug }: { slug: AssetSlug }) {
  const { t } = useLang();
  const d = t.assetDetail.items[slug];
  const L = t.assetDetail.labels;
  const color = ASSET_COLORS[slug];
  const others = ASSET_SLUGS.filter((s) => s !== slug);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-night pb-16 pt-36 text-cream">
        <Pattern className="text-gold/[0.04]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Link href="/assets" className="text-xs font-semibold text-cream/60 transition hover:text-gold-bright">
              ← {L.backToAll}
            </Link>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${color}26`, color }}>
                <AssetIcon slug={slug} size={30} />
              </span>
              <h1 className="hero-h1 font-display text-4xl font-semibold sm:text-5xl">{t.common.assets[slug].name}</h1>
            </div>
            <p className="mt-5 max-w-xl text-lg text-mint/90">{d.tagline}</p>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-3">
              <HeroStat k={L.min} v={d.mech.min} />
              <HeroStat k={L.incomeL} v={d.mech.income} />
              <HeroStat k={L.liquidity} v={d.mech.liquidity} />
              <HeroStat k={L.horizon} v={d.mech.horizon} />
            </dl>
            <div className="mt-9 flex flex-wrap gap-4">
              <Btn href="/#download">{t.common.startCta}</Btn>
              <Btn href="/trust" variant="outline-light">
                {t.nav.trust}
              </Btn>
            </div>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[340px] sm:h-[340px]">
            <div
              className="absolute inset-6 rounded-full opacity-30 blur-3xl"
              style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
            />
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
              <AssetMini slug={slug} />
            </div>
          </div>
        </div>
      </section>

      {/* what you own / income */}
      <Section bg="cream" className="!py-20">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <p className="eyebrow">{L.own}</p>
              <p className="mt-3 leading-relaxed text-ink">{d.own}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-8">
              <p className="eyebrow">{L.income}</p>
              <p className="mt-3 leading-relaxed text-ink">{d.income}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* tokenization steps */}
      <Section bg="sand" className="!py-20">
        <div className="container-x">
          <SectionHead title={L.howTitle} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {d.how.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card relative h-full p-7">
                  <span
                    className="font-display grid h-10 w-10 place-items-center rounded-full text-lg font-semibold text-white"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-ink">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* shariah */}
      <Section bg="night" className="!py-20">
        <Pattern className="text-gold/[0.05]" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead title={L.shariahTitle} dark />
            <ul className="mt-8 space-y-4">
              {d.shariah.map((point, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <li className="flex gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald/40 text-xs text-mint">✓</span>
                    <p className="text-sm leading-relaxed text-mint/90 sm:text-base">{point}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent p-8 text-center shadow-glow">
              <StarMark size={36} />
              <p className="font-display mt-5 text-xl font-semibold text-gold-bright">{L.certCard}</p>
              <Btn href="/trust#fatwas" variant="outline-light" className="mt-7">
                {t.trust.fatwaTitle}
              </Btn>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* risks */}
      <Section bg="cream" className="!py-20">
        <div className="container-x">
          <SectionHead title={L.riskTitle} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {d.risks.map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-full gap-3.5 rounded-2xl border border-gold/50 bg-gold-soft/40 p-6">
                  <span className="font-display text-xl text-gold">!</span>
                  <p className="text-sm leading-relaxed text-ink">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Disclaimer text={t.common.illustrative} />
        </div>
      </Section>

      {/* other assets */}
      <Section bg="sand" className="!py-20">
        <div className="container-x">
          <SectionHead title={L.othersTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s} delay={i * 0.07}>
                <Link
                  href={`/assets/${s}`}
                  className="card group flex items-center gap-3 p-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                    style={{ background: `${ASSET_COLORS[s]}22`, color: ASSET_COLORS[s] }}
                  >
                    <AssetIcon slug={s} size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.common.assets[s].name}</span>
                    <span className="block text-xs text-ink-soft">{t.common.assets[s].short}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <DownloadCTA />
    </>
  );
}

function HeroStat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
      <dt className="text-[10px] font-bold uppercase tracking-wider text-cream/50">{k}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-cream">{v}</dd>
    </div>
  );
}
