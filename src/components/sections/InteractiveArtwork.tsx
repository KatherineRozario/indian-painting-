import { useState } from "react";
import { Reveal } from "../Reveal";
import { Artwork, type ArtLayer } from "../art/Artwork";

const layers: { id: ArtLayer; label: string; note: string }[] = [
  {
    id: "warli",
    label: "Warli layer",
    note: "Kalamkari recedes. What remains is the geometric grammar: sixteen dancers on an outer ring, eight on an inner ring, musicians, cattle, farmers and the tree signs. Notice that no figure is larger than another — Warli composition refuses hierarchy.",
  },
  {
    id: "kalamkari",
    label: "Kalamkari layer",
    note: "The pen work alone: scalloped double border, corner lotus medallions, vine rails climbing the sides, birds at the junctions, and two guardian narrative figures held at low contrast in the margins.",
  },
  {
    id: "shared",
    label: "Shared elements",
    note: "The dashed armature both traditions agree on — circular order, symmetry about a vertical axis, repeated units, and nature as the frame of human activity. These lines are the joints of the synthesis.",
  },
  {
    id: "full",
    label: "Full composition",
    note: "All systems resolved together. The hybrids carry the argument: petal sun rays, a lotus core cut from Warli triangles, triangular trunks under drawn canopies, drums in madder line.",
  },
];

export function InteractiveArtwork() {
  const [layer, setLayer] = useState<ArtLayer>("full");
  const [zoom, setZoom] = useState(1);
  const active = layers.find((l) => l.id === layer)!;

  return (
    <section id="artwork" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <Reveal>
          <p className="label-caps reveal-item text-muted-foreground">06 — Interactive artwork</p>
          <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Take the composition apart
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px bg-border lg:grid-cols-[20rem_1fr]">
          <div className="bg-canvas">
            <ul>
              {layers.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setLayer(l.id)}
                    aria-pressed={layer === l.id}
                    className={`w-full border-b border-border px-6 py-5 text-left label-caps transition-colors ${
                      layer === l.id ? "bg-ink text-primary-foreground" : "hover:bg-beige"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div key={active.id} className="p-6" style={{ animation: "fade-rise 0.6s ease both" }}>
              <p className="label-caps text-muted-foreground">Curatorial note</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{active.note}</p>
            </div>

            <div className="border-t border-border p-6">
              <label className="block">
                <span className="label-caps text-muted-foreground">Zoom into detail</span>
                <input
                  type="range"
                  min={1}
                  max={2.4}
                  step={0.02}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  aria-label="Zoom into the artwork"
                  className="mt-3 w-full accent-[var(--color-ink)]"
                />
              </label>
              <p className="mt-2 text-sm tabular-nums text-muted-foreground">
                {zoom.toFixed(2)}×
              </p>
            </div>
          </div>

          <figure className="overflow-hidden bg-canvas p-3">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
                transition: "transform 600ms cubic-bezier(0.2,0.7,0.2,1)",
              }}
            >
              <Artwork layer={layer} className="w-full" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function FinalArtwork() {
  return (
    <section id="final" className="border-b border-border bg-beige/60">
      <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-12">
        <Reveal>
          <div className="reveal-item flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="label-caps text-muted-foreground">07 — Final artwork</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Rhythm of the Earth</h2>
            </div>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm text-ink-soft sm:grid-cols-4">
              {[
                ["Medium", "Vector drawing (SVG)"],
                ["Traditions", "Warli × Kalamkari"],
                ["Dimensions", "1000 × 740 units"],
                ["Status", "Original synthesis"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label-caps text-muted-foreground">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className="mt-10 border border-ink bg-card p-4">
          <div className="reveal-item">
            <Artwork drawOnMount className="w-full" />
          </div>
        </Reveal>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Original synthesis — drawn for this project. A fictional village celebration: the tarpa
          circle turns inside a dyed-cloth border, farmers and cattle hold the lower register, and
          the sun and moon are drawn with petals instead of rays.
        </p>
      </div>
    </section>
  );
}
