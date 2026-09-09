import type { ReactNode } from "react";

/**
 * Original motif drawings inspired by the visual vocabulary of Warli
 * (Maharashtra) and Kalamkari (Andhra Pradesh). All geometry is authored
 * here — nothing is traced from an existing artwork.
 */

type Common = { className?: string; title?: string };

function Frame({ children, className, title }: Common & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ---------------- Warli primitives ---------------- */

/** A single Warli figure: circle head, two opposed triangles, stick limbs. */
export function WarliBody({
  x = 0,
  y = 0,
  s = 1,
  rotate = 0,
  arms = "dance",
  strokeWidth = 1.6,
}: {
  x?: number;
  y?: number;
  s?: number;
  rotate?: number;
  arms?: "dance" | "up" | "carry" | "rest";
  strokeWidth?: number;
}) {
  const armPath =
    arms === "dance"
      ? "M -7 -6 L -12 -13 M 7 -6 L 12 -13"
      : arms === "up"
        ? "M -6 -7 L -11 -18 M 6 -7 L 11 -18"
        : arms === "carry"
          ? "M -7 -6 L -13 -2 M 7 -6 L 13 -2"
          : "M -7 -6 L -12 2 M 7 -6 L 12 2";
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`} strokeWidth={strokeWidth}>
      <circle cx="0" cy="-18" r="4.6" />
      <path d="M 0 -13 L -7.5 -2 L 7.5 -2 Z" />
      <path d="M 0 -13 L -7.5 -2 L 7.5 -2 Z" transform="translate(0 8) rotate(180)" />
      <path d={armPath} />
      <path d="M -1.5 6 L -7 18 M 1.5 6 L 7 18" />
    </g>
  );
}

/** Warli triangle tree that carries a Kalamkari canopy in the fusion. */
export function WarliTree({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M 0 0 L 0 -34" strokeWidth={1.6} />
      <path d="M 0 -34 L -14 -8 L 14 -8 Z" strokeWidth={1.4} />
      <path d="M 0 -44 L -10 -26 L 10 -26 Z" strokeWidth={1.4} />
      <path d="M 0 -12 L -9 -18 M 0 -20 L 9 -26" strokeWidth={1.1} />
    </g>
  );
}

/* ---------------- Kalamkari primitives ---------------- */

/** A curling Kalamkari vine with leaves and a terminal bloom. */
export function KalamkariVine({
  d,
  leaves = 6,
  className,
  style,
}: {
  d: string;
  leaves?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <g className={className} style={style}>
      <path d={d} strokeWidth={1.1} />
      {Array.from({ length: leaves }).map((_, i) => (
        <use key={i} href="#kk-leaf" />
      ))}
    </g>
  );
}

export function KalamkariLotus({
  x = 0,
  y = 0,
  s = 1,
  petals = 10,
}: {
  x?: number;
  y?: number;
  s?: number;
  petals?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={1}>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d="M 0 0 C 4 -6 4 -13 0 -18 C -4 -13 -4 -6 0 0 Z"
          transform={`rotate(${(360 / petals) * i})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.4" />
      <circle cx="0" cy="0" r="1.2" />
    </g>
  );
}

export function KalamkariBird({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={1.1}>
      <path d="M -10 0 C -6 -9 6 -11 11 -4 C 14 -1 12 3 8 3 L -4 3 C -8 3 -10 2 -10 0 Z" />
      <path d="M -2 -3 C 2 -8 8 -8 10 -4" />
      <path d="M 11 -5 L 16 -7 L 12 -2" />
      <path d="M -10 0 L -20 6 L -12 3" />
      <circle cx="9" cy="-4.6" r="0.9" fill="currentColor" />
    </g>
  );
}

/* ---------------- Thumbnail motifs ---------------- */

export function MotifWarliFigure(p: Common) {
  return (
    <Frame {...p}>
      <g transform="translate(50 62) scale(1.5)">
        <WarliBody arms="dance" />
      </g>
    </Frame>
  );
}

export function MotifWarliTree(p: Common) {
  return (
    <Frame {...p}>
      <g transform="translate(50 84) scale(1.55)">
        <WarliTree />
      </g>
    </Frame>
  );
}

export function MotifWarliAnimal(p: Common) {
  return (
    <Frame {...p}>
      <g transform="translate(50 58)">
        <path d="M -20 0 L 20 0 L 26 -10 L 32 -12 L 28 -4 L 22 4 L -20 6 Z" />
        <path d="M -16 6 L -18 22 M -6 6 L -6 22 M 10 4 L 12 20 M 20 3 L 22 20" />
        <path d="M -20 0 L -28 -8 L -22 -2" />
        <path d="M 30 -13 L 34 -19 M 26 -13 L 24 -20" />
      </g>
    </Frame>
  );
}

export function MotifWarliSun(p: Common) {
  return (
    <Frame {...p}>
      <circle cx="50" cy="50" r="17" />
      <circle cx="50" cy="50" r="9" />
      {Array.from({ length: 16 }).map((_, i) => (
        <path key={i} d="M 50 30 L 50 20" transform={`rotate(${i * 22.5} 50 50)`} />
      ))}
    </Frame>
  );
}

export function MotifDanceCircle(p: Common) {
  return (
    <Frame {...p}>
      <circle cx="50" cy="50" r="30" strokeDasharray="3 4" />
      <circle cx="50" cy="50" r="12" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <g key={i} transform={`translate(${50 + Math.cos(a) * 30} ${50 + Math.sin(a) * 30})`}>
            <WarliBody s={0.5} rotate={(i / 8) * 360 + 90} arms="dance" strokeWidth={2.4} />
          </g>
        );
      })}
    </Frame>
  );
}

export function MotifFarming(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 8 76 L 92 76" />
      <g transform="translate(30 74) scale(1.05)">
        <WarliBody arms="carry" />
      </g>
      <path d="M 44 62 L 66 70 L 66 76" />
      <path d="M 62 76 L 84 76 L 84 62" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${16 + i * 6} 88 L ${16 + i * 6} 80 M ${13 + i * 6} 84 L ${19 + i * 6} 84`} />
      ))}
    </Frame>
  );
}

export function MotifDrum(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 30 30 L 70 30 L 62 70 L 38 70 Z" />
      <ellipse cx="50" cy="30" rx="20" ry="6" />
      <ellipse cx="50" cy="70" rx="12" ry="4" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${33 + i * 11} 33 L ${39 + i * 8} 67`} strokeWidth={0.8} />
      ))}
      <path d="M 74 26 L 88 16 M 74 62 L 90 70" />
    </Frame>
  );
}

export function MotifLotus(p: Common) {
  return (
    <Frame {...p}>
      <g transform="translate(50 50) scale(1.7)">
        <KalamkariLotus petals={12} />
      </g>
    </Frame>
  );
}

export function MotifVine(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 14 88 C 26 62 18 46 34 34 C 50 22 56 40 70 30 C 80 23 84 16 86 10" />
      {[
        [26, 66],
        [34, 46],
        [50, 32],
        [66, 32],
        [78, 20],
      ].map(([x, y], i) => (
        <path
          key={i}
          d="M 0 0 C 7 -3 11 -8 10 -14 C 3 -13 -1 -7 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${i % 2 ? 60 : -40})`}
          strokeWidth={1}
        />
      ))}
      <g transform="translate(86 10) scale(0.5)">
        <KalamkariLotus petals={8} />
      </g>
    </Frame>
  );
}

export function MotifLeaf(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 50 88 C 20 68 20 32 50 12 C 80 32 80 68 50 88 Z" />
      <path d="M 50 84 L 50 18" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M 50 ${28 + i * 9} L ${32 + i * 1.5} ${38 + i * 9} M 50 ${28 + i * 9} L ${68 - i * 1.5} ${38 + i * 9}`}
          strokeWidth={0.8}
        />
      ))}
    </Frame>
  );
}

export function MotifFloralBorder(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 6 24 L 94 24 M 6 76 L 94 76" />
      <path d="M 6 50 C 18 34 30 66 42 50 C 54 34 66 66 78 50 C 86 40 90 44 94 50" />
      {[18, 42, 66, 90].map((x, i) => (
        <g key={i} transform={`translate(${x} ${i % 2 ? 62 : 38}) scale(0.42)`}>
          <KalamkariLotus petals={8} />
        </g>
      ))}
    </Frame>
  );
}

export function MotifDeity(p: Common) {
  return (
    <Frame {...p}>
      <path d="M 50 14 C 58 22 58 30 50 36 C 42 30 42 22 50 14 Z" />
      <circle cx="50" cy="44" r="9" />
      <path d="M 50 53 C 36 56 32 70 34 88 L 66 88 C 68 70 64 56 50 53 Z" />
      <path d="M 40 60 C 26 58 22 48 24 40 M 60 60 C 74 58 78 48 76 40" />
      <path d="M 40 62 C 30 66 26 76 28 88 M 60 62 C 70 66 74 76 72 88" />
      <path d="M 44 44 L 56 44" strokeWidth={0.8} />
      <path d="M 42 74 C 50 70 56 78 62 74" strokeWidth={0.8} />
    </Frame>
  );
}

export function MotifBird(p: Common) {
  return (
    <Frame {...p}>
      <g transform="translate(46 56) scale(2.1)">
        <KalamkariBird />
      </g>
    </Frame>
  );
}

export function MotifPattern(p: Common) {
  return (
    <Frame {...p}>
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((__, c) => (
          <g key={`${r}-${c}`} transform={`translate(${16 + c * 22} ${16 + r * 22})`}>
            <path d="M -8 0 L 0 -8 L 8 0 L 0 8 Z" strokeWidth={0.9} />
            <circle cx="0" cy="0" r="2.2" strokeWidth={0.8} />
          </g>
        )),
      )}
    </Frame>
  );
}
