# MalkiatX — Website

Marketing & education site for **MalkiatX**, a Shariah-compliant Real World Asset (RWA) platform for Pakistan: fractional, halal ownership of **property, gold, sukuk and screened equities** from PKR 5,000, with JazzCash/Easypaisa rails and an Auto-Pilot portfolio engine.

## Quickstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes statically generated)
```

## Stack

- **Next.js 15** (App Router, static generation) + **React 19** + TypeScript
- **Tailwind CSS v4** (design tokens via `@theme` in `app/globals.css`)
- **Three.js** via `@react-three/fiber` + `@react-three/drei` (all scenes lazy-loaded, `ssr: false`, wrapped in a WebGL error boundary)
- **framer-motion** for scroll reveals and the onboarding simulator transitions

## Pages

| Route | Purpose | Signature interactive |
|---|---|---|
| `/` | Homepage | 3D "river of capital" hero; scroll-driven **tokenization journey** (asset → custody → mint → ownership); **Silsila ledger** ribbon; **projection engine** calculator |
| `/learn` | Passive investing education | Riba-vs-halal comparison, interactive calculator, risk-tier explorer, Auto-Pilot explainer, FAQ |
| `/journey` | End-to-end user journey | Persona picker + full **onboarding simulator** (CNIC scan → risk quiz → goal → Auto-Pilot allocation reveal) in a phone frame |
| `/assets` | Asset universe | 3D **tokenized asset constellation** (click nodes to inspect) |
| `/assets/[slug]` | Deep dive per asset (property/gold/sukuk/equities) | Rotating 3D asset glyph; tokenization steps with on-chain entries; Shariah certificate card; honest risks |
| `/trust` | Trust & Compliance Center | 3D **trust stack** (5 layers, click to explore); Shariah board; fatwa library; **proof-of-reserves explorer** |

## The Silsila concept (سلسلہ)

The blockchain layer is branded **Silsila** — "chain of narration." In Islamic scholarship a claim is only as strong as its verified chain (isnad); Silsila applies the same principle to ownership: every mint, rent distribution and sale is a verifiable link. It appears as:

- the **scroll-driven tokenization journey** on the homepage — four sticky stages (vetted asset → custody → minting → ownership) where the ledger writes a block per stage (`components/TokenizationJourney.tsx`),
- the **live ledger ribbon** beneath it (block cards, hashes, chain-link pulses),
- octagonal **token rings** around the asset clusters in the hero scene,
- **ledger entries** under each tokenization step on asset pages,
- the **proof-of-reserves explorer** in the Trust Center,
- a ledger receipt on the simulator's success screen.

## Design system

Defined in `app/globals.css` (`@theme`):

- **Palette** — deep emerald `night #062019 / night-2 / night-3`, primary `emerald #0e6b4f`, `gold #c9a24b` / `gold-bright #e7c878`, warm `cream #faf6ed` / `sand #f1e9d9`, ink text colors, and one color per asset class (`a-property/a-gold/a-sukuk/a-equities`).
- **Type** — Fraunces (display serif), Manrope (UI sans), **Noto Nastaliq Urdu** for Urdu mode. Font tokens live in `@theme inline` because they reference `next/font` runtime variables.
- **Motifs** — 8-point star (`components/Pattern.tsx`, `StarMark`), Mughal arch, octagon token glyph.
- **Components** — `components/ui.tsx` (Section, SectionHead, Btn, Reveal, Accordion, chips/cards), hand-animated icons in `components/AssetIcon.tsx` and `components/GoalIcon.tsx` (CSS keyframes in globals: shimmer, window-glow, rotating seal, self-drawing chart).

## Bilingual / Urdu-first architecture

- All copy lives in `lib/content/en.ts` (defines the `Dict` type) and `lib/content/ur.ts` (compiler-enforced mirror).
- `lib/i18n.tsx` provides `useLang()`; the toggle persists to localStorage and flips `<html lang dir>` — full RTL layout via Tailwind logical utilities, Nastaliq sizing/line-height overrides in globals.
- Numbers stay Western-digit with lakh/crore formatting (`lib/format.ts`), standard for Pakistani fintech.

## Honesty guardrails (important)

All rates, hashes, explorer figures, board profiles, fatwa dates and ledger events are **illustrative placeholders** — labelled as such in the UI and in the footer disclaimer. Replace before any public launch:

- Profit rates & allocations: `lib/data.ts`
- Board profiles, fatwa docs, explorer figures: `lib/content/*.ts` (`trust.*`)
- Ledger events: `components/Silsila.tsx` + `home.ledger.events`

## Production roadmap (not yet built)

Real waitlist form/backend, analytics, OG images, sitemap/robots, locale subpath routing (`/ur`) for SEO-grade i18n, real fatwa PDFs and video embeds, CMS for content, and accessibility audit pass.
