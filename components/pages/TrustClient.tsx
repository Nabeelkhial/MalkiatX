"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Section, SectionHead, Btn, Reveal, Accordion, cx } from "@/components/ui";
import Pattern from "@/components/Pattern";
import { StarMark } from "@/components/Logo";
import { LAYER_COLORS } from "@/components/three/TrustStack";

const TrustStack = dynamic(() => import("@/components/three/TrustStack"), {
  ssr: false,
  loading: () => null,
});

export default function TrustClient() {
  const { t } = useLang();
  const [layer, setLayer] = useState(0);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-night pb-12 pt-40 text-cream">
        <Pattern className="text-gold/[0.05]" />
        <div className="container-x relative">
          <p className="eyebrow-light">{t.trust.eyebrow}</p>
          <h1 className="hero-h1 font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {t.trust.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-mint/85 sm:text-lg">{t.trust.sub}</p>
        </div>
      </section>

      {/* interactive trust architecture */}
      <Section bg="night2" className="!pt-10">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative h-[380px] sm:h-[440px]">
            <TrustStack count={t.trust.layers.length} selected={layer} onSelect={setLayer} />
            <p className="pointer-events-none absolute bottom-0 start-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-cream/45 rtl:translate-x-1/2">
              {t.trust.stackHint}
            </p>
          </Reveal>

          <div>
            <ul className="space-y-2">
              {t.trust.layers.map((l, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setLayer(i)}
                    className={cx(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start transition",
                      layer === i ? "border-gold/60 bg-gold/10" : "border-white/10 bg-white/[0.03] hover:border-white/30"
                    )}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold"
                      style={{ background: `${LAYER_COLORS[i]}33`, color: LAYER_COLORS[i] }}
                    >
                      {i + 1}
                    </span>
                    <span className={cx("text-sm font-semibold", layer === i ? "text-gold-bright" : "text-cream/85")}>
                      {l.t}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={layer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="card-dark mt-4 p-6"
              >
                <p className="text-sm leading-relaxed text-mint/85">{t.trust.layers[layer].d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* shariah board */}
      <Section bg="cream">
        <div className="container-x">
          <SectionHead eyebrow={t.trust.eyebrow} title={t.trust.boardTitle} sub={t.trust.boardNote} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.trust.board.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card h-full p-7 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald to-night-3 text-xl font-bold text-gold-bright">
                    {m.name.charAt(0)}
                  </span>
                  <h3 className="mt-4 text-base font-bold">{m.name}</h3>
                  <p className="mt-1 text-xs text-ink-soft">{m.role}</p>
                  <p className="mt-4 inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold text-emerald">
                    {m.focus}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* fatwa library */}
      <Section bg="sand" id="fatwas" className="!py-20">
        <div className="container-x">
          <SectionHead title={t.trust.fatwaTitle} />
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white/70">
            {t.trust.docs.map((doc, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={cx("flex flex-wrap items-center gap-3 px-5 py-4 sm:px-7", i > 0 && "border-t border-line")}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald/10 text-emerald">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M6 2h9l5 5v15H6V2z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{doc.t}</p>
                    <p className="text-xs text-ink-soft">{doc.date}</p>
                  </div>
                  <span className="chip border-gold/50 bg-gold-soft/50 text-ink-soft">{t.trust.fatwaBadge}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* video library */}
      <Section bg="night" className="!py-20">
        <Pattern className="text-gold/[0.04]" />
        <div className="container-x relative">
          <SectionHead title={t.trust.videoTitle} dark />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.videos.map((v, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group cursor-default overflow-hidden rounded-2xl border border-white/10">
                  <div
                    className="relative grid h-36 place-items-center"
                    style={{ background: `linear-gradient(135deg, ${LAYER_COLORS[i % LAYER_COLORS.length]}30, #0a2f24)` }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-night transition-transform duration-300 group-hover:scale-110">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5L8 5.5z" />
                      </svg>
                    </span>
                    <StarMark size={16} />
                  </div>
                  <div className="bg-white/[0.04] p-4">
                    <p className="text-sm font-semibold leading-snug text-cream">{v}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-gold-bright/80">
                      {t.trust.videoBadge}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* audits */}
      <Section bg="cream" id="audits" className="!py-20">
        <div className="container-x">
          <SectionHead title={t.trust.auditsTitle} />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.trust.audits.map((a, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                      <path d="M8.5 12l2.5 2.5 4.5-5" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-base font-bold">{a.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* faq + cta */}
      <Section bg="sand" className="!py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead title={t.trust.faq.title} />
          <Reveal>
            <Accordion items={t.trust.faq.items} />
          </Reveal>
        </div>
      </Section>

      <Section bg="night" className="!py-20">
        <div className="container-x text-center">
          <SectionHead title={t.trust.cta.title} sub={t.trust.cta.sub} dark center />
          <Reveal className="mt-8">
            <Btn href="/#download">{t.common.downloadApp}</Btn>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
