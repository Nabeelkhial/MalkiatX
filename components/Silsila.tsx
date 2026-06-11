"use client";

import { Fragment } from "react";
import { useLang } from "@/lib/i18n";
import { ASSET_COLORS, type AssetSlug } from "@/lib/data";
import { SectionHead, Octagon } from "@/components/ui";
import TokenizationJourney from "@/components/TokenizationJourney";

/**
 * "Silsila" (سلسلہ — chain of narration): the blockchain as the homepage's
 * trust layer. Intro → scroll-driven tokenization journey → live ledger
 * ribbon that never stops writing.
 *
 * Note: this section must NOT clip overflow — the journey inside relies on
 * position: sticky, which breaks under an overflow-hidden ancestor.
 */

const META: { slug: AssetSlug; hash: string; block: number }[] = [
  { slug: "gold", hash: "0x8f3a…c2d1", block: 84213 },
  { slug: "property", hash: "0x41be…77af", block: 84214 },
  { slug: "sukuk", hash: "0xa90d…334e", block: 84215 },
  { slug: "equities", hash: "0x5c72…e8b9", block: 84216 },
  { slug: "property", hash: "0xd1f4…02cc", block: 84217 },
  { slug: "gold", hash: "0x33ab…91f7", block: 84218 },
];

export default function SilsilaSection() {
  const { t } = useLang();
  const L = t.home.ledger;

  return (
    <section className="relative bg-night text-cream">
      {/* intro */}
      <div className="container-x pt-20 sm:pt-28">
        <SectionHead eyebrow={L.eyebrow} title={L.title} sub={L.sub} dark center />
      </div>

      {/* scroll-driven tokenization journey */}
      <TokenizationJourney />

      {/* the ledger ribbon — and it never stops writing */}
      <div className="relative pb-20 pt-4 sm:pb-24">
        <p className="container-x mb-4 flex items-center gap-2 text-xs text-cream/45">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-bright" />
          </span>
          {L.liveLabel}
        </p>
        <div
          dir="ltr"
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 7%, black 93%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 7%, black 93%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max items-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                {META.map((m, i) => (
                  <Fragment key={i}>
                    <BlockCard meta={m} text={L.events[i]} blockLabel={L.block} verified={L.verified} />
                    <Connector />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlockCard({
  meta,
  text,
  blockLabel,
  verified,
}: {
  meta: (typeof META)[number];
  text: string;
  blockLabel: string;
  verified: string;
}) {
  return (
    <div className="w-[272px] shrink-0 rounded-2xl border border-gold/20 bg-night-2/85 p-4 backdrop-blur transition-colors hover:border-gold/50">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-cream/45">
        <span className="flex items-center gap-1.5">
          <Octagon color={ASSET_COLORS[meta.slug]} />
          {blockLabel} #{meta.block.toLocaleString("en-US")}
        </span>
        <span className="font-mono normal-case tracking-normal">{meta.hash}</span>
      </div>
      <p className="mt-2.5 min-h-10 text-sm font-semibold leading-snug text-cream">{text}</p>
      <p className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px]">
        <span className="font-semibold uppercase tracking-wider" style={{ color: ASSET_COLORS[meta.slug] }}>
          ●&nbsp;&nbsp;MXT
        </span>
        <span className="font-bold text-emerald-bright">✓ {verified}</span>
      </p>
    </div>
  );
}

function Connector() {
  return (
    <span className="relative mx-1 block h-px w-12 shrink-0 bg-gradient-to-r from-gold/50 via-gold/15 to-gold/50">
      <span className="chain-dot absolute -top-[2.5px] h-1.5 w-1.5 rounded-full bg-gold-bright" />
    </span>
  );
}
