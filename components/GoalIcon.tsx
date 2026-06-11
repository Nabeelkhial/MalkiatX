"use client";

import type { GoalId } from "@/lib/data";

/**
 * Custom goal icons for onboarding (replacing emoji): Kaaba for Hajj,
 * interlocked rings for wedding, arch-door home, and a sprout reaching a
 * star for long-term wealth. Drawn in the brand's geometric line style.
 */
export function GoalIcon({ goal, size = 28, className }: { goal: GoalId; size?: number; className?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (goal) {
    case "hajj":
      return (
        <svg {...common}>
          <rect x="5" y="7.5" width="14" height="11.5" rx="0.8" />
          <path d="M5 11.2h14M5 12.9h14" />
          <path d="M13.6 19v-3.6h2.9V19" />
          <path className="icon-spark" d="M19.3 3.2l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "wedding":
      return (
        <svg {...common}>
          <circle cx="9.3" cy="13.8" r="4.4" />
          <circle cx="14.7" cy="11.8" r="4.4" />
          <path d="M14.7 5.2l1.1 1.5-1.1 1.5-1.1-1.5 1.1-1.5z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M4.5 20.5v-8.3L12 5.8l7.5 6.4v8.3" />
          <path d="M9.8 20.5v-3.3a2.2 2.2 0 0 1 4.4 0v3.3" />
          <path d="M3.5 20.5h17" />
          <path className="icon-spark" d="M12 2l.7 1.1L12 4.2l-.7-1.1L12 2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "wealth":
      return (
        <svg {...common}>
          <path d="M8 20.5h8M9.2 20.5l-.5-2.6h6.6l-.5 2.6" />
          <path d="M12 17.9v-5.4" />
          <path d="M12 12.5c-.2-2.9-2.3-4.4-4.9-4.5.2 2.9 2.3 4.4 4.9 4.5z" />
          <path d="M12 11.1c.2-3.2 2.5-4.9 5.3-5-.2 3.2-2.5 4.9-5.3 5z" />
          <path className="icon-spark" d="M12 2.4l.6 1.1 1.1.6-1.1.6-.6 1.1-.6-1.1-1.1-.6 1.1-.6.6-1.1z" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
