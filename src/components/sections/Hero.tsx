import { useEffect, useState } from "react";
import { Artwork } from "../art/Artwork";

export function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(4);
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 900),
      setTimeout(() => setStage(2), 2600),
      setTimeout(() => setStage(3), 4200),
      setTimeout(() => setStage(4), 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="opening" className="relative min-h-screen border-b border-border bg-canvas">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:px-12">
        <div className="order-2 lg:order-1">
          <p
            className="label-caps text-muted-foreground"
            style={{ animation: "soft-in 1s ease 0.2s both" }}
          >
            01 — Opening
          </p>

          <h1
            className="mt-6 text-5xl leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl"
            style={{
              animation: "wipe-reveal 1.5s cubic-bezier(0.2,0.7,0.2,1) 4.4s both",
            }}
          >
            Rhythm of the Earth
          </h1>

          <p
            className="mt-6 max-w-md text-lg text-ink-soft"
            style={{ animation: "fade-rise 1.2s ease 5.2s both" }}
          >
            A synthesis of Warli &amp; Kalamkari
          </p>

          <div
            className="mt-8 max-w-md border-t border-border pt-6 text-[0.95rem] leading-relaxed text-ink-soft"
            style={{ animation: "fade-rise 1.2s ease 5.6s both" }}
          >
            An interactive exhibition on two Indian regional painting traditions — the geometric
            wall painting of the Warli of Maharashtra and the pen-drawn botanical narrative of
            Kalamkari from Andhra Pradesh — merged into one original composition.
          </div>

          <div
            className="mt-8 flex flex-wrap gap-3"
            style={{ animation: "fade-rise 1.2s ease 6s both" }}
          >
            <a
              href="#artwork"
              className="border border-ink bg-ink px-6 py-3 label-caps text-primary-foreground transition-opacity hover:opacity-80"
            >
              Enter the exhibition
            </a>
            <a
              href="#traditions"
              className="border border-ink px-6 py-3 label-caps transition-colors hover:bg-beige"
            >
              The two traditions
            </a>
          </div>

          <ol className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
            {[
              "Line drawn across the canvas",
              "Warli figures constructed",
              "Circular dance formed",
              "Kalamkari vines grown",
              "Borders drawn",
              "Composition revealed",
            ].map((t, i) => (
              <li
                key={t}
                className="flex gap-2"
                style={{ opacity: stage * 1.5 > i ? 1 : 0.3, transition: "opacity 700ms ease" }}
              >
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative order-1 border border-ink bg-card p-3 lg:order-2">
          {/* opening line that draws across the empty canvas */}
          <svg
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-3 top-1/2 z-10 h-[2px]"
            aria-hidden="true"
            style={{ opacity: stage >= 2 ? 0 : 1, transition: "opacity 800ms ease" }}
          >
            <path
              d="M 0 1 L 100 1"
              stroke="var(--color-ink)"
              strokeWidth="1"
              className="draw"
              style={{ ["--len" as string]: "100", ["--dur" as string]: "1.4s" }}
            />
          </svg>
          <div style={{ opacity: stage >= 1 ? 1 : 0, transition: "opacity 1.2s ease" }}>
            <Artwork drawOnMount className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
