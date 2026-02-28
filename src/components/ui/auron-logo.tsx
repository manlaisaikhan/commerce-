"use client";

import { useId } from "react";

export function AuronLogo({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const stripeId = `stripe-${uid}`;
  const clipId = `clip-${uid}`;
  const paraId = `para-${uid}`;

  return (
    <svg
      viewBox="0 0 320 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <pattern
          id={stripeId}
          x="0" y="0"
          width="320" height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="320" height="3.5" fill="white" />
        </pattern>

        <clipPath id={clipId}>
          <text
            x="160" y="42"
            textAnchor="middle"
            fontFamily="Impact, 'Arial Black', sans-serif"
            fontSize="44"
            fontStyle="italic"
            letterSpacing="-1"
          >
            AURON
          </text>
        </clipPath>

        <clipPath id={paraId}>
          <polygon points="14,0 320,0 306,50 0,50" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${paraId})`}>
        <rect x="0" y="30" width="320" height="20" fill="white" clipPath={`url(#${clipId})`} />
        <rect x="0" y="0"  width="320" height="30" fill={`url(#${stripeId})`} clipPath={`url(#${clipId})`} />
        <text
          x="160" y="42"
          textAnchor="middle"
          fontFamily="Impact, 'Arial Black', sans-serif"
          fontSize="44"
          fontStyle="italic"
          letterSpacing="-1"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
        >
          AURON
        </text>
      </g>
    </svg>
  );
}
