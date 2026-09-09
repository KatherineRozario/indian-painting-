import { useState } from "react";
import { Reveal } from "../Reveal";
import {
  MotifDanceCircle,
  MotifFloralBorder,
  MotifLeaf,
  MotifLotus,
  MotifPattern,
  MotifWarliAnimal,
  MotifWarliFigure,
  MotifWarliSun,
  MotifDeity,
  MotifVine,
  WarliBody,
} from "../art/motifs";

type Row = {
  id: string;
  label: string;
  warli: string;
  kalamkari: string;
  W: (p: { className?: string; title?: string }) => React.ReactElement;
  K: (p: { className?: string; title?: string }) => React.ReactElement;
};

const rows: Row[] = [
  {
    id: "origin",
    label: "Origin & region",
    warli: "Ritual wall painting of the Warli community, Palghar district, Maharashtra.",
    kalamkari: "Pen-and-dye temple textile of Srikalahasti and block-work of Machilipatnam, Andhra Pradesh.",
    W: MotifWarliFigure,
    K: MotifDeity,
  },
  {
    id: "geometric",
    label: "Geometric forms",
    warli: "Everything reduces to circle, triangle and line — an economical geometric grammar.",
    kalamkari: "Geometry appears only as the ordering grid of borders and registers.",
    W: MotifDanceCircle,
    K: MotifPattern,
  },
  {
    id: "botanical",
    label: "Botanical detail",
    warli: "Trees are triangular signs; nature is named rather than described.",
    kalamkari: "Leaves, buds and tendrils are described in exhaustive, particular detail.",
    W: MotifWarliAnimal,
    K: MotifLeaf,
  },
  {
    id: "line",
    label: "Line quality",
    warli: "Uniform bamboo-stick line, no thick–thin modulation, fast and rhythmic.",
    kalamkari: "Modulated kalam line, patient, contour plus interior detailing.",
    W: MotifWarliSun,
    K: MotifVine,
  },
  {
    id: "colour",
    label: "Colour system",
    warli: "Rice-paste white on earth-red or cow-dung ground; essentially monochrome.",
    kalamkari: "Natural dye palette — madder red, indigo, ochre, iron black, resist white.",
    W: MotifWarliFigure,
    K: MotifLotus,
  },
  {
    id: "story",
    label: "Storytelling",
    warli: "Collective, simultaneous: one field holds the whole village at once.",
    kalamkari: "Sequential, epic: bordered panels advance a mythological narrative.",
    W: MotifDanceCircle,
    K: MotifDeity,
  },
  {
    id: "composition",
    label: "Composition",
    warli: "Open, non-hierarchical, spiralling outward from the dance.",
    kalamkari: "Framed, register-based, every space filled — the textile discipline.",
    W: MotifWarliAnimal,
    K: MotifFloralBorder,
  },
  {
    id: "material",
    label: "Material & surface",
    warli: "Mud wall, bamboo twig, rice paste — architecture as the support.",
    kalamkari: "Cotton cloth, bamboo kalam, fermented iron ink, repeated dye baths.",
    W: MotifWarliSun,
    K: MotifPattern,
  },
];

const similarities = [
  ["Storytelling", "Both are narrative before they are decorative."],
  ["Nature", "Trees, birds and animals carry meaning in both."],
  ["Community", "Both were made collectively, for shared ritual use."],
  ["Symbolism", "Sun, tree and circle stand for cycles of life."],
  ["Repetition", "Repeated units build the surface in both traditions."],
  ["Rhythm", "Decorative rhythm organises the whole field."],
];

const differences = [
  ["Geometric", "Organic"],
  ["Minimal", "Intricate"],
  ["Monochrome", "Dyed palette"],
  ["Wall", "Textile"],
  ["Simplified sign", "Described figure"],
];

/** A Warli figure that morphs into an ornamented Kalamkari-style figure. */
function MorphFigure({ t }: { t: number }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
      <g stroke="var(--color-ink)" strokeWidth="1.6" transform="translate(100 130) scale(2.2)">
        <WarliBody arms="up" />
      </g>
      <g
        stroke="var(--color-terracotta)"
        strokeWidth="1"
        fill="none"
        style={{ opacity: t, transition: "opacity 600ms ease" }}
      >
        <path d="M 100 44 C 118 56 118 76 100 86 C 82 76 82 56 100 44 Z" />
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d="M 0 0 C 8 -4 12 -11 11 -18 C 3 -16 -1 -7 0 0 Z"
            transform={`translate(100 118) rotate(${-120 + i * 26}) scale(${0.8 + t * 0.5})`}
          />
        ))}
        <path d="M 60 150 C 78 138 122 138 140 150" />
        <path d="M 56 162 C 80 150 120 150 144 162" />
        <path d="M 74 100 C 86 92 114 92 126 100" />
      </g>
    </svg>
  );
}

export function Compare() {
  const [active, setActive] = useState<string>("geometric");
  const row = rows.find((r) => r.id === active) ?? rows[0]!;
  const [morph, setMorph] = useState(0);

  return (
    <section id="compare" className="border-b border-border bg-beige/60">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <Reveal>
          <p className="label-caps reveal-item text-muted-foreground">03 — Compare the styles</p>
          <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Warli | Kalamkari
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-[16rem_1fr_1fr]">
          <div className="bg-canvas">
            <ul>
              {rows.map((r) => (
                <li key={r.id}>
                  <button
                    onMouseEnter={() => setActive(r.id)}
                    onFocus={() => setActive(r.id)}
                    onClick={() => setActive(r.id)}
                    aria-pressed={active === r.id}
                    className={`w-full border-b border-border px-5 py-4 text-left label-caps transition-colors ${
                      active === r.id ? "bg-ink text-primary-foreground" : "hover:bg-beige"
                    }`}
                  >
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-canvas p-8">
            <p className="label-caps text-muted-foreground">Warli</p>
            <div key={`w-${row.id}`} style={{ animation: "fade-rise 0.6s ease both" }}>
              <row.W className="mt-6 h-40 w-40 text-ink" title={`Warli — ${row.label}`} />
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">{row.warli}</p>
            </div>
          </div>

          <div className="bg-canvas p-8">
            <p className="label-caps text-muted-foreground">Kalamkari</p>
            <div key={`k-${row.id}`} style={{ animation: "fade-rise 0.6s ease 0.1s both" }}>
              <row.K className="mt-6 h-40 w-40 text-terracotta" title={`Kalamkari — ${row.label}`} />
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">{row.kalamkari}</p>
            </div>
          </div>
        </div>

        {/* similarities & differences */}
        <div className="mt-20 grid gap-px bg-border lg:grid-cols-[1fr_1fr_20rem]">
          <Reveal className="bg-canvas p-8">
            <div className="reveal-item">
              <p className="label-caps text-muted-foreground">Similarities</p>
              <ul className="mt-6 space-y-4">
                {similarities.map(([k, v], i) => (
                  <li key={k} className="flex gap-4 border-b border-border pb-4">
                    <svg viewBox="0 0 40 24" className="mt-1 h-5 w-10 shrink-0" fill="none">
                      <circle cx="14" cy="12" r="9" stroke="var(--color-ink)" strokeWidth="1" />
                      <circle
                        cx="26"
                        cy="12"
                        r="9"
                        stroke="var(--color-terracotta)"
                        strokeWidth="1"
                        style={{ animation: `pulse-ring ${3 + i * 0.3}s ease-in-out infinite` }}
                      />
                    </svg>
                    <p className="text-sm leading-relaxed">
                      <span className="label-caps">{k}</span>
                      <span className="ml-3 text-ink-soft">{v}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="bg-canvas p-8" delay={0.1}>
            <div className="reveal-item">
              <p className="label-caps text-muted-foreground">Differences</p>
              <ul className="mt-6 space-y-5">
                {differences.map(([a, b]) => (
                  <li key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <span className="text-right text-sm">{a}</span>
                    <svg viewBox="0 0 80 10" className="h-3 w-20" fill="none">
                      <path
                        d="M 2 5 L 78 5"
                        stroke="var(--color-border)"
                        strokeWidth="1"
                        strokeDasharray="3 4"
                      />
                      <path d="M 70 1 L 78 5 L 70 9" stroke="var(--color-ink)" strokeWidth="1" />
                    </svg>
                    <span className="text-sm text-terracotta">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="bg-canvas p-8" delay={0.2}>
            <div className="reveal-item">
              <p className="label-caps text-muted-foreground">Transformation study</p>
              <div className="mt-4 aspect-square border border-border bg-card">
                <MorphFigure t={morph} />
              </div>
              <label className="mt-4 block text-sm">
                <span className="label-caps text-muted-foreground">Geometric → ornamental</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={morph}
                  onChange={(e) => setMorph(Number(e.target.value))}
                  aria-label="Transform the Warli figure toward Kalamkari ornament"
                  className="mt-3 w-full accent-[var(--color-ink)]"
                />
              </label>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
