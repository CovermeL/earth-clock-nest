import { createFileRoute } from "@tanstack/react-router";

import { AdSlot } from "@/components/wc/ad-slot";
import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";
import { SunTimes } from "@/components/wc/sun-times";
import { CITIES } from "@/lib/timezones";

const TITLE = "Sunrise & Sunset Times — Daylight Hours by City";
const DESCRIPTION =
  "Today's sunrise, sunset and total daylight hours for cities around the world, calculated from each location's latitude and longitude.";

export const Route = createFileRoute("/sunrise-sunset")({
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
  component: SunPage,
});

function SunPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Sunrise & sunset" title="Daylight around the world" description={DESCRIPTION} />

      <div className="mt-10">
        <AdSlot label="Sponsored placement" format="leaderboard" />
      </div>

      <div className="mt-14 space-y-16">
        <PageSection id="today" title="Today's daylight" description="Sunrise, sunset and daylight length for major cities.">
          <SunTimes cities={CITIES.slice(0, 8)} />
        </PageSection>

        <AdSlot label="Sponsored placement" format="inline" />

        <PageSection id="more" title="More cities" description="Daylight for additional locations across other regions.">
          <SunTimes cities={CITIES.slice(8, 16)} />
        </PageSection>

        <AdSlot label="Sponsored placement" format="footer" />
      </div>
    </SiteLayout>
  );
}