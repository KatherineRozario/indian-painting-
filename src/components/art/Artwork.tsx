import { KalamkariBird, KalamkariLotus, WarliBody, WarliTree } from "./motifs";

export type ArtLayer = "full" | "warli" | "kalamkari" | "shared";

const CX = 500;
const CY = 372;

function dancers(radius: number, count: number, phase = 0) {
  return Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2 + phase;
    return {
      x: CX + Math.cos(a) * radius,
      y: CY + Math.sin(a) * radius * 0.62,
      rot: Math.sin(a) * 12,
      i,
    };
  });
}

/** Kalamkari-style scalloped border, drawn as one continuous path. */
function scallop(x: number, y: number, w: number, step: number, up: boolean) {
  let d = `M ${x} ${y}`;
  const n = Math.floor(w / step);
  for (let i = 0; i < n; i++) {
    d += ` a ${step / 2} ${step / 2} 0 0 ${up ? 1 : 0} ${step} 0`;
  }
  return d;
}

export function Artwork({
  layer = "full",
  drawOnMount = false,
  highlight,
  className,
}: {
  layer?: ArtLayer;
  drawOnMount?: boolean;
  highlight?: string;
  className?: string;
}) {
  const warliOn = layer === "full" || layer === "warli" || layer === "shared";
  const kalamOn = layer === "full" || layer === "kalamkari" || layer === "shared";
  const dim = (on: boolean, primary: boolean) => (on ? (primary ? 1 : 0.28) : 0.08);

  const warliOpacity = dim(warliOn, layer !== "kalamkari");
  const kalamOpacity = dim(kalamOn, layer !== "warli");
  const sharedOpacity = layer === "shared" ? 1 : layer === "full" ? 0.55 : 0.18;

  const hl = (id: string) =>
    highlight === id ? "opacity-100" : highlight ? "opacity-25" : "opacity-100";

  return (
    <svg
      viewBox="0 0 1000 740"
      className={className}
      role="img"
      aria-label="Rhythm of the Earth — an original synthesis of Warli and Kalamkari visual languages: a circular dance of geometric figures inside a growing botanical border."
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Rhythm of the Earth — original synthesis artwork</title>

      <defs>
        <pattern id="kk-textile" width="26" height="26" patternUnits="userSpaceOnUse">
          <path
            d="M 13 2 L 24 13 L 13 24 L 2 13 Z"
            fill="none"
            stroke="var(--color-terracotta)"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle cx="13" cy="13" r="1.6" fill="var(--color-ochre)" opacity="0.5" />
        </pattern>
        <radialGradient id="kk-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--color-ochre)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-ochre)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* paper */}
      <rect x="0" y="0" width="1000" height="740" fill="var(--color-canvas)" />
      <rect x="46" y="46" width="908" height="648" fill="url(#kk-textile)" opacity="0.75" />
      <circle cx={CX} cy={CY} r="300" fill="url(#kk-glow)" />

      {/* ============ KALAMKARI LAYER ============ */}
      <g
        style={{ opacity: kalamOpacity, transition: "opacity 900ms ease" }}
        stroke="var(--color-terracotta)"
        fill="none"
      >
        {/* border frame */}
        <g className={hl("floral-border")}>
          <rect
            x="30"
            y="30"
            width="940"
            height="680"
            strokeWidth="2"
            className={drawOnMount ? "draw" : undefined}
            style={{ ["--len" as string]: "3300", ["--dur" as string]: "2.6s" }}
          />
          <rect x="46" y="46" width="908" height="648" strokeWidth="0.8" />
          <rect x="86" y="86" width="828" height="568" strokeWidth="0.8" stroke="var(--color-ink)" />
          <path d={scallop(46, 66, 908, 26, true)} strokeWidth="0.9" />
          <path d={scallop(46, 674, 908, 26, false)} strokeWidth="0.9" />
          {[
            [60, 60, 0],
            [940, 60, 90],
            [940, 680, 180],
            [60, 680, 270],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(1.15)`}>
              <KalamkariLotus petals={12} />
            </g>
          ))}
          {/* vertical vine rails */}
          <path
            d="M 66 96 C 82 180 50 250 70 330 C 88 402 52 470 70 560 C 78 606 66 630 66 646"
            strokeWidth="1"
          />
          <path
            d="M 934 96 C 918 180 950 250 930 330 C 912 402 948 470 930 560 C 922 606 934 630 934 646"
            strokeWidth="1"
          />
        </g>

        {/* growing vines into the composition */}
        <g
          className={hl("vine")}
          style={{ animation: drawOnMount ? undefined : undefined }}
        >
          {[
            "M 96 640 C 190 600 150 500 240 470 C 320 444 330 386 300 330",
            "M 904 640 C 810 600 850 500 760 470 C 680 444 670 386 700 330",
            "M 120 120 C 220 170 250 230 330 236 C 390 240 420 218 452 190",
            "M 880 120 C 780 170 750 230 670 236 C 610 240 580 218 548 190",
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              strokeWidth="1.4"
              className={drawOnMount ? "draw" : undefined}
              style={{
                ["--len" as string]: "700",
                ["--dur" as string]: "2.4s",
                ["--delay" as string]: `${1 + i * 0.35}s`,
              }}
            />
          ))}
          {/* leaves along the vines */}
          {[
            [172, 606, -30],
            [206, 552, 20],
            [246, 470, -55],
            [292, 404, 30],
            [828, 606, 210],
            [794, 552, 160],
            [754, 470, 235],
            [708, 404, 150],
            [214, 166, 45],
            [300, 232, -20],
            [786, 166, 135],
            [700, 232, 200],
          ].map(([x, y, r], i) => (
            <path
              key={i}
              d="M 0 0 C 14 -6 22 -18 20 -30 C 6 -28 -2 -14 0 0 Z"
              transform={`translate(${x} ${y}) rotate(${r}) scale(0.9)`}
              strokeWidth="0.9"
            />
          ))}
        </g>

        {/* blooms */}
        <g className={hl("lotus")}>
          {[
            [150, 300, 1.3],
            [850, 300, 1.3],
            [250, 620, 1.05],
            [750, 620, 1.05],
            [430, 128, 0.85],
            [570, 128, 0.85],
          ].map(([x, y, s], i) => (
            <g
              key={i}
              transform={`translate(${x} ${y}) scale(${s})`}
              style={{
                animation: `grow-up 1s ease ${1.8 + i * 0.18}s both`,
                transformOrigin: `${x}px ${y}px`,
              }}
            >
              <KalamkariLotus petals={12} />
            </g>
          ))}
        </g>

        {/* birds */}
        <g className={hl("bird")} stroke="var(--color-indigo)">
          {[
            [206, 214, 1.5, 1],
            [794, 214, -1.5, 1],
            [330, 596, 1.2, 1],
            [672, 596, -1.2, 1],
          ].map(([x, y, sx], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${sx} 1.3)`}>
              <KalamkariBird />
            </g>
          ))}
        </g>

        {/* mythological narrative figures, held back in the ground plane */}
        <g className={hl("deity")} stroke="var(--color-madder)" opacity="0.55">
          {[
            [128, 452, 1],
            [872, 452, -1],
          ].map(([x, y, f], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${f} 1)`} strokeWidth="1">
              <path d="M 0 -66 C 9 -56 9 -46 0 -40 C -9 -46 -9 -56 0 -66 Z" />
              <circle cx="0" cy="-30" r="11" />
              <path d="M 0 -19 C -18 -14 -22 4 -19 32 L 19 32 C 22 4 18 -14 0 -19 Z" />
              <path d="M -12 -8 C -30 -12 -34 -26 -30 -36 M 12 -8 C 30 -12 34 -26 30 -36" />
              <path d="M -12 -4 C -26 2 -30 16 -28 32 M 12 -4 C 26 2 30 16 28 32" />
              <path d="M -8 40 L -8 66 M 8 40 L 8 66" />
            </g>
          ))}
        </g>
      </g>

      {/* ============ SHARED / FUSION CONNECTIONS ============ */}
      <g
        style={{ opacity: sharedOpacity, transition: "opacity 900ms ease" }}
        stroke="var(--color-ink)"
        fill="none"
        className={hl("shared")}
      >
        <ellipse
          cx={CX}
          cy={CY}
          rx="248"
          ry="156"
          strokeWidth="0.9"
          strokeDasharray="5 9"
          style={{ animation: "pulse-ring 5s ease-in-out infinite" }}
        />
        <ellipse cx={CX} cy={CY} rx="120" ry="76" strokeWidth="0.8" strokeDasharray="3 7" />
        {([
          [150, 300, 320, 320],
          [850, 300, 680, 320],
          [250, 620, 400, 500],
          [750, 620, 600, 500],
          [500, 128, 500, 214],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 40} ${x2} ${y2}`}
            strokeWidth="0.7"
            strokeDasharray="2 6"
            style={{ animation: `pulse-ring ${4 + i * 0.4}s ease-in-out infinite` }}
          />
        ))}
      </g>

      {/* ============ WARLI LAYER ============ */}
      <g
        style={{ opacity: warliOpacity, transition: "opacity 900ms ease" }}
        stroke="var(--color-ink)"
        fill="none"
      >
        {/* sun: warli disc, kalamkari petal rays */}
        <g className={hl("sun")} transform="translate(214 176)">
          <g style={{ animation: "slow-spin 90s linear infinite", transformOrigin: "0px 0px" }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <path
                key={i}
                d="M 0 -30 C 4 -38 4 -46 0 -54 C -4 -46 -4 -38 0 -30 Z"
                transform={`rotate(${i * 20})`}
                strokeWidth="1"
                stroke="var(--color-ochre)"
              />
            ))}
          </g>
          <circle cx="0" cy="0" r="28" strokeWidth="1.6" />
          <circle cx="0" cy="0" r="14" strokeWidth="1.2" />
        </g>

        {/* moon */}
        <g className={hl("sun")} transform="translate(786 176)">
          <path d="M 16 -22 A 28 28 0 1 0 16 22 A 22 22 0 1 1 16 -22 Z" strokeWidth="1.5" />
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d="M 0 -34 L 0 -44"
              transform={`rotate(${-80 + i * 18})`}
              strokeWidth="0.9"
              stroke="var(--color-ochre)"
            />
          ))}
        </g>

        {/* trees: warli triangles wearing kalamkari canopies */}
        <g className={hl("tree")}>
          {[
            [176, 596, 1.5],
            [824, 596, 1.5],
          ].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <WarliTree />
              <g transform="translate(0 -46)" stroke="var(--color-leaf)">
                {Array.from({ length: 7 }).map((_, k) => (
                  <path
                    key={k}
                    d="M 0 0 C 9 -5 13 -13 12 -21 C 4 -19 -1 -8 0 0 Z"
                    transform={`rotate(${-70 + k * 23})`}
                    strokeWidth="0.8"
                  />
                ))}
              </g>
            </g>
          ))}
        </g>

        {/* the dance: two concentric rings of figures */}
        <g className={hl("dance-circle")}>
          {dancers(238, 16).map((d) => (
            <g
              key={`o${d.i}`}
              style={{
                animation: `soft-in 0.5s ease ${0.5 + d.i * 0.07}s both, sway ${5 + (d.i % 4)}s ease-in-out ${d.i * 0.2}s infinite`,
                transformOrigin: `${d.x}px ${d.y}px`,
              }}
            >
              <WarliBody
                x={d.x}
                y={d.y}
                s={1.25}
                rotate={d.rot}
                arms={d.i % 2 ? "dance" : "up"}
              />
            </g>
          ))}
          {dancers(122, 8, 0.4).map((d) => (
            <g
              key={`i${d.i}`}
              style={{
                animation: `soft-in 0.5s ease ${1.2 + d.i * 0.08}s both, sway ${4 + (d.i % 3)}s ease-in-out ${d.i * 0.25}s infinite`,
                transformOrigin: `${d.x}px ${d.y}px`,
              }}
            >
              <WarliBody x={d.x} y={d.y} s={0.95} rotate={-d.rot} arms="rest" />
            </g>
          ))}
        </g>

        {/* central medallion: lotus core built from warli triangles */}
        <g className={hl("medallion")} transform={`translate(${CX} ${CY})`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M 0 -20 L -11 -50 L 11 -50 Z"
              transform={`rotate(${i * 22.5})`}
              strokeWidth="0.9"
              stroke={i % 2 ? "var(--color-terracotta)" : "var(--color-ink)"}
            />
          ))}
          <g stroke="var(--color-terracotta)">
            <KalamkariLotus petals={10} s={1.15} />
          </g>
          <circle cx="0" cy="0" r="60" strokeWidth="0.8" strokeDasharray="4 6" />
        </g>

        {/* musicians */}
        <g className={hl("drum")}>
          {[
            [364, 250],
            [636, 250],
          ].map(([x, y], i) => (
            <g key={i}>
              <WarliBody x={x} y={y} s={1.1} arms="carry" />
              <g transform={`translate(${x + (i ? 22 : -22)} ${y - 2})`} strokeWidth="1.1">
                <path d="M -11 -10 L 11 -10 L 7 12 L -7 12 Z" stroke="var(--color-terracotta)" />
                <ellipse cx="0" cy="-10" rx="11" ry="3.4" stroke="var(--color-terracotta)" />
              </g>
            </g>
          ))}
        </g>

        {/* farmers and field, lower register */}
        <g className={hl("farming")}>
          <path d="M 118 640 L 882 640" strokeWidth="1" />
          {[300, 348, 660, 708].map((x, i) => (
            <g key={i}>
              <WarliBody x={x} y={632} s={0.95} arms={i % 2 ? "carry" : "rest"} />
            </g>
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <path
              key={i}
              d={`M ${140 + i * 33} 664 L ${140 + i * 33} 648 M ${134 + i * 33} 656 L ${146 + i * 33} 656`}
              strokeWidth="0.8"
              stroke="var(--color-leaf)"
            />
          ))}
        </g>

        {/* animals */}
        <g className={hl("animal")}>
          {[
            [420, 604, 1],
            [592, 604, -1],
          ].map(([x, y, f], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${f} 1)`} strokeWidth="1.3">
              <path d="M -26 0 L 26 0 L 34 -13 L 42 -16 L 36 -5 L 28 5 L -26 8 Z" />
              <path d="M -21 8 L -23 30 M -8 8 L -8 30 M 13 5 L 15 28 M 26 4 L 28 28" />
              <path d="M -26 0 L -37 -11 L -29 -3" />
              <path d="M 39 -18 L 44 -26 M 34 -18 L 32 -27" />
            </g>
          ))}
        </g>
      </g>

      {/* signature block */}
      <g stroke="var(--color-ink-soft)" fill="var(--color-ink-soft)">
        <text
          x="86"
          y="712"
          fontSize="13"
          letterSpacing="3"
          fontFamily='"Times New Roman", Times, serif'
          stroke="none"
        >
          RHYTHM OF THE EARTH — ORIGINAL SYNTHESIS
        </text>
        <text
          x="914"
          y="712"
          fontSize="13"
          textAnchor="end"
          letterSpacing="3"
          fontFamily='"Times New Roman", Times, serif'
          stroke="none"
        >
          WARLI × KALAMKARI
        </text>
      </g>
    </svg>
  );
}
