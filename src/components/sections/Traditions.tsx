import { Reveal } from "../Reveal";
import {
  MotifDanceCircle,
  MotifFloralBorder,
  MotifLotus,
  MotifWarliFigure,
} from "../art/motifs";

const traditions = [
  {
    id: "warli",
    index: "Style 01",
    name: "Warli",
    region: "Northern Sahyadri hills, Maharashtra",
    period: "Wall-painting practice of the Warli community; documented from the 1970s, rooted in far older ritual traditions",
    body: "Warli painting is made by the Warli people on the mud walls of homes, traditionally by women, for marriage and harvest rituals. Rice-paste white on an earth-red ground. A single visual alphabet — circle, triangle, line — builds people, cattle, trees and whole villages, so the style is a system of thought rather than a set of pictures.",
    traits: [
      ["Line quality", "Even, unmodulated, drawn with a bamboo stick"],
      ["Shapes", "Circle head, two opposed triangles, stick limbs"],
      ["Colour", "Essentially monochrome — white on earth ground"],
      ["Subject", "Harvest, dance, marriage, cattle, daily labour"],
      ["Composition", "Non-hierarchical, rhythmic, spiralling crowds"],
      ["Symbolism", "The tarpa dance circle as continuity of life"],
    ],
    motifs: [MotifWarliFigure, MotifDanceCircle],
    motifLabels: ["Human figure", "Tarpa dance circle"],
  },
  {
    id: "kalamkari",
    index: "Style 02",
    name: "Kalamkari",
    region: "Srikalahasti and Machilipatnam, Andhra Pradesh",
    period: "Hand-drawn temple-cloth tradition; flourished under Golconda and Coromandel textile trade from the 16th century",
    body: "Kalam-kari — 'pen work'. A bamboo pen dipped in fermented jaggery-and-iron ink draws narrative on cotton, which is then dyed with madder, indigo, myrobalan and pomegranate rind. Temple hangings tell epics panel by panel; every empty space is filled with vines, blossoms, birds and printed borders.",
    traits: [
      ["Line quality", "Fine, varied, densely descriptive pen line"],
      ["Shapes", "Organic — petal, leaf, curling tendril, arch"],
      ["Colour", "Natural dyes: madder red, indigo, ochre, black"],
      ["Subject", "Epic narrative, deities, gardens, courtly life"],
      ["Composition", "Bordered registers, horror vacui, textile grid"],
      ["Symbolism", "The lotus and the tree of life as cosmic order"],
    ],
    motifs: [MotifLotus, MotifFloralBorder],
    motifLabels: ["Lotus medallion", "Ornamental border"],
  },
] as const;

export function Traditions() {
  return (
    <section id="traditions" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <Reveal>
          <p className="label-caps reveal-item text-muted-foreground">02 — The two traditions</p>
          <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Two visual languages, studied before they were joined
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-border lg:grid-cols-2">
          {traditions.map((t, ti) => (
            <Reveal key={t.id} className="bg-canvas p-8 lg:p-10" delay={ti * 0.12}>
              <div className="reveal-item">
                <p className="label-caps text-muted-foreground">{t.index}</p>
                <h3 className="mt-3 text-3xl">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.region}</p>

                <div className="mt-6 flex gap-3">
                  {t.motifs.map((M, i) => (
                    <figure key={i} className="w-28 border border-border bg-card p-2">
                      <M className="h-24 w-full text-ink" title={t.motifLabels[i]} />
                      <figcaption className="mt-2 text-center text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        {t.motifLabels[i]}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <p className="mt-6 max-w-prose leading-relaxed text-ink-soft">{t.body}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.period}</p>

                <dl className="mt-8 divide-y divide-border border-t border-border">
                  {t.traits.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                      <dt className="label-caps pt-[3px] text-muted-foreground">{k}</dt>
                      <dd className="text-ink-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
