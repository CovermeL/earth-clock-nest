import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AdSlot } from "@/components/wc/ad-slot";
import { CitySearch } from "@/components/wc/city-search";
import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";
import { WorldClockGrid } from "@/components/wc/world-clock-grid";
import { CITIES, type City } from "@/lib/timezones";

const TITLE = "World Clocks — Live Local Times in Major Cities";
const DESCRIPTION =
  "Live local times for major cities worldwide, with UTC offsets and daylight saving applied automatically. Search any city to see its current time.";

export const Route = createFileRoute("/world-clocks")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorldClocksPage,
});

function WorldClocksPage() {
  const [selected, setSelected] = useState<City | null>(null);
  const cities = selected
    ? [selected, ...CITIES.filter((c) => c.tz !== selected.tz)]
    : CITIES;

  return (
    <SiteLayout>
      <PageHeader eyebrow="World clocks" title="Live times around the world" description={DESCRIPTION} />

      <div className="mt-10">
        <AdSlot label="Sponsored placement" format="leaderboard" />
      </div>

      <div className="mt-14 space-y-16">
        <PageSection id="search" title="Find a city" description="Search by city or country to bring it to the top of the grid.">
          <CitySearch onSelect={setSelected} />
        </PageSection>

        <PageSection id="grid" title="Major cities" description="Times update every second and follow each region's daylight saving rules.">
          <WorldClockGrid cities={cities} />
        </PageSection>

        <AdSlot label="Sponsored placement" format="inline" />

        <PageSection id="regions" title="Times by region" description="A quick look at the busiest business hubs on each continent.">
          <WorldClockGrid cities={CITIES.slice(12)} />
        </PageSection>

        <AdSlot label="Sponsored placement" format="footer" />
      </div>
    </SiteLayout>
  );
}