"use client";

import { useId } from "react";

/**
 * Subtle 8-point-star tessellation, used as a low-opacity background motif.
 * Inherits currentColor; control strength via text color + opacity classes.
 */
export default function Pattern({ className = "" }: { className?: string }) {
  const id = useId().replace(/[:]/g, "");
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={`star-${id}`} width="56" height="56" patternUnits="userSpaceOnUse">
          <g transform="translate(28 28)" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="-9" y="-9" width="18" height="18" />
            <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#star-${id})`} />
    </svg>
  );
}
