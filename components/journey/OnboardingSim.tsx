"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import {
  GOALS,
  TIERS,
  futureValue,
  scoreToTier,
  yearsToTarget,
  type GoalId,
} from "@/lib/data";
import { formatPKR } from "@/lib/format";
import { cx } from "@/components/ui";
import { StarMark } from "@/components/Logo";
import { GoalIcon } from "@/components/GoalIcon";
import { AllocationDonut, AllocationLegend } from "@/components/charts/Allocation";

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}

type CnicState = "idle" | "scanning" | "scanned" | "matching" | "done";

export default function OnboardingSim({
  initialMonthly = 10_000,
  initialGoal = "wealth",
}: {
  initialMonthly?: number;
  initialGoal?: GoalId;
}) {
  const { t, lang } = useLang();
  const s = t.journey.sim;

  const [step, setStep] = useState(0);
  const [cnic, setCnic] = useState<CnicState>("idle");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [goal, setGoal] = useState<GoalId>(initialGoal);
  const [monthly, setMonthly] = useState(initialMonthly);
  const [autopilot, setAutopilot] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const tier = TIERS[scoreToTier(answers.reduce((a, b) => a + b, 0))];
  const goalData = GOALS[goal];

  const projection =
    goalData.target > 0
      ? fill(s.projectionTarget, {
          target: formatPKR(goalData.target, lang),
          years: yearsToTarget(monthly, tier.rate, goalData.target),
        })
      : fill(s.projectionOpen, {
          value: formatPKR(futureValue(monthly, tier.rate, goalData.years), lang),
          years: goalData.years,
        });

  const restart = () => {
    setStep(0);
    setCnic("idle");
    setQIdx(0);
    setAnswers([]);
    setGoal(initialGoal);
    setMonthly(initialMonthly);
    setAutopilot(true);
  };

  const startScan = () => {
    setCnic("scanning");
    later(() => setCnic("scanned"), 1400);
  };
  const startSelfie = () => {
    setCnic("matching");
    later(() => setCnic("done"), 1200);
  };

  const answer = (value: number) => {
    const next = [...answers, value];
    setAnswers(next);
    if (qIdx < s.quiz.length - 1) setQIdx(qIdx + 1);
    else later(() => setStep(3), 250);
  };

  const pickGoal = (g: GoalId) => {
    setGoal(g);
    later(() => setStep(4), 280);
  };

  return (
    <div className="mx-auto w-[320px] select-none">
      {/* phone frame */}
      <div className="relative overflow-hidden rounded-[2.6rem] border-[10px] border-night-3 bg-night shadow-2xl ring-1 ring-white/10">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-night-3" />

        <div className="relative flex h-[620px] flex-col bg-gradient-to-b from-night via-night-2 to-night px-5 pb-5 pt-11 text-cream">
          {/* progress dots */}
          <div className="mb-4 flex justify-center gap-1.5">
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className={cx("h-1.5 rounded-full transition-all duration-300", i === step ? "w-5 bg-gold" : "w-1.5 bg-white/20", i < step && "bg-emerald-bright")}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step + (step === 2 ? `q${qIdx}` : "")}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* 0 — welcome */}
              {step === 0 && (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <StarMark size={52} />
                  <p className="font-display mt-5 text-2xl font-semibold">
                    Malkiat<span className="text-gold-bright">X</span>
                  </p>
                  <p className="mt-3 max-w-[220px] text-sm text-mint/80">{s.welcomeSub}</p>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-gold mt-10 w-full">
                    {s.welcomeBtn}
                  </button>
                </div>
              )}

              {/* 1 — CNIC */}
              {step === 1 && (
                <div className="flex flex-1 flex-col">
                  <StepTitle title={s.cnicTitle} sub={s.cnicSub} />
                  {/* CNIC card graphic */}
                  <div className="relative mt-5 overflow-hidden rounded-xl border border-white/15 bg-night-3/80 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-12 rounded-md bg-white/10" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-2 w-3/4 rounded bg-white/15" />
                        <div className="h-2 w-1/2 rounded bg-white/15" />
                        <div className="h-2 w-2/3 rounded bg-white/10" />
                      </div>
                      <span className="rounded bg-emerald/40 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-mint">PAK</span>
                    </div>
                    <div className="mt-3 h-2 w-1/3 rounded bg-gold/40" />
                    {cnic === "scanning" && (
                      <motion.div
                        className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-gold-bright/30 to-transparent"
                        initial={{ left: "-20%" }}
                        animate={{ left: "110%" }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </div>

                  <SimAction
                    state={cnic === "idle" ? "ready" : cnic === "scanning" ? "busy" : "done"}
                    ready={s.cnicScan}
                    busy={s.cnicScanning}
                    done={`${s.cnicScan} — ${s.cnicDone}`}
                    onClick={startScan}
                  />

                  {(cnic === "scanned" || cnic === "matching" || cnic === "done") && (
                    <div className="mt-3 flex items-center gap-3">
                      <span
                        className={cx(
                          "relative grid h-12 w-12 shrink-0 place-items-center rounded-full border",
                          cnic === "done" ? "border-emerald-bright bg-emerald/30" : "border-gold/50 bg-night-3"
                        )}
                      >
                        {cnic === "matching" && <span className="absolute inset-0 animate-ping rounded-full border border-gold/60" />}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cream/80">
                          <circle cx="12" cy="8.5" r="3.5" />
                          <path d="M4.5 20c1.5-3.5 4.2-5 7.5-5s6 1.5 7.5 5" />
                        </svg>
                      </span>
                      <SimAction
                        small
                        state={cnic === "scanned" ? "ready" : cnic === "matching" ? "busy" : "done"}
                        ready={s.cnicSelfie}
                        busy={s.cnicChecking}
                        done={`${s.cnicSelfie} — ${s.cnicDone}`}
                        onClick={startSelfie}
                      />
                    </div>
                  )}

                  <div className="flex-1" />
                  <NavRow
                    backLabel={s.back}
                    nextLabel={s.next}
                    onBack={() => setStep(0)}
                    onNext={() => setStep(2)}
                    nextDisabled={cnic !== "done"}
                  />
                </div>
              )}

              {/* 2 — quiz */}
              {step === 2 && (
                <div className="flex flex-1 flex-col">
                  <StepTitle title={s.quizTitle} sub={`${qIdx + 1} / ${s.quiz.length}`} />
                  <p className="mt-5 text-base font-semibold leading-snug">{s.quiz[qIdx].q}</p>
                  <div className="mt-5 space-y-2.5">
                    {s.quiz[qIdx].options.map((opt, oi) => (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => answer(oi)}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-start text-sm transition hover:border-gold-bright hover:bg-gold/10"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1" />
                </div>
              )}

              {/* 3 — goal */}
              {step === 3 && (
                <div className="flex flex-1 flex-col">
                  <StepTitle title={s.goalTitle} sub={s.amountSub} />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {(Object.keys(GOALS) as GoalId[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => pickGoal(g)}
                        className={cx(
                          "rounded-xl border px-3 py-5 text-center transition",
                          goal === g ? "border-gold bg-gold/15" : "border-white/15 bg-white/[0.05] hover:border-gold/60"
                        )}
                      >
                        <GoalIcon goal={g} className={cx("mx-auto", goal === g ? "text-gold-bright" : "text-mint/80")} />
                        <span className="mt-2 block text-sm font-semibold">{s.goals[g]}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex-1" />
                </div>
              )}

              {/* 4 — amount */}
              {step === 4 && (
                <div className="flex flex-1 flex-col">
                  <StepTitle title={s.amountTitle} sub={s.amountSub} />
                  <p className="font-display mt-8 text-center text-3xl font-semibold text-gold-bright">
                    {formatPKR(monthly, lang)}
                  </p>
                  <input
                    type="range"
                    dir="ltr"
                    className="slider mt-7"
                    min={5000}
                    max={100000}
                    step={5000}
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value))}
                    style={{ backgroundSize: `${((monthly - 5000) / 95000) * 100}% 100%` }}
                  />
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {[5000, 10000, 25000, 50000].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setMonthly(v)}
                        className={cx(
                          "chip ltr-isolate transition",
                          monthly === v ? "border-gold bg-gold text-night" : "border-white/20 text-cream/75 hover:border-gold/60"
                        )}
                      >
                        {v.toLocaleString("en-US")}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1" />
                  <NavRow backLabel={s.back} nextLabel={s.next} onBack={() => setStep(3)} onNext={() => setStep(5)} />
                </div>
              )}

              {/* 5 — allocation reveal */}
              {step === 5 && (
                <div className="flex flex-1 flex-col">
                  <StepTitle
                    title={s.allocTitle}
                    sub={`${t.common.tiers[tier.id].name} ${s.tierLabel} · ${s.allocSub}`}
                  />
                  <div className="mt-4 flex justify-center">
                    <AllocationDonut
                      alloc={tier.alloc}
                      size={150}
                      stroke={24}
                      trackColor="rgba(255,255,255,0.08)"
                      center={
                        <p className="text-lg font-bold text-gold-bright ltr-isolate">
                          {Math.round(tier.rate * 100)}%
                        </p>
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <AllocationLegend alloc={tier.alloc} dark />
                  </div>
                  <p className="mt-4 rounded-lg bg-emerald/20 px-3 py-2.5 text-center text-xs font-semibold text-mint">
                    {projection}
                  </p>
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
                    <span className="text-sm font-semibold">{s.autopilot}</span>
                    <button
                      type="button"
                      onClick={() => setAutopilot(!autopilot)}
                      aria-pressed={autopilot}
                      className={cx("ltr-isolate relative h-6 w-11 rounded-full transition", autopilot ? "bg-emerald-bright" : "bg-white/20")}
                    >
                      <span
                        className={cx(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                          autopilot ? "left-[22px]" : "left-0.5"
                        )}
                      />
                    </button>
                  </div>
                  <div className="flex-1" />
                  <NavRow backLabel={s.back} nextLabel={s.confirm} onBack={() => setStep(4)} onNext={() => setStep(6)} gold />
                </div>
              )}

              {/* 6 — success */}
              {step === 6 && (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-gold text-night shadow-glow"
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 12.5l5 5 10-11" />
                    </svg>
                  </motion.span>
                  <p className="font-display mt-6 text-2xl font-semibold">{s.successTitle}</p>
                  <p className="mt-3 max-w-[230px] text-sm text-mint/80">{s.successSub}</p>
                  <p className="ltr-isolate mt-5 flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 font-mono text-[10px] text-gold-bright">
                    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                      <path d="M4 1h4l3 3v4l-3 3H4l-3-3V4l3-3z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                    0x91ae…d4f1 · ✓ Silsila
                  </p>
                  <button type="button" onClick={restart} className="btn btn-outline-light mt-7">
                    {s.successCta}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <p className="text-lg font-bold leading-snug">{title}</p>
      {sub && <p className="mt-1 text-xs text-mint/70">{sub}</p>}
    </div>
  );
}

function SimAction({
  state,
  ready,
  busy,
  done,
  onClick,
  small,
}: {
  state: "ready" | "busy" | "done";
  ready: string;
  busy: string;
  done: string;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={state === "ready" ? onClick : undefined}
      disabled={state !== "ready"}
      className={cx(
        "mt-4 w-full rounded-xl px-4 text-sm font-semibold transition",
        small ? "mt-0 py-3" : "py-3.5",
        state === "ready" && "bg-gold text-night hover:bg-gold-bright",
        state === "busy" && "animate-pulse-soft cursor-wait bg-white/10 text-cream/80",
        state === "done" && "bg-emerald/30 text-mint"
      )}
    >
      {state === "ready" ? ready : state === "busy" ? busy : `✓ ${done}`}
    </button>
  );
}

function NavRow({
  backLabel,
  nextLabel,
  onBack,
  onNext,
  nextDisabled,
  gold,
}: {
  backLabel: string;
  nextLabel: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  gold?: boolean;
}) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button type="button" onClick={onBack} className="px-3 py-3 text-sm font-medium text-cream/60 transition hover:text-cream">
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cx(
          "btn flex-1",
          gold ? "btn-gold" : "btn-emerald",
          nextDisabled && "cursor-not-allowed opacity-40"
        )}
      >
        {nextLabel}
      </button>
    </div>
  );
}
