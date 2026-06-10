"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ----------------------------------------------------------------- layout */

export function Section({
  children,
  bg = "cream",
  className,
  id,
}: {
  children: ReactNode;
  bg?: "cream" | "sand" | "night" | "night2";
  className?: string;
  id?: string;
}) {
  const bgClass = {
    cream: "bg-cream text-ink",
    sand: "bg-sand text-ink",
    night: "bg-night text-cream",
    night2: "bg-night-2 text-cream",
  }[bg];
  return (
    <section id={id} className={cx("relative overflow-hidden py-20 sm:py-28", bgClass, className)}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  dark,
  center,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cx("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={dark ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>}
      <h2 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {sub && <p className={cx("mt-4 text-base sm:text-lg", dark ? "text-mint/85" : "text-ink-soft")}>{sub}</p>}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- buttons */

export function Btn({
  href,
  variant = "gold",
  children,
  className,
  onClick,
}: {
  href?: string;
  variant?: "gold" | "emerald" | "outline" | "outline-light";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cls = cx("btn", `btn-${variant}`, className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- motion */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------- accordion */

export function Accordion({ items, dark }: { items: { q: string; a: string }[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cx("divide-y rounded-2xl border", dark ? "divide-white/10 border-white/10 bg-white/[0.03]" : "divide-line border-line bg-white/60")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start sm:px-7 sm:py-5"
            >
              <span className="text-sm font-semibold sm:text-base">{item.q}</span>
              <span
                className={cx(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm transition-transform duration-300",
                  dark ? "border-gold-bright/50 text-gold-bright" : "border-emerald/40 text-emerald",
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className={cx("px-5 pb-5 text-sm leading-relaxed sm:px-7 sm:text-base", dark ? "text-mint/80" : "text-ink-soft")}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ small parts */

export function Dot({ color, className }: { color: string; className?: string }) {
  return <span className={cx("inline-block h-2.5 w-2.5 shrink-0 rounded-full", className)} style={{ background: color }} />;
}

export function Disclaimer({ text, dark }: { text: string; dark?: boolean }) {
  return <p className={cx("mt-4 text-xs leading-relaxed", dark ? "text-cream/45" : "text-ink-soft/75")}>{text}</p>;
}
