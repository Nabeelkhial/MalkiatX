"use client";

import { useId } from "react";
import type { AssetSlug } from "@/lib/data";

/**
 * Hand-crafted, micro-animated icons for the four asset classes.
 * Each is built from the brand's Islamic-geometric language (8-point star,
 * Mughal arch) with a living detail: windows glowing, gold shimmering,
 * a rotating seal, a self-drawing chart. Inherit currentColor.
 */
export function AssetIcon({ slug, size = 24 }: { slug: AssetSlug; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (slug) {
    case "property":
      return <PropertyIcon {...common} />;
    case "gold":
      return <GoldIcon {...common} />;
    case "sukuk":
      return <SukukIcon {...common} />;
    case "equities":
      return <EquitiesIcon {...common} />;
  }
}

type P = React.SVGProps<SVGSVGElement>;

function PropertyIcon(props: P) {
  return (
    <svg {...props}>
      {/* tower with star finial and glowing windows over a Mughal-arch door */}
      <path d="M3.5 21h17" />
      <path d="M6 21V9.8L12 5.2l6 4.6V21" />
      <path d="M10.2 21v-3.5a1.8 1.8 0 0 1 3.6 0V21" />
      <path className="icon-spark" d="M12 1.6l.8 1.3-.8 1.3-.8-1.3L12 1.6z" fill="currentColor" stroke="none" />
      <rect className="icon-win" x="8" y="11" width="1.7" height="1.7" rx="0.25" fill="currentColor" stroke="none" />
      <rect className="icon-win" x="11.15" y="11" width="1.7" height="1.7" rx="0.25" fill="currentColor" stroke="none" style={{ animationDelay: "0.6s" }} />
      <rect className="icon-win" x="14.3" y="11" width="1.7" height="1.7" rx="0.25" fill="currentColor" stroke="none" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}

function GoldIcon(props: P) {
  const id = useId().replace(/[:]/g, "");
  return (
    <svg {...props}>
      <defs>
        <clipPath id={`gclip-${id}`}>
          <path d="M5 14.5h6l1.4 4.5H3.6L5 14.5z" />
          <path d="M13 14.5h6l1.4 4.5h-8.8L13 14.5z" />
          <path d="M9 9.5h6l1.4 4.5H7.6L9 9.5z" />
        </clipPath>
      </defs>
      <path d="M5 14.5h6l1.4 4.5H3.6L5 14.5z" />
      <path d="M13 14.5h6l1.4 4.5h-8.8L13 14.5z" />
      <path d="M9 9.5h6l1.4 4.5H7.6L9 9.5z" />
      {/* light sweep across the bars */}
      <g clipPath={`url(#gclip-${id})`}>
        <g transform="skewX(-16)">
          <rect className="icon-shimmer" x="2" y="6" width="3.6" height="16" fill="currentColor" opacity="0.5" stroke="none" />
        </g>
      </g>
      <path className="icon-spark" d="M18.6 4.2l.6 1.1 1.1.6-1.1.6-.6 1.1-.6-1.1-1.1-.6 1.1-.6.6-1.1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SukukIcon(props: P) {
  return (
    <svg {...props}>
      {/* certificate with a slowly rotating 8-point star seal */}
      <path d="M6.5 3.5h11V19l-1.85-1.3L13.8 19l-1.8-1.3L10.2 19l-1.85-1.3L6.5 19V3.5z" />
      <path d="M9.2 7.2h5.6M9.2 10h5.6" />
      <g className="icon-seal">
        <rect x="10.7" y="12.9" width="2.6" height="2.6" />
        <rect x="10.7" y="12.9" width="2.6" height="2.6" transform="rotate(45 12 14.2)" />
      </g>
    </svg>
  );
}

function EquitiesIcon(props: P) {
  return (
    <svg {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5v-2.4M10.5 20.5v-3.8M14.5 20.5v-2.9M18.5 20.5v-4.6" opacity="0.3" />
      {/* the line draws itself, ending in a pulsing star */}
      <path className="icon-drawline" pathLength={100} d="M4.5 17L9 12.6l3.2 2.4 3.8-5.4 3.6-2.2" />
      <path className="icon-spark" d="M19.6 5.9l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6.6-1.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
