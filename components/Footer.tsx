"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/Logo";
import { LangToggle } from "@/components/Navbar";
import Pattern from "@/components/Pattern";

export default function Footer() {
  const { t } = useLang();

  const productLinks = [
    { href: "/learn", label: t.nav.learn },
    { href: "/journey", label: t.nav.journey },
    { href: "/assets", label: t.nav.assets },
  ];
  const trustLinks = [
    { href: "/trust", label: t.nav.trust },
    { href: "/trust#fatwas", label: t.trust.fatwaTitle },
    { href: "/trust#audits", label: t.trust.auditsTitle },
  ];

  return (
    <footer className="relative overflow-hidden bg-night text-cream">
      <Pattern className="text-gold/[0.05]" />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-mint/75">{t.footer.tagline}</p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-cream/50">{t.footer.payments}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["JazzCash", "easypaisa", "Raast", "Bank"].map((p) => (
                  <span key={p} className="chip ltr-isolate border-cream/20 text-cream/75">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <FooterCol title={t.footer.colProduct} links={productLinks} />
          <FooterCol title={t.footer.colTrust} links={trustLinks} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/50">{t.footer.colLegal}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
              {t.footer.legalLinks.map((l) => (
                <li key={l}>
                  <span className="cursor-default transition hover:text-gold-bright">{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cream/50">{t.footer.language}</p>
              <LangToggle />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="text-xs leading-relaxed text-cream/45">{t.footer.disclaimer}</p>
          <p className="mt-4 text-xs text-cream/55">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-cream/50">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="transition hover:text-gold-bright">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
