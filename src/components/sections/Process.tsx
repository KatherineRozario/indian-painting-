import { useEffect, useState } from "react";
import { Reveal } from "../Reveal";
import { Artwork } from "../art/Artwork";
import {
  MotifDanceCircle,
  MotifDeity,
  MotifFloralBorder,
  MotifLotus,
  MotifVine,
  MotifWarliFigure,
  MotifWarliSun,
  MotifWarliTree,
} from "../art/motifs";

const stages = [
  {
    n: "01",
    name: "Research",
    text: "Two traditions were studied separately: Warli as a ritual wall practice built from three shapes, Kalamkari as a dyed narrative textile built from filled space. Notes recorded line quality, palette, subject and framing for each.",
  },
  {
    n: "02",
    name: "Motifs",
    text: "Fourteen motifs were isolated and redrawn by hand — seven Warli, seven Kalamkari — each reduced to the smallest drawing that still carries the tradition's logic.",
  },
  {
    n: "03",
    name: "Composition",
    text: "The Warli dance circle was chosen as the structural centre and flattened into an ellipse, so the Kalamkari border grammar could frame it as a hanging cloth.",
  },
  {
    n: "04",
    name: "Synthesis",
    text: "Hybrids were built where the systems touch: triangular trunks with pen-drawn canopies, a lotus whose core is sixteen Warli triangles, a sun whose rays are petals.",
  },
  {
    n: "05",
    name: "Final artwork",
    text: "Layers were assembled — ground texture, border, vines, figures, connective lines — and the composition resolved as one field rather than two styles side by side.",
  },
] as const;

const stageMotifs = [
  [MotifWarliFigure, MotifDeity],
  [MotifWarliTree, MotifLotus],
  [MotifDanceCircle, MotifFloralBorder],
  [MotifWarliSun, MotifVine],
  [MotifDanceCircle, MotifLotus],
] as const;

export function Process() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setStep((s) => (s + 1) % stages.length), 4200);
    return () => clearInterval(t);
  }, [auto]);

  const stage = stages[step]!;
  const pair = stageMotifs[step]!;
  const layer = step <= 1 ? "warli" : step === 2 ? "kalamkari" : step === 3 ? "shared" : "full";

  return (
    <section id="process" className="border-b border-border bg-beige/60">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <Reveal>
          <p className="label-caps reveal-item text-muted-foreground">05 — Build the synthesis</p>
          <h2 className="reveal-item mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Research → motifs → composition → fusion
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px bg-border md:grid-cols-5">
          {stages.map((s, i) => (
            <li key={s.n}>
              <button
                onClick={() => {
                  setAuto(false);
                  setStep(i);
                }}
                aria-pressed={step === i}
                className={`w-full px-5 py-5 text-left transition-colors ${
                  step === i ? "bg-ink text-primary-foreground" : "bg-canvas hover:bg-beige"
                }`}
              >
                <span className="label-caps opacity-70">{s.n}</span>
                <span className="mt-2 block text-lg">{s.name}</span>
                <span className="mt-3 block h-px w-full bg-current opacity-20" />
                <span
                  className="mt-[-1px] block h-px bg-current"
                  style={{
                    width: step === i ? "100%" : "0%",
                    transition: step === i ? "width 4s linear" : "width 300ms ease",
                  }}
                />
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-px grid gap-px bg-border lg:grid-cols-[1fr_1.4fr]">
          <div className="bg-canvas p-8 lg:p-10">
            <div key={stage.n} style={{ animation: "fade-rise 0.7s ease both" }}>
              <p className="label-caps text-muted-foreground">Stage {stage.n}</p>
              <h3 className="mt-3 text-3xl">{stage.name}</h3>
              <p className="mt-6 max-w-prose leading-relaxed text-ink-soft">{stage.text}</p>
              <div className="mt-8 flex gap-3">
                {pair.map((M, i) => (
                  <div key={i} className="w-24 border border-border bg-card p-2">
                    <M
                      className={`h-20 w-full ${i ? "text-terracotta" : "text-ink"}`}
                      title={`Stage ${stage.n} reference motif`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAuto((a) => !a)}
                className="mt-10 border border-ink px-5 py-3 label-caps transition-colors hover:bg-beige"
              >
                {auto ? "Pause sequence" : "Play sequence"}
              </button>
            </div>
          </div>

          <figure className="bg-canvas p-3">
            <div
              key={`art-${step}`}
              style={{
                animation:
                  step === 4
                    ? "wipe-reveal 1.6s cubic-bezier(0.2,0.7,0.2,1) both"
                    : "soft-in 0.9s ease both",
              }}
            >
              <Artwork layer={layer as never} drawOnMount={step === 4} className="w-full" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
