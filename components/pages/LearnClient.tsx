"use client";

import { useLang } from "@/lib/i18n";
import { Section, SectionHead, Btn, Reveal, Accordion, cx } from "@/components/ui";
import Pattern from "@/components/Pattern";
import GrowthCalculator from "@/components/charts/GrowthCalculator";
import TierExplorer from "@/components/charts/Allocation";

export default function LearnClient() {
  const { t } = useLang();
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-night pb-20 pt-40 text-cream">
        <Pattern className="text-gold/[0.05]" />
        <GrowthMotif />
        <div className="container-x relative">
          <p className="eyebrow-light">{t.learn.eyebrow}</p>
          <h1 className="hero-h1 font-display mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {t.learn.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-mint/85 sm:text-lg">{t.learn.sub}</p>
        </div>
      </section>

      {/* why passive */}
      <Section bg="cream">
        <div className="container-x">
          <SectionHead title={t.learn.why.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.learn.why.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card h-full p-7">
                  <span className="font-display text-3xl font-semibold text-gold">{`0${i + 1}`}</span>
                  <h3 className="mt-3 text-lg font-bold">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* riba vs halal */}
      <Section bg="night">
        <Pattern className="text-gold/[0.04]" />
        <div className="container-x relative">
          <SectionHead title={t.learn.riba.title} sub={t.learn.riba.sub} dark center />
          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-white/[0.06] text-xs font-bold sm:text-sm">
                <div className="p-4 sm:p-5" />
                <div className="p-4 text-cream/60 sm:p-5">{t.learn.riba.headA}</div>
                <div className="bg-gold/15 p-4 text-gold-bright sm:p-5">{t.learn.riba.headB}</div>
              </div>
              {t.learn.riba.rows.map((row, i) => (
                <div
                  key={i}
                  className={cx("grid grid-cols-[1.1fr_1fr_1fr] text-xs sm:text-sm", i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.045]")}
                >
                  <div className="p-4 font-semibold text-cream/90 sm:p-5">{row.q}</div>
                  <div className="p-4 text-cream/55 sm:p-5">{row.a}</div>
                  <div className="bg-gold/[0.07] p-4 font-medium text-mint sm:p-5">{row.b}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-cream/45">{t.learn.riba.note}</p>
          </Reveal>
        </div>
      </Section>

      {/* calculator */}
      <Section bg="sand" id="calculator">
        <div className="container-x">
          <SectionHead title={t.learn.calc.title} sub={t.learn.calc.sub} center />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <GrowthCalculator />
          </Reveal>
        </div>
      </Section>

      {/* risk tiers */}
      <Section bg="cream">
        <div className="container-x">
          <SectionHead title={t.learn.tiers.title} sub={t.learn.tiers.sub} />
          <Reveal className="mt-10">
            <TierExplorer />
          </Reveal>
        </div>
      </Section>

      {/* autopilot */}
      <Section bg="night2">
        <div className="container-x">
          <SectionHead title={t.learn.autopilot.title} sub={t.learn.autopilot.sub} dark center />
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <span className="absolute inset-x-12 top-7 hidden h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 lg:block" />
            {t.learn.autopilot.steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.12} className="relative text-center">
                <span className="font-display relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-night-2 text-xl font-semibold text-gold-bright">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-cream">{s.t}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-mint/70">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* faq */}
      <Section bg="cream">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead title={t.learn.faq.title} />
          <Reveal>
            <Accordion items={t.learn.faq.items} />
          </Reveal>
        </div>
      </Section>

      {/* cta */}
      <Section bg="sand" className="!py-20">
        <div className="container-x text-center">
          <SectionHead title={t.learn.cta.title} sub={t.learn.cta.sub} center />
          <Reveal className="mt-8">
            <Btn href="/journey">{t.learn.cta.btn}</Btn>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/** Decorative compounding curve behind the learn hero. */
function GrowthMotif() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-0 end-0 h-3/4 w-full max-w-3xl opacity-60"
    >
      <defs>
        <linearGradient id="lg-hero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,290 C200,285 380,240 600,40 L600,300 L0,300 Z" fill="url(#lg-hero)" />
      <path d="M0,290 C200,285 380,240 600,40" fill="none" stroke="#e7c878" strokeWidth="2" strokeOpacity="0.7" />
      <path d="M0,292 C220,289 420,272 600,200" fill="none" stroke="#2e9e78" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="5 5" />
    </svg>
  );
}
