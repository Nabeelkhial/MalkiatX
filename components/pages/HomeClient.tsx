"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/i18n";
import { ASSET_SLUGS, ASSET_COLORS } from "@/lib/data";
import { Section, SectionHead, Btn, Reveal, Dot, cx } from "@/components/ui";
import Pattern from "@/components/Pattern";
import { StarMark } from "@/components/Logo";
import GrowthCalculator from "@/components/charts/GrowthCalculator";
import { AssetIcon } from "@/components/AssetIcon";
import SilsilaSection from "@/components/Silsila";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HomeClient() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AssetsSection />
      <SilsilaSection />
      <HowSection />
      <GrowthTeaser />
      <PersonasSection />
      <TrustStrip />
      <DownloadCTA />
    </>
  );
}

/* -------------------------------------------------------------------- hero */

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-night text-cream">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      {/* legibility gradients (flip-safe: heavier at the start side) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/80 via-transparent to-night/90" />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-2/3 bg-gradient-to-r from-night/80 to-transparent rtl:bg-gradient-to-l" />

      <div className="container-x relative z-10 pb-28 pt-36">
        <div className="max-w-2xl">
          <p className="eyebrow-light">{t.home.eyebrow}</p>
          <h1 className="hero-h1 font-display mt-5 text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            {t.home.h1a}
            <br />
            <span className="italic text-gold-bright">{t.home.h1b}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-mint/90 sm:text-lg">{t.home.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Btn href="/#download">{t.common.startCta}</Btn>
            <Btn href="/assets" variant="outline-light">
              {t.common.exploreCta}
            </Btn>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {t.home.badges.map((b) => (
              <li key={b} className="chip border-cream/20 bg-night/40 text-cream/80 backdrop-blur">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* caption + asset legend for the 3D stream */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-x flex flex-col items-center gap-3 text-center">
          <p className="max-w-md text-xs text-cream/55">{t.home.streamCaption}</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {ASSET_SLUGS.map((s) => (
              <li key={s} className="flex items-center gap-1.5 text-xs text-cream/70">
                <Dot color={ASSET_COLORS[s]} />
                {t.common.assets[s].name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- stats */

function StatsStrip() {
  const { t } = useLang();
  return (
    <Section bg="night2" className="!py-12">
      <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {t.home.stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="font-display text-3xl font-semibold text-gold-bright sm:text-4xl">{s.v}</p>
            <p className="mt-2 max-w-[220px] text-sm text-mint/75">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ assets */

function AssetsSection() {
  const { t } = useLang();
  return (
    <Section bg="cream">
      <div className="container-x">
        <SectionHead eyebrow={t.nav.assets} title={t.home.assetsTitle} sub={t.home.assetsSub} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ASSET_SLUGS.map((slug, i) => (
            <Reveal key={slug} delay={i * 0.08}>
              <Link
                href={`/assets/${slug}`}
                className="card group block h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              >
                <span
                  className="inline-grid h-12 w-12 place-items-center rounded-xl"
                  style={{ background: `${ASSET_COLORS[slug]}22`, color: ASSET_COLORS[slug] }}
                >
                  <AssetIcon slug={slug} />
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold">{t.common.assets[slug].name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.common.assets[slug].short}</p>
                <p className="mt-5 text-sm font-semibold text-emerald transition group-hover:text-gold">
                  {t.home.assetCardCta} ↗
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------------- how */

function HowSection() {
  const { t } = useLang();
  return (
    <Section bg="sand">
      <Pattern className="text-emerald/[0.045]" />
      <div className="container-x relative">
        <SectionHead eyebrow="Auto-Pilot" title={t.home.how.title} sub={t.home.how.sub} center />
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {t.home.how.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12} className="relative text-center">
              <span className="font-display mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold bg-cream text-2xl font-semibold text-gold">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ growth teaser */

function GrowthTeaser() {
  const { t } = useLang();
  return (
    <Section bg="cream">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28">
          <SectionHead eyebrow={t.nav.learn} title={t.home.growthTitle} sub={t.home.growthSub} />
          <Reveal delay={0.15}>
            <Btn href="/learn" variant="emerald" className="mt-8">
              {t.home.growthCta}
            </Btn>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <GrowthCalculator />
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- personas */

const PERSONA_GRADIENTS = [
  "linear-gradient(135deg,#3fa7a0,#0e6b4f)",
  "linear-gradient(135deg,#7e9be0,#3fa7a0)",
  "linear-gradient(135deg,#d9ad4f,#a3742a)",
  "linear-gradient(135deg,#5fbf8c,#0e6b4f)",
];

function PersonasSection() {
  const { t } = useLang();
  return (
    <Section bg="sand">
      <div className="container-x">
        <SectionHead eyebrow={t.nav.journey} title={t.home.personasTitle} sub={t.home.personasSub} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.personas.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <figure className="card flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full text-base font-bold text-white"
                    style={{ background: PERSONA_GRADIENTS[i] }}
                  >
                    {p.name.charAt(0)}
                  </span>
                  <figcaption>
                    <p className="text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-ink-soft">{p.role}</p>
                  </figcaption>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  “{p.quote}”
                </blockquote>
                <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-emerald">{p.uses}</p>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Btn href="/journey" variant="outline">
            {t.nav.journey}
          </Btn>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- trust strip */

function TrustStrip() {
  const { t } = useLang();
  return (
    <Section bg="night">
      <Pattern className="text-gold/[0.05]" />
      <div className="container-x relative">
        <SectionHead eyebrow={t.nav.trust} title={t.home.trustTitle} sub={t.home.trustSub} dark center />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.home.trustPoints.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card-dark h-full p-7">
                <StarMark size={22} />
                <h3 className="mt-4 text-lg font-bold text-cream">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mint/75">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Btn href="/trust" variant="outline-light">
            {t.home.trustCta}
          </Btn>
        </Reveal>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- download */

export function DownloadCTA() {
  const { t } = useLang();
  return (
    <Section bg="night2" id="download" className="!py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-night-3 via-night-2 to-night p-10 text-center shadow-glow sm:p-16">
            <Pattern className="text-gold/[0.06]" />
            <div className="relative">
              <StarMark size={40} />
              <h2 className="font-display mx-auto mt-6 max-w-xl text-3xl font-semibold text-cream sm:text-4xl">
                {t.home.downloadTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-mint/80">{t.home.downloadSub}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <StoreButton store={t.common.appStore} note={t.common.comingSoon} icon="apple" />
                <StoreButton store={t.common.playStore} note={t.common.comingSoon} icon="play" />
              </div>
              <p className="mt-7 text-xs text-cream/50">{t.home.downloadNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function StoreButton({ store, note, icon }: { store: string; note: string; icon: "apple" | "play" }) {
  return (
    <span className="inline-flex cursor-default items-center gap-3 rounded-2xl border border-cream/25 bg-night/60 px-5 py-3 text-start backdrop-blur transition hover:border-gold-bright">
      {icon === "apple" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream">
          <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
        </svg>
      )}
      <span>
        <span className="block text-[10px] uppercase tracking-wider text-cream/55">{note}</span>
        <span className="ltr-isolate block text-sm font-bold text-cream">{store}</span>
      </span>
    </span>
  );
}
