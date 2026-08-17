import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

import { AdSlot } from "@/components/wc/ad-slot";
import { CitySearch } from "@/components/wc/city-search";
import { DstPanel } from "@/components/wc/dst-panel";
import { HeroClock } from "@/components/wc/hero-clock";
import { PopularCities } from "@/components/wc/popular-cities";
import { SunTimes } from "@/components/wc/sun-times";
import { TimeConverter } from "@/components/wc/time-converter";
import { WorldClockGrid } from "@/components/wc/world-clock-grid";
import { CITIES, type City } from "@/lib/timezones";

const TITLE = "World Clock — Live Local Times, Time Zones & UTC Offsets";
const DESCRIPTION =
  "See the live local time anywhere in the world. Current time zones, UTC offsets, daylight saving status, a time zone converter and sunrise & sunset times for major cities.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "World Clock",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
  component: Index,
});

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Index() {
  const [tz, setTz] = useState("UTC");
  const [selected, setSelected] = useState<City | null>(null);

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const activeTz = selected?.tz ?? tz;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-hairline/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2 font-semibold tracking-[-0.02em]">
            <Globe className="size-5 text-muted-foreground" aria-hidden="true" />
            World Clock
          </a>
          <nav aria-label="Sections" className="hidden gap-7 text-sm text-muted-foreground sm:flex">
            <a href="#clocks" className="transition-colors hover:text-foreground">Clocks</a>
            <a href="#converter" className="transition-colors hover:text-foreground">Converter</a>
            <a href="#dst" className="transition-colors hover:text-foreground">DST</a>
            <a href="#sun" className="transition-colors hover:text-foreground">Sun times</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24">
        <section
          aria-label="Current local time"
          className="rounded-[calc(var(--radius)+12px)] px-4 py-16 sm:py-24"
          style={{ backgroundImage: "var(--gradient-veil)" }}
        >
          <HeroClock tz={activeTz} />
          <div className="mt-12">
            <CitySearch onSelect={setSelected} />
            {selected && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Showing {selected.name}, {selected.country}.{" "}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Reset to my local time
                </button>
              </p>
            )}
          </div>
        </section>

        <div className="mt-14">
          <AdSlot label="Sponsored placement" format="leaderboard" />
        </div>

        <div className="mt-20 space-y-20">
          <Section
            id="clocks"
            eyebrow="World clocks"
            title="Major cities, live"
            description="Local times across the world's business hubs, updating every second with daylight saving applied automatically."
          >
            <WorldClockGrid cities={CITIES.slice(0, 12)} />
          </Section>

          <Section
            id="converter"
            eyebrow="Time zone converter"
            title="Convert a time between two cities"
            description="Pick a source city and time to see the matching local time elsewhere, including the hour difference."
          >
            <TimeConverter />
          </Section>

          <AdSlot label="Sponsored placement" format="inline" />

          <Section
            id="dst"
            eyebrow="Daylight saving"
            title="Daylight saving time, explained"
            description="Where clocks shift, when they shift, and which cities are on summer time right now."
          >
            <DstPanel />
          </Section>

          <Section
            id="sun"
            eyebrow="Sunrise & sunset"
            title="Daylight around the world"
            description="Today's sunrise, sunset and total daylight for a selection of cities."
          >
            <SunTimes cities={CITIES.slice(0, 6)} />
          </Section>

          <Section
            id="popular"
            eyebrow="Popular cities"
            title="Frequently checked time zones"
          >
            <PopularCities />
          </Section>

          <AdSlot label="Sponsored placement" format="footer" />
        </div>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>World Clock — live local times and time zone tools.</p>
          <p>Times use the IANA time zone database via your browser.</p>
        </div>
      </footer>
    </div>
  );
}
