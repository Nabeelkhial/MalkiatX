// Language-neutral platform data: asset classes, risk tiers, personas, goals.
// All rates/figures are illustrative for the prototype.

export const ASSET_SLUGS = ["property", "gold", "sukuk", "equities"] as const;
export type AssetSlug = (typeof ASSET_SLUGS)[number];

export const ASSET_COLORS: Record<AssetSlug, string> = {
  property: "#3fa7a0",
  gold: "#d9ad4f",
  sukuk: "#5fbf8c",
  equities: "#7e9be0",
};

export type TierId = "cautious" | "balanced" | "growth";

export interface Tier {
  id: TierId;
  /** Illustrative annual profit rate (not a promise of returns). */
  rate: number;
  alloc: Record<AssetSlug, number>;
}

export const TIERS: Record<TierId, Tier> = {
  cautious: {
    id: "cautious",
    rate: 0.08,
    alloc: { property: 20, gold: 35, sukuk: 40, equities: 5 },
  },
  balanced: {
    id: "balanced",
    rate: 0.11,
    alloc: { property: 35, gold: 25, sukuk: 25, equities: 15 },
  },
  growth: {
    id: "growth",
    rate: 0.14,
    alloc: { property: 35, gold: 15, sukuk: 20, equities: 30 },
  },
};

export type GoalId = "hajj" | "wedding" | "home" | "wealth";

export interface Goal {
  id: GoalId;
  /** Target amount in PKR; 0 = open-ended. */
  target: number;
  /** Default horizon in years. */
  years: number;
}

export const GOALS: Record<GoalId, Goal> = {
  hajj: { id: "hajj", target: 1_500_000, years: 7 },
  wedding: { id: "wedding", target: 2_500_000, years: 6 },
  home: { id: "home", target: 5_000_000, years: 10 },
  wealth: { id: "wealth", target: 0, years: 15 },
};

export type PersonaId = "akram" | "sana" | "rukhsana" | "bilal";

export interface Persona {
  id: PersonaId;
  monthly: number;
  goal: GoalId;
  tier: TierId;
}

export const PERSONAS: Persona[] = [
  { id: "akram", monthly: 5_000, goal: "home", tier: "balanced" },
  { id: "sana", monthly: 25_000, goal: "wealth", tier: "balanced" },
  { id: "rukhsana", monthly: 8_000, goal: "hajj", tier: "cautious" },
  { id: "bilal", monthly: 5_000, goal: "wealth", tier: "growth" },
];

/** Future value of a fixed monthly contribution (annuity due), compounded monthly. */
export function futureValue(monthly: number, annualRate: number, years: number): number {
  if (years <= 0) return 0;
  const i = annualRate / 12;
  const n = Math.round(years * 12);
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

/** Years (rounded up to a half-year) needed to reach `target` at `monthly`/`annualRate`. */
export function yearsToTarget(monthly: number, annualRate: number, target: number): number {
  if (target <= 0) return 0;
  let months = 0;
  const i = annualRate / 12;
  let value = 0;
  while (value < target && months < 480) {
    value = (value + monthly) * (1 + i);
    months += 1;
  }
  return Math.ceil((months / 12) * 2) / 2;
}

/** Map onboarding quiz score (0–6) to a risk tier. */
export function scoreToTier(score: number): TierId {
  if (score <= 2) return "cautious";
  if (score <= 4) return "balanced";
  return "growth";
}
