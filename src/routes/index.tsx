import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AdSlot } from "@/components/wc/ad-slot";
import { CitySearch } from "@/components/wc/city-search";
import { DstPanel } from "@/components/wc/dst-panel";
import { HeroClock } from "@/components/wc/hero-clock";
import { PopularCities } from "@/components/wc/popular-cities";
import { PageSection as Section, SiteLayout } from "@/components/wc/site-layout";
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

function Index() {
  const [tz, setTz] = useState("UTC");
  const [selected, setSelected] = useState<City | null>(null);

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const activeTz = selected?.tz ?? tz;

  return (
    <SiteLayout>
      <>
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
      </>
    </SiteLayout>
  );
}
