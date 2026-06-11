"use client";

import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { cx, Octagon } from "@/components/ui";
import { StarMark } from "@/components/Logo";
import Pattern from "@/components/Pattern";

/**
 * Scroll-driven tokenization journey: as the user scrolls, a real property is
 * vetted → locked into custody → minted into tokens → owned, while the
 * Silsila ledger writes a block for each stage. The scroll itself forges the
 * chain — blockchain as the homepage's trust layer.
 */

const STAGE_HASHES = ["0x2b91…44e0", "0x6fd3…1a9c", "0xae07…58b2", "0x9c4f…d7e3"];
const STAGES = 4;

export default function TokenizationJourney() {
  const { t } = useLang();
  const L = t.home.ledger;
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.max(0, Math.min(STAGES - 1, Math.floor(v * STAGES))));
  });

  return (
    <div ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-x w-full">
          <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* steps — desktop rail */}
            <ol className="relative hidden lg:block">
              {L.stages.map((s, i) => (
                <li key={i} className="relative flex gap-5 pb-9 last:pb-0">
                  {i < STAGES - 1 && (
                    <span
                      className={cx(
                        "absolute bottom-0 start-[15px] top-9 w-px transition-colors duration-500",
                        i < stage ? "bg-gold" : "bg-white/10"
                      )}
                    />
                  )}
                  <span className="relative z-10 h-8 w-8 shrink-0">
                    <svg viewBox="0 0 24 24" className="h-8 w-8">
                      <path
                        d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z"
                        fill={i <= stage ? "#c9a24b" : "rgba(255,255,255,0.04)"}
                        stroke={i <= stage ? "#e7c878" : "rgba(250,246,237,0.25)"}
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                        style={{ transition: "fill 0.4s, stroke 0.4s" }}
                      />
                    </svg>
                    <span
                      className={cx(
                        "absolute inset-0 grid place-items-center text-xs font-bold transition-colors duration-300",
                        i <= stage ? "text-night" : "text-cream/50"
                      )}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <p
                      className={cx(
                        "font-bold transition-colors duration-300",
                        i === stage ? "text-gold-bright" : i < stage ? "text-cream/80" : "text-cream/40"
                      )}
                    >
                      {s.t}
                    </p>
                    <p
                      className={cx(
                        "mt-1 text-sm leading-relaxed transition-colors duration-300",
                        i === stage ? "text-mint/85" : "text-cream/30"
                      )}
                    >
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* steps — mobile chain + active step */}
            <div className="lg:hidden">
              <div className="flex items-center">
                {L.stages.map((_, i) => (
                  <Fragment key={i}>
                    <span className="relative h-7 w-7 shrink-0">
                      <svg viewBox="0 0 24 24" className="h-7 w-7">
                        <path
                          d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z"
                          fill={i <= stage ? "#c9a24b" : "rgba(255,255,255,0.04)"}
                          stroke={i <= stage ? "#e7c878" : "rgba(250,246,237,0.25)"}
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={cx("absolute inset-0 grid place-items-center text-[11px] font-bold", i <= stage ? "text-night" : "text-cream/50")}>
                        {i + 1}
                      </span>
                    </span>
                    {i < STAGES - 1 && (
                      <span className={cx("mx-1 h-px flex-1 transition-colors duration-500", i < stage ? "bg-gold" : "bg-white/10")} />
                    )}
                  </Fragment>
                ))}
              </div>
              <div className="mt-4 min-h-[92px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-bold text-gold-bright">{L.stages[stage].t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mint/80">{L.stages[stage].d}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* visual panel */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-2 to-night shadow-2xl">
              <Pattern className="text-gold/[0.04]" />
              <div className="relative flex items-center justify-between px-5 pt-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="chip border-gold/40 bg-gold/10 text-gold-bright"
                  >
                    {L.stages[stage].chip}
                  </motion.span>
                </AnimatePresence>
                <span className="ltr-isolate font-mono text-[10px] uppercase tracking-wider text-cream/35">SPV-114 · MXT</span>
              </div>

              <div className="relative grid h-[280px] place-items-center sm:h-[330px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                  >
                    {stage === 0 && <StageAsset />}
                    {stage === 1 && <StageCustody />}
                    {stage === 2 && <StageMint />}
                    {stage === 3 && <StageOwn />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* the ledger writes itself */}
              <div className="relative border-t border-white/10 bg-night/70 px-5 py-3.5 backdrop-blur" dir="ltr">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 text-[11px]"
                  >
                    <span className="flex shrink-0 items-center gap-1.5 font-mono text-cream/45">
                      <Octagon size={11} />
                      {L.block} #{(84210 + stage).toLocaleString("en-US")}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-semibold text-cream/90">{L.stages[stage].ledger}</span>
                    <span className="hidden shrink-0 font-mono text-gold-bright sm:inline">{STAGE_HASHES[stage]}</span>
                    <span className="shrink-0 font-bold text-emerald-bright">✓</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <motion.p
          animate={{ opacity: stage === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-5 start-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs text-cream/50 rtl:translate-x-1/2"
        >
          {L.scrollHint}
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }} aria-hidden>
            ↓
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ stage visuals */

function StageAsset() {
  return (
    <div className="flex items-end gap-6">
      {/* the building */}
      <svg viewBox="0 0 120 130" className="w-32 text-a-property sm:w-40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 126h100" />
        <path d="M24 126V44l36-26 36 26v82" />
        <path d="M48 126v-20a12 12 0 0 1 24 0v20" />
        <path className="icon-spark" d="M60 4l4 6-4 6-4-6 4-6z" fill="#e7c878" stroke="none" />
        {[0, 1, 2].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              className="icon-win"
              x={36 + c * 19}
              y={56 + r * 20}
              width="9"
              height="9"
              rx="1.5"
              fill="currentColor"
              stroke="none"
              style={{ animationDelay: `${(c + r) * 0.45}s` }}
            />
          ))
        )}
      </svg>
      {/* the deed */}
      <motion.div
        initial={{ opacity: 0, x: 24, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="w-36 rounded-xl border border-gold/40 bg-white/[0.05] p-3.5 backdrop-blur"
      >
        <div className="space-y-2">
          <div className="h-1.5 w-3/4 rounded bg-cream/30" />
          <div className="h-1.5 w-1/2 rounded bg-cream/20" />
          <div className="h-1.5 w-2/3 rounded bg-cream/20" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <StarMark size={16} />
          <span className="ltr-isolate font-mono text-[9px] text-gold-bright">PKR 8.0 Cr</span>
        </div>
      </motion.div>
    </div>
  );
}

function StageCustody() {
  return (
    <div className="relative grid place-items-center">
      {/* vault octagon */}
      <motion.svg
        viewBox="0 0 24 24"
        className="h-44 w-44 sm:h-52 sm:w-52"
        initial={{ rotate: -8, scale: 0.92 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" fill="rgba(231,200,120,0.06)" stroke="#c9a24b" strokeWidth="0.9" strokeLinejoin="round" />
        <path d="M8.6 4h6.8l4.6 4.6v6.8l-4.6 4.6H8.6L4 15.4V8.6L8.6 4z" fill="none" stroke="#e7c878" strokeWidth="0.4" strokeDasharray="1.2 1" strokeLinejoin="round" />
      </motion.svg>
      {/* deed shrinking into the vault */}
      <motion.div
        initial={{ opacity: 0.9, scale: 1, x: -110, y: -20 }}
        animate={{ opacity: 0.85, scale: 0.42, x: 0, y: -26 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-32 rounded-xl border border-gold/50 bg-night-3 p-3"
      >
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-cream/30" />
          <div className="h-1.5 w-1/2 rounded bg-cream/20" />
        </div>
        <StarMark size={14} />
      </motion.div>
      {/* lock */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute h-12 w-12 translate-y-7 text-gold-bright"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 240, damping: 16 }}
      >
        <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
        <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
      </motion.svg>
      {/* chips */}
      <div className="absolute -bottom-6 flex gap-2">
        {["SPV-114", "Takaful", "Audit"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.12 }}
            className="chip ltr-isolate border-white/15 bg-white/[0.05] text-cream/70"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function StageMint() {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
        {Array.from({ length: 24 }, (_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className="h-8 w-8 sm:h-9 sm:w-9"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.035, type: "spring", stiffness: 280, damping: 20 }}
          >
            <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" fill="rgba(231,200,120,0.07)" stroke="#c9a24b" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M12 8.4l1.1 1.9 1.9 1.1-1.9 1.1-1.1 1.9-1.1-1.9-1.9-1.1 1.9-1.1 1.1-1.9z" fill="#e7c878" />
          </motion.svg>
        ))}
      </div>
      {/* shariah seal stamps the batch */}
      <motion.div
        initial={{ opacity: 0, scale: 1.9, rotate: -18 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.15, type: "spring", stiffness: 200, damping: 13 }}
        className="absolute -end-4 -top-6 grid place-items-center rounded-full border border-gold/60 bg-night/90 p-3 shadow-glow"
      >
        <StarMark size={30} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="ltr-isolate mt-4 text-center font-mono text-[10px] text-cream/45"
      >
        MXT-000114 · 160,000 × PKR 5,000 · Fatwa #07
      </motion.p>
    </div>
  );
}

function StageOwn() {
  return (
    <div className="flex items-center gap-7 sm:gap-10">
      {/* token flying to the wallet */}
      <div className="relative h-24 w-16">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="absolute h-10 w-10 opacity-25" style={{ top: i * 26, left: i * 8 }}>
            <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" fill="none" stroke="#c9a24b" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        ))}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute h-11 w-11"
          initial={{ x: 0, y: 26, opacity: 1 }}
          animate={{ x: 76, y: -6, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" fill="#c9a24b" stroke="#e7c878" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M12 8.4l1.1 1.9 1.9 1.1-1.9 1.1-1.1 1.9-1.1-1.9-1.9-1.1 1.9-1.1 1.1-1.9z" fill="#062019" />
        </motion.svg>
      </div>
      {/* the wallet (phone) */}
      <div className="relative w-36 rounded-2xl border-2 border-night-3 bg-night-2 p-3 shadow-2xl ring-1 ring-white/10 sm:w-40">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/15" />
        <div className="rounded-lg border border-gold/40 bg-gold/10 px-2.5 py-2 text-center">
          <p className="ltr-isolate text-sm font-bold text-gold-bright">1 MXT</p>
          <p className="text-[9px] text-cream/55">Gulberg Heights</p>
        </div>
        <div className="mt-2 space-y-1.5">
          {["Aug", "Sep", "Oct"].map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.3 }}
              className="ltr-isolate flex items-center justify-between rounded-md bg-white/[0.06] px-2 py-1.5 text-[9px]"
            >
              <span className="text-cream/65">Rent · {m}</span>
              <span className="font-bold text-emerald-bright">+ ✓</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
