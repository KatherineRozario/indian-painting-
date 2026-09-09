import { useState } from "react";
import { Reveal } from "../Reveal";
import { Artwork } from "../art/Artwork";
import {
  MotifBird,
  MotifDanceCircle,
  MotifDeity,
  MotifDrum,
  MotifFarming,
  MotifFloralBorder,
  MotifLeaf,
  MotifLotus,
  MotifPattern,
  MotifVine,
  MotifWarliAnimal,
  MotifWarliFigure,
  MotifWarliSun,
  MotifWarliTree,
} from "../art/motifs";

type Motif = {
  id: string;
  name: string;
  tradition: "Warli" | "Kalamkari";
  role: string;
  transformed: string;
  C: (p: { className?: string; title?: string }) => React.ReactElement;
};

const motifs: Motif[] = [
  {
    id: "dance-circle",
    name: "Dance circle",
    tradition: "Warli",
    role: "Structural centre of the composition; the tarpa dance that gathers the village.",
    transformed: "Flattened into an ellipse so it reads as a textile medallion rather than a plan view.",
    C: MotifDanceCircle,
  },
  {
    id: "medallion",
    name: "Human figure",
    tradition: "Warli",
    role: "Circle head, two triangles, stick limbs — the irreducible unit of the whole scene.",
    transformed: "Kept unmodified in silhouette, but arranged on a Kalamkari petal rhythm of sixteen.",
    C: MotifWarliFigure,
  },
  {
    id: "tree",
    name: "Tree",
    tradition: "Warli",
    role: "Triangular sign for the grove that frames every village scene.",
    transformed: "Warli triangular trunk crowned with a Kalamkari leaf canopy — a single hybrid plant.",
    C: MotifWarliTree,
  },
  {
    id: "animal",
    name: "Animal",
    tradition: "Warli",
    role: "Cattle, the measure of village wealth, drawn in the lower register.",
    transformed: "Held in the ground plane and mirrored, so it also functions as a border rhythm.",
    C: MotifWarliAnimal,
  },
  {
    id: "sun",
    name: "Sun and moon",
    tradition: "Warli",
    role: "Cosmic markers of the ritual calendar above the gathering.",
    transformed: "The rays are redrawn as Kalamkari petals — geometry becomes botany.",
    C: MotifWarliSun,
  },
  {
    id: "farming",
    name: "Farming scene",
    tradition: "Warli",
    role: "Harvest labour, the reason the celebration exists.",
    transformed: "Compressed into a base register that behaves like a Kalamkari narrative panel.",
    C: MotifFarming,
  },
  {
    id: "drum",
    name: "Tarpa and drum",
    tradition: "Warli",
    role: "Music that sets the tempo of the circle.",
    transformed: "Drum bodies drawn in madder line so they belong to the dyed palette.",
    C: MotifDrum,
  },
  {
    id: "lotus",
    name: "Lotus",
    tradition: "Kalamkari",
    role: "Emblem of cosmic order; the recurring medallion of temple cloth.",
    transformed: "Its core is rebuilt from sixteen Warli triangles before the petals are drawn.",
    C: MotifLotus,
  },
  {
    id: "vine",
    name: "Vine",
    tradition: "Kalamkari",
    role: "Connective tissue that fills the field and links episodes.",
    transformed: "Routed to trace the paths dancers would take, binding the two systems.",
    C: MotifVine,
  },
  {
    id: "vine-leaf",
    name: "Leaf",
    tradition: "Kalamkari",
    role: "Densely veined unit that establishes the pen-work texture.",
    transformed: "Simplified to a two-curve outline so it can sit beside Warli's flat line weight.",
    C: MotifLeaf,
  },
  {
    id: "floral-border",
    name: "Floral border",
    tradition: "Kalamkari",
    role: "The frame that turns a picture into a hanging.",
    transformed: "Scalloped border kept, but corner lotuses align to the geometry of the dance.",
    C: MotifFloralBorder,
  },
  {
    id: "deity",
    name: "Mythological figure",
    tradition: "Kalamkari",
    role: "Epic protagonist, usually the dominant scale in temple cloth.",
    transformed: "Demoted to a faint guardian at the margins — the community, not the deity, is central.",
    C: MotifDeity,
  },
  {
    id: "bird",
    name: "Bird",
    tradition: "Kalamkari",
    role: "Garden inhabitant; carrier of auspicious meaning.",
    transformed: "Drawn in indigo and placed on vine junctions that also mark dance axes.",
    C: MotifBird,
  },
  {
    id: "pattern",
    name: "Decorative pattern",
    tradition: "Kalamkari",
    role: "Repeat printing that unifies the cloth surface.",
    transformed: "Used at low contrast as the ground texture beneath the entire composition.",
    C: MotifPattern,
  },
];

export function MotifExplorer() {
  const [sel, setSel] = useState<string>("dance-circle");
  const [filter, setFilter] = useState<"all" | "Warli" | "Kalamkari">("all");
  const current = motifs.find((m) => m.id === sel) ?? motifs[0]!;
  const shown = motifs.filter((m) => filter === "all" || m.tradition === filter);

  return (
    <section id="motifs" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <Reveal>
          <p className="label-caps reveal-item text-muted-foreground">04 — Motif explorer</p>
          <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Every element, and what it became
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-px bg-border">
          {(["all", "Warli", "Kalamkari"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-6 py-3 label-caps transition-colors ${
                filter === f ? "bg-ink text-primary-foreground" : "bg-canvas hover:bg-beige"
              }`}
            >
              {f === "all" ? "All motifs" : f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ul className="grid grid-cols-3 gap-px bg-border sm:grid-cols-4 lg:grid-cols-5">
            {shown.map((m, i) => (
              <li key={m.id}>
                <button
                  onClick={() => setSel(m.id)}
                  aria-pressed={sel === m.id}
                  className={`group flex aspect-square w-full flex-col items-center justify-center gap-2 p-3 transition-colors ${
                    sel === m.id ? "bg-ink text-primary-foreground" : "bg-canvas hover:bg-beige"
                  }`}
                  style={{ animation: `soft-in 0.5s ease ${i * 0.03}s both` }}
                >
                  <m.C
                    className={`h-12 w-12 transition-transform duration-500 group-hover:scale-110 ${
                      sel === m.id
                        ? "text-primary-foreground"
                        : m.tradition === "Warli"
                          ? "text-ink"
                          : "text-terracotta"
                    }`}
                    title={m.name}
                  />
                  <span className="text-center text-[0.62rem] uppercase tracking-widest">
                    {m.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border border-ink bg-card">
            <div key={current.id} className="p-8" style={{ animation: "fade-rise 0.6s ease both" }}>
              <div className="flex items-start gap-6">
                <div className="w-28 shrink-0 border border-border p-3">
                  <current.C
                    className={`h-full w-full ${current.tradition === "Warli" ? "text-ink" : "text-terracotta"}`}
                    title={current.name}
                  />
                </div>
                <div>
                  <p className="label-caps text-muted-foreground">{current.tradition}</p>
                  <h3 className="mt-2 text-2xl">{current.name}</h3>
                </div>
              </div>

              <dl className="mt-8 space-y-5 text-sm leading-relaxed">
                <div>
                  <dt className="label-caps text-muted-foreground">Role in the artwork</dt>
                  <dd className="mt-2 text-ink-soft">{current.role}</dd>
                </div>
                <div>
                  <dt className="label-caps text-muted-foreground">Transformed for the synthesis</dt>
                  <dd className="mt-2 text-ink-soft">{current.transformed}</dd>
                </div>
              </dl>
            </div>

            <figure className="border-t border-border">
              <Artwork highlight={current.id} className="w-full" />
              <figcaption className="border-t border-border px-8 py-4 label-caps text-muted-foreground">
                Located in the composition — original synthesis
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
