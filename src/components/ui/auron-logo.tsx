export function AuronLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>

        <pattern
          id="auron-stripe"
          x="0" y="0"
          width="320" height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="320" height="3.5" fill="white" />
        </pattern>


        <clipPath id="auron-clip">
          <text
            x="160" y="42"
            textAnchor="middle"
            fontFamily="Impact, 'Arial Black', sans-serif"
            fontSize="44 "
            fontStyle="italic"
            letterSpacing="-1"
          >
            AURON
          </text>
        </clipPath>


        <clipPath id="para-clip">
          <polygon points="14,0 320,0 306,50 0,50" />
        </clipPath>
      </defs>

      <g clipPath="url(#para-clip)">

        <rect x="0" y="30" width="320" height="20" fill="white" clipPath="url(#auron-clip)" />


        <rect x="0" y="0"  width="320" height="30" fill="url(#auron-stripe)" clipPath="url(#auron-clip)" />


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
