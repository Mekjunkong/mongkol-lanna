type ArtworkCompositionProps = { tone?: "mist" | "river" | "forest"; title?: string; compact?: boolean; safeZone?: boolean };

export function ArtworkComposition({ tone = "mist", title = "Original in-house composition", compact = false, safeZone = false }: ArtworkCompositionProps) {
  return (
    <figure className={`artwork artwork--${tone} ${compact ? "artwork--compact" : ""}`} aria-label={title}>
      <svg viewBox="0 0 900 1120" role="img" aria-labelledby={`art-${tone}-title`} preserveAspectRatio="xMidYMid slice">
        <title id={`art-${tone}-title`}>{title}</title>
        <defs>
          <linearGradient id={`sky-${tone}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--art-sky)"/><stop offset="1" stopColor="var(--art-haze)"/></linearGradient>
          <pattern id={`grain-${tone}`} width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="1" fill="#302a20" opacity=".08"/><path d="M0 22L28 16" stroke="#fff" opacity=".08"/></pattern>
        </defs>
        <rect width="900" height="1120" fill={`url(#sky-${tone})`}/>
        <circle cx="675" cy="235" r="88" fill="var(--art-sun)" opacity=".78"/>
        <path d="M-40 660 Q170 430 350 625 T940 550 V1120 H-40Z" fill="var(--art-far)" opacity=".48"/>
        <path d="M-30 780 Q160 570 305 740 Q470 905 610 670 Q720 530 940 720 V1120 H-30Z" fill="var(--art-mid)"/>
        <path d="M80 1120 Q200 780 445 690 Q660 610 842 350" fill="none" stroke="var(--art-river)" strokeWidth="76" opacity=".62"/>
        <path d="M145 1120 Q310 800 470 736 Q670 660 830 390" fill="none" stroke="#f7efd9" strokeWidth="7" opacity=".7"/>
        <g fill="none" stroke="var(--art-ink)" strokeWidth="10" strokeLinecap="round">
          <path d="M190 930 Q178 685 260 472 Q315 620 335 870"/>
          <path d="M260 525 Q170 510 120 420 M265 565 Q390 530 435 440 M240 650 Q120 650 70 575 M290 700 Q420 690 500 590"/>
        </g>
        <g fill="var(--art-leaf)" opacity=".9">
          <ellipse cx="124" cy="425" rx="66" ry="22" transform="rotate(25 124 425)"/><ellipse cx="420" cy="445" rx="72" ry="25" transform="rotate(-22 420 445)"/>
          <ellipse cx="88" cy="578" rx="56" ry="20" transform="rotate(12 88 578)"/><ellipse cx="475" cy="598" rx="67" ry="22" transform="rotate(-25 475 598)"/>
        </g>
        <g stroke="var(--gold)" fill="none" opacity=".72"><path d="M620 875 q70-100 140 0 q-70 100-140 0Z"/><path d="M650 875 q40-58 80 0 q-40 58-80 0Z"/></g>
        <rect width="900" height="1120" fill={`url(#grain-${tone})`}/>
      </svg>
      <span className="artwork__rule" aria-hidden="true" />
      {safeZone && <span className="artwork__safe" aria-label="พื้นที่ว่างที่สงวนไว้"><small>SAFE AREA</small></span>}
    </figure>
  );
}
