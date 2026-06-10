import type { Lang } from "@/lib/i18n";

/**
 * Format PKR amounts the way Pakistan reads them: lakh and crore above 100k,
 * plain comma grouping below. Western digits are kept in both languages
 * (standard practice in Pakistani fintech).
 */
export function formatPKR(n: number, lang: Lang): string {
  const v = Math.round(n);
  if (v >= 1_00_00_000) {
    const x = trim(v / 1_00_00_000);
    return lang === "ur" ? `${x} کروڑ روپے` : `PKR ${x} crore`;
  }
  if (v >= 1_00_000) {
    const x = trim(v / 1_00_000);
    return lang === "ur" ? `${x} لاکھ روپے` : `PKR ${x} lakh`;
  }
  const s = v.toLocaleString("en-US");
  return lang === "ur" ? `${s} روپے` : `PKR ${s}`;
}

/** Short form for chart axes: 50k, 12L, 1.5Cr */
export function formatPKRShort(n: number): string {
  const v = Math.round(n);
  if (v >= 1_00_00_000) return `${trim(v / 1_00_00_000)}Cr`;
  if (v >= 1_00_000) return `${trim(v / 1_00_000)}L`;
  if (v >= 1_000) return `${trim(v / 1_000)}k`;
  return `${v}`;
}

function trim(x: number): string {
  const r = x >= 10 ? Math.round(x * 10) / 10 : Math.round(x * 100) / 100;
  return `${r}`;
}
