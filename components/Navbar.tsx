"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/Logo";
import { cx } from "@/components/ui";

export function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cx(
        "ltr-isolate inline-flex items-center rounded-full border border-cream/25 bg-night/40 p-0.5 text-xs font-semibold backdrop-blur",
        compact && "scale-95"
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cx("rounded-full px-3 py-1.5 transition", lang === "en" ? "bg-gold text-night" : "text-cream/80 hover:text-cream")}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ur")}
        className={cx("rounded-full px-3 py-1.5 transition", lang === "ur" ? "bg-gold text-night" : "text-cream/80 hover:text-cream")}
      >
        اردو
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/learn", label: t.nav.learn },
    { href: "/journey", label: t.nav.journey },
    { href: "/assets", label: t.nav.assets },
    { href: "/trust", label: t.nav.trust },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-white/10 bg-night/95 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-[72px]">
        <Link href="/" aria-label="MalkiatX home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-cream/85 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-gold-bright">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link href="/#download" className="btn btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
            {t.nav.download}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={cx("absolute inset-x-0 top-0 h-0.5 rounded bg-current transition", open && "top-1.5 rotate-45")} />
              <span className={cx("absolute inset-x-0 top-1.5 h-0.5 rounded bg-current transition", open && "opacity-0")} />
              <span className={cx("absolute inset-x-0 top-3 h-0.5 rounded bg-current transition", open && "top-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-night/95 backdrop-blur-md lg:hidden">
          <ul className="container-x flex flex-col gap-1 py-4 text-cream/90">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-white/5">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3 pb-2">
              <Link href="/#download" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                {t.nav.download}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
