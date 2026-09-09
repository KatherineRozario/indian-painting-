import { Reveal } from "../Reveal";

const borrowed = [
  {
    source: "Warli tarpa dance circle",
    interpretation: "Read as a compositional device rather than a subject",
    synthesis: "Flattened to an ellipse and used as the medallion of a hanging cloth",
  },
  {
    source: "Kalamkari lotus medallion",
    interpretation: "Read as a statement of cosmic order at the centre of a field",
    synthesis: "Rebuilt with a core of sixteen Warli triangles before the petals are drawn",
  },
  {
    source: "Warli triangular tree",
    interpretation: "Read as a sign that names nature instead of describing it",
    synthesis: "Given a pen-drawn Kalamkari canopy, so sign and description share one plant",
  },
  {
    source: "Kalamkari scalloped border",
    interpretation: "Read as the frame that turns painting into textile",
    synthesis: "Kept, but its corner blooms are set on the axes of the dance geometry",
  },
  {
    source: "Kalamkari epic protagonist",
    interpretation: "Read as the hierarchy that Warli deliberately avoids",
    synthesis: "Reduced to faint marginal guardians so the community remains the centre",
  },
];

const references = [
  [
    "Warli painting — cultural context and technique",
    "Ministry of Culture, Government of India; Indira Gandhi National Centre for the Arts (IGNCA) documentation on tribal wall painting.",
    "https://ignca.gov.in/",
  ],
  [
    "Kalamkari — Srikalahasti pen-work and Machilipatnam block-printing",
    "Victoria and Albert Museum, South Asian textiles collection notes; Ministry of Textiles, Government of India craft records.",
    "https://www.vam.ac.uk/",
  ],
  [
    "Indian painted and dyed cotton, Coromandel Coast",
    "The Metropolitan Museum of Art, collection and Heilbrunn Timeline of Art History essays on Indian textiles.",
    "https://www.metmuseum.org/toah/",
  ],
  [
    "General visual reference for traditional motifs",
    "Wikimedia Commons categories for Warli painting and Kalamkari, consulted for study only; no image was traced or reproduced.",
    "https://commons.wikimedia.org/",
  ],
];

export function Reflection() {
  return (
    <>
      <section id="reflection" className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
          <Reveal>
            <p className="label-caps reveal-item text-muted-foreground">08 — Reflection</p>
            <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
              Why these two traditions belong in one field
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div className="reveal-item max-w-prose space-y-5 leading-relaxed text-ink-soft">
                <p>
                  Warli and Kalamkari sit at opposite ends of one shared instinct. Both are
                  narrative traditions made for communal occasions; both organise the surface by
                  repetition; both treat plants, animals and celestial bodies as carriers of
                  meaning rather than as scenery. What separates them is description. Warli says
                  &quot;a person&quot; with three shapes. Kalamkari says &quot;a person&quot; with a
                  hundred lines of jewellery, textile and gesture.
                </p>
                <p>
                  Placing them side by side would only have shown that difference. Merging them
                  required finding structures each tradition could accept: a circle, a border, a
                  vertical axis, a repeated unit. Once the dance circle was treated as a medallion,
                  Kalamkari's framing logic could hold Warli's crowd without shrinking it, and
                  Warli's geometry could give the ornament a skeleton it does not usually have.
                </p>
                <p>
                  The test applied throughout was recognisability. A viewer who knows Warli should
                  still identify the figures instantly; a viewer who knows Kalamkari should still
                  recognise the pen line, the dye palette and the border discipline. Nothing was
                  diluted into a generic decorative style — the two vocabularies stay legible while
                  describing a single scene.
                </p>
                <p>
                  What the comparison taught: minimal and intricate are not opposites of quality but
                  different answers to the same question — how much must be drawn before a story is
                  understood.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="reveal-item border border-ink">
                <p className="border-b border-border px-6 py-4 label-caps">
                  Traditional source → interpretation → new synthesis
                </p>
                <ul className="divide-y divide-border">
                  {borrowed.map((b) => (
                    <li key={b.source} className="px-6 py-5 text-sm leading-relaxed">
                      <p>{b.source}</p>
                      <p className="mt-2 text-muted-foreground">↓ {b.interpretation}</p>
                      <p className="mt-2 text-terracotta">↓ {b.synthesis}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="references" className="bg-beige/60">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
          <Reveal>
            <p className="label-caps reveal-item text-muted-foreground">
              09 — References &amp; art-historical context
            </p>
            <h2 className="reveal-item mt-4 text-4xl sm:text-5xl">Sources</h2>
          </Reveal>

          <Reveal className="mt-10 border-t border-border">
            <ul className="reveal-item divide-y divide-border">
              {references.map(([title, body, url]) => (
                <li key={title} className="grid gap-2 py-6 lg:grid-cols-[1fr_1.2fr_auto]">
                  <p>{title}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="label-caps underline underline-offset-4 hover:no-underline"
                  >
                    Visit source
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <p className="mt-10 max-w-3xl border border-ink p-6 text-sm leading-relaxed">
            <span className="label-caps">Attribution notice</span>
            <span className="mt-3 block text-ink-soft">
              Every drawing in this exhibition — the motifs, diagrams and the final composition
              &quot;Rhythm of the Earth&quot; — is original vector work authored for this
              assignment and labelled ORIGINAL SYNTHESIS. Institutional collections listed above
              were consulted as art-historical reference only; no external image is displayed or
              claimed as original work. Where an external image is introduced later, it must be
              labelled REFERENCE IMAGE with its collection credit.
            </span>
          </p>

          <p className="mt-16 border-t border-border pt-6 label-caps text-muted-foreground">
            Regional Art Style Fusion — Warli × Kalamkari — Rhythm of the Earth
          </p>
        </div>
      </section>
    </>
  );
}
