import type { AssetSlug } from "@/lib/data";

/** Minimal line icons for the four asset classes. Inherit currentColor. */
export function AssetIcon({ slug, size = 24 }: { slug: AssetSlug; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "property":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l5-4v17" />
          <path d="M10 21V10h9v11" />
          <path d="M13 13h1.5M16.5 13H18M13 16h1.5M16.5 16H18" />
        </svg>
      );
    case "gold":
      return (
        <svg {...common}>
          <path d="M5 14h6l1.5 5h-9L5 14z" />
          <path d="M13 14h6l1.5 5h-9l1.5-5z" />
          <path d="M9 9h6l1.5 5h-9L9 9z" />
        </svg>
      );
    case "sukuk":
      return (
        <svg {...common}>
          <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
    case "equities":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M4 16l4.5-5 3.5 3 5-6 3 2.5" />
          <circle cx="8.5" cy="11" r="0.5" fill="currentColor" />
        </svg>
      );
  }
}
