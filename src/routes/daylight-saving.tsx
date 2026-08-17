import { createFileRoute } from "@tanstack/react-router";

import { AdSlot } from "@/components/wc/ad-slot";
import { DstPanel } from "@/components/wc/dst-panel";
import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";
import { WorldClockGrid } from "@/components/wc/world-clock-grid";
import { CITIES } from "@/lib/timezones";

const TITLE = "Daylight Saving Time — Dates, Rules & Current Status";
const DESCRIPTION =
  "How daylight saving time works, which regions observe it, when clocks change and which major cities are on summer time right now.";

export const Route = createFileRoute("/daylight-saving")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DstPage,
});

function DstPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Daylight saving" title="Daylight saving time, explained" description={DESCRIPTION} />

      <div className="mt-10">
        <AdSlot label="Sponsored placement" format="leaderboard" />
      </div>

      <div className="mt-14 space-y-16">
        <PageSection id="status" title="Who is on summer time right now" description="Live daylight saving status for major regions, checked against the IANA time zone database.">
          <DstPanel />
        </PageSection>

        <AdSlot label="Sponsored placement" format="inline" />

        <PageSection id="affected" title="Cities affected today" description="Current local times where a daylight saving offset may apply.">
          <WorldClockGrid cities={CITIES.slice(0, 8)} />
        </PageSection>

        <AdSlot label="Sponsored placement" format="footer" />
      </div>
    </SiteLayout>
  );
}