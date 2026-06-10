"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { PERSONAS, TIERS, futureValue } from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { Section, SectionHead, Reveal, cx } from "@/components/ui";
import Pattern from "@/components/Pattern";
import OnboardingSim, { fill } from "@/components/journey/OnboardingSim";
import { DownloadCTA } from "@/components/pages/HomeClient";

const PERSONA_GRADIENTS = [
  "linear-gradient(135deg,#3fa7a0,#0e6b4f)",
  "linear-gradient(135deg,#7e9be0,#3fa7a0)",
  "linear-gradient(135deg,#d9ad4f,#a3742a)",
  "linear-gradient(135deg,#5fbf8c,#0e6b4f)",
];

export default function JourneyClient() {
  const { t, lang } = useLang();
  const [personaIdx, setPersonaIdx] = useState(0);

  const persona = PERSONAS[personaIdx];
  const personaText = t.home.personas[personaIdx];
  const tier = TIERS[persona.tier];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-night pb-16 pt-40 text-cream">
        <Pattern className="text-gold/[0.05]" />
        <div className="container-x relative">
          <p className="eyebrow-light">{t.journey.eyebrow}</p>
          <h1 className="hero-h1 font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {t.journey.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-mint/85 sm:text-lg">{t.journey.sub}</p>
        </div>
      </section>

      {/* persona picker + simulator */}
      <Section bg="night2" className="!pt-14">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow-light">{t.journey.pickerTitle}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PERSONAS.map((p, i) => {
                const txt = t.home.personas[i];
                const active = personaIdx === i;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPersonaIdx(i)}
                    className={cx(
                      "flex items-center gap-3 rounded-2xl border p-4 text-start transition",
                      active ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.04] hover:border-gold/50"
                    )}
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-bold text-white"
                      style={{ background: PERSONA_GRADIENTS[i] }}
                    >
                      {txt.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-cream">{txt.name}</span>
                      <span className="block text-xs text-mint/70">{txt.role}</span>
                      <span className="ltr-isolate mt-0.5 block text-xs font-semibold text-gold-bright">
                        {formatPKR(p.monthly, lang)} / {lang === "ur" ? "ماہ" : "mo"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <OnboardingSim key={persona.id} initialMonthly={persona.monthly} initialGoal={persona.goal} />
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <SectionHead title={t.journey.simTitle} sub={t.journey.simSub} dark />
              <blockquote className="card-dark mt-8 p-6">
                <p className="text-sm leading-relaxed text-mint/85">“{personaText.quote}”</p>
                <footer className="mt-3 text-xs font-semibold text-gold-bright">
                  {personaText.name} · {personaText.role}
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* five-year timeline */}
      <Section bg="cream">
        <div className="container-x">
          <SectionHead
            title={t.journey.after.title}
            sub={fill(t.journey.after.sub, { name: personaText.name })}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[1, 3, 5].map((years, i) => {
              const contributed = persona.monthly * 12 * years;
              const value = futureValue(persona.monthly, tier.rate, years);
              return (
                <Reveal key={years} delay={i * 0.1}>
                  <div className="card relative overflow-hidden p-7">
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ background: `linear-gradient(90deg, #0e6b4f ${100 - years * 16}%, #c9a24b)` }}
                    />
                    <p className="eyebrow">{t.journey.after.labels[i]}</p>
                    <p className="mt-4 text-sm text-ink-soft">
                      {t.journey.after.contributed}
                      <span className="mx-1.5 font-bold text-ink">{formatPKR(contributed, lang)}</span>
                    </p>
                    <p className="mt-2 text-sm text-ink-soft">{t.journey.after.grewTo}</p>
                    <p className="font-display mt-1 text-3xl font-semibold text-emerald">
                      {formatPKR(value, lang)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-6">
            <p className="text-xs text-ink-soft/75">{t.common.illustrative}</p>
          </Reveal>
        </div>
      </Section>

      <DownloadCTA />
    </>
  );
}
