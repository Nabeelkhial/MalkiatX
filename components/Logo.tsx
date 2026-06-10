export function StarMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <g transform="translate(16 16)">
        <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#c9a24b" strokeWidth="2.4" />
        <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="#c9a24b" strokeWidth="2.4" transform="rotate(45)" />
        <circle r="3.4" fill="#e7c878" />
      </g>
    </svg>
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="ltr-isolate inline-flex items-center gap-2.5">
      <StarMark />
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? "text-cream" : "text-ink"}`}>
        Malkiat<span className="text-gold-bright">X</span>
      </span>
    </span>
  );
}
