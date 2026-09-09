import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Traditions } from "@/components/sections/Traditions";
import { Compare } from "@/components/sections/Compare";
import { MotifExplorer } from "@/components/sections/MotifExplorer";
import { Process } from "@/components/sections/Process";
import { FinalArtwork, InteractiveArtwork } from "@/components/sections/InteractiveArtwork";
import { Reflection } from "@/components/sections/Reflection";

const title = "Rhythm of the Earth — A Synthesis of Warli & Kalamkari";
const description =
  "An interactive digital exhibition fusing Warli geometry and Kalamkari botanical narrative into one original artwork, with layered comparison, motif explorer and process reveal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Opening", "#opening"],
  ["Traditions", "#traditions"],
  ["Compare", "#compare"],
  ["Motifs", "#motifs"],
  ["Process", "#process"],
  ["Artwork", "#artwork"],
  ["Final", "#final"],
  ["Reflection", "#reflection"],
  ["References", "#references"],
] as const;

function Index() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-ink bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#opening" className="label-caps font-semibold">
              Rhythm of the Earth
            </a>
            <span className="hidden sm:inline-block text-[11px] border-l border-ink/30 pl-3 text-muted-foreground font-mono">
              Katherine Tanisha Rozario · RA2411030010206 · Z1
            </span>
          </div>
          <nav aria-label="Exhibition sections">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {nav.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="label-caps text-muted-foreground transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Traditions />
        <Compare />
        <MotifExplorer />
        <Process />
        <InteractiveArtwork />
        <FinalArtwork />
        <Reflection />
      </main>
    </div>
  );
}
