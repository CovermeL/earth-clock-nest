import { createFileRoute } from "@tanstack/react-router";

import { AdSlot } from "@/components/wc/ad-slot";
import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";
import { TimeConverter } from "@/components/wc/time-converter";
import { PopularCities } from "@/components/wc/popular-cities";

const TITLE = "Time Zone Converter — Compare Times Between Cities";
const DESCRIPTION =
  "Convert a time from one city to another instantly. See the matching local time, the hour difference and daylight saving adjustments.";

export const Route = createFileRoute("/converter")({
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
  component: ConverterPage,
});

function ConverterPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Time zone converter" title="Convert time between cities" description={DESCRIPTION} />

      <div className="mt-10">
        <AdSlot label="Sponsored placement" format="leaderboard" />
      </div>

      <div className="mt-14 space-y-16">
        <PageSection id="convert" title="Pick two cities" description="Choose a source city and time to see the matching local time elsewhere.">
          <TimeConverter />
        </PageSection>

        <AdSlot label="Sponsored placement" format="inline" />

        <PageSection id="popular" title="Frequently converted zones">
          <PopularCities />
        </PageSection>
      </div>
    </SiteLayout>
  );
}