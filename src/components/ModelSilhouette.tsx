import type { ReactNode } from "react";
import type { ModelBodyStyle } from "@/data/mazda-models";

const accent = "var(--mazda-accent, #c40012)";
const fill = "var(--mazda-silhouette, #1a1a1a)";
const roof = "var(--mazda-silhouette-roof, #2d2d2d)";

function Sedan() {
  return (
    <g fill={fill}>
      <path d="M8 52 L12 38 L28 32 L72 30 L88 34 L96 44 L98 52 L98 58 L92 62 L8 62 Z" />
      <path fill={roof} d="M30 34 L68 32 L82 36 L86 44 L28 40 Z" />
      <circle cx="24" cy="60" r="7" fill="#111" />
      <circle cx="24" cy="60" r="3.5" fill="#333" />
      <circle cx="78" cy="60" r="7" fill="#111" />
      <circle cx="78" cy="60" r="3.5" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M14 52 L94 52" opacity="0.35" />
    </g>
  );
}

function Hatchback() {
  return (
    <g fill={fill}>
      <path d="M8 52 L14 36 L32 30 L78 30 L92 36 L98 48 L100 56 L100 60 L94 64 L8 64 Z" />
      <path fill={roof} d="M34 32 L76 32 L88 38 L90 46 L32 42 Z" />
      <circle cx="26" cy="62" r="7" fill="#111" />
      <circle cx="26" cy="62" r="3.5" fill="#333" />
      <circle cx="80" cy="62" r="7" fill="#111" />
      <circle cx="80" cy="62" r="3.5" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M16 52 L96 52" opacity="0.35" />
    </g>
  );
}

function SuvSubcompact() {
  return (
    <g fill={fill}>
      <path d="M6 54 L10 40 L26 34 L82 32 L94 38 L100 50 L102 58 L96 64 L6 64 Z" />
      <path fill={roof} d="M28 36 L80 34 L90 40 L92 48 L30 44 Z" />
      <circle cx="22" cy="62" r="7.5" fill="#111" />
      <circle cx="22" cy="62" r="4" fill="#333" />
      <circle cx="82" cy="62" r="7.5" fill="#111" />
      <circle cx="82" cy="62" r="4" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M12 54 L98 54" opacity="0.35" />
    </g>
  );
}

function SuvCompact() {
  return (
    <g fill={fill}>
      <path d="M4 56 L8 38 L30 32 L86 30 L98 36 L104 50 L106 60 L100 66 L4 66 Z" />
      <path fill={roof} d="M32 34 L84 32 L94 40 L96 50 L34 46 Z" />
      <circle cx="24" cy="64" r="8" fill="#111" />
      <circle cx="24" cy="64" r="4" fill="#333" />
      <circle cx="86" cy="64" r="8" fill="#111" />
      <circle cx="86" cy="64" r="4" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M10 56 L102 56" opacity="0.35" />
    </g>
  );
}

function SuvMid() {
  return (
    <g fill={fill}>
      <path d="M2 58 L6 36 L34 30 L90 28 L102 34 L108 52 L110 62 L102 68 L2 68 Z" />
      <path fill={roof} d="M36 32 L88 30 L98 38 L100 52 L38 48 Z" />
      <circle cx="26" cy="66" r="8.5" fill="#111" />
      <circle cx="26" cy="66" r="4" fill="#333" />
      <circle cx="90" cy="66" r="8.5" fill="#111" />
      <circle cx="90" cy="66" r="4" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M8 58 L106 58" opacity="0.35" />
    </g>
  );
}

function SuvLarge() {
  return (
    <g fill={fill}>
      <path d="M0 60 L4 34 L38 28 L92 26 L104 32 L112 52 L114 64 L106 70 L0 70 Z" />
      <path fill={roof} d="M40 30 L90 28 L100 36 L102 54 L42 50 Z" />
      <circle cx="28" cy="68" r="9" fill="#111" />
      <circle cx="28" cy="68" r="4.5" fill="#333" />
      <circle cx="94" cy="68" r="9" fill="#111" />
      <circle cx="94" cy="68" r="4.5" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M6 60 L110 60" opacity="0.35" />
    </g>
  );
}

function Roadster() {
  return (
    <g fill={fill}>
      <path d="M12 56 L18 42 L38 36 L78 34 L92 40 L98 52 L100 58 L94 62 L12 62 Z" />
      <path fill={roof} d="M40 38 L74 36 L86 42 L88 50 L38 46 Z" />
      <circle cx="26" cy="60" r="7" fill="#111" />
      <circle cx="26" cy="60" r="3.5" fill="#333" />
      <circle cx="82" cy="60" r="7" fill="#111" />
      <circle cx="82" cy="60" r="3.5" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M16 54 L96 54" opacity="0.35" />
    </g>
  );
}

function RoadsterRf() {
  return (
    <g fill={fill}>
      <path d="M12 56 L18 40 L42 34 L80 34 L94 40 L100 52 L100 58 L94 62 L12 62 Z" />
      <path fill={roof} d="M42 36 L78 36 L90 42 L92 52 L40 48 Z" />
      <rect x="44" y="32" width="32" height="8" rx="2" fill={roof} opacity="0.9" />
      <circle cx="28" cy="60" r="7" fill="#111" />
      <circle cx="28" cy="60" r="3.5" fill="#333" />
      <circle cx="84" cy="60" r="7" fill="#111" />
      <circle cx="84" cy="60" r="3.5" fill="#333" />
      <path fill="none" stroke={accent} strokeWidth="1.2" d="M16 54 L98 54" opacity="0.35" />
    </g>
  );
}

const byStyle: Record<ModelBodyStyle, ReactNode> = {
  sedan: <Sedan />,
  hatchback: <Hatchback />,
  "suv-subcompact": <SuvSubcompact />,
  "suv-compact": <SuvCompact />,
  "suv-mid": <SuvMid />,
  "suv-large": <SuvLarge />,
  roadster: <Roadster />,
  "roadster-rf": <RoadsterRf />,
};

export function ModelSilhouette({
  bodyStyle,
  className,
  title,
}: {
  bodyStyle: ModelBodyStyle;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 112 72"
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {byStyle[bodyStyle]}
    </svg>
  );
}
