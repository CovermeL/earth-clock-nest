import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";
import { FOUNDING_PACKAGES } from "@/lib/advertising";
import { subPageSeo } from "@/lib/seo";

const TITLE = "Advertise with Earthclock.fyi — Founding Sponsor Opportunities";
const DESCRIPTION =
  "Explore introductory 30-day Founding Sponsor placements on Earthclock.fyi, a global time utility for local times and time zone tools.";

export const Route = createFileRoute("/advertise")({
  head: () => {
    const seo = subPageSeo("/advertise", "Advertise with Earthclock.fyi", DESCRIPTION);
    return {
      meta: [
        ...seo.meta,
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:site_name", content: "Earthclock.fyi" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: seo.links,
      scripts: seo.scripts,
    };
  },
  component: AdvertisePage,
});

function AdvertisePage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Founding Sponsor program"
        title="Advertise with Earthclock.fyi"
        description="Put your business alongside a global time utility. Our introductory 30-day sponsorships offer clearly labeled placements within the existing site."
      />

      <div className="mt-12 space-y-14">
        <PageSection id="opportunity" title="A natural fit for a connected world">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi brings together world clocks, time zone conversion, daylight saving
              information, and sunrise and sunset times.
            </p>
            <p>
              Sponsorship may be relevant to businesses serving international travelers, remote
              teams and international businesses, including travel services, logistics, financial
              and currency services, language services, and other related audiences.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="packages"
          title="Introductory 30-day packages"
          description="Special Founding Sponsor rates in Canadian dollars. These are introductory offers, not permanent prices or guaranteed renewal rates."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {FOUNDING_PACKAGES.map((item) => (
              <article
                key={item.name}
                className="min-w-0 rounded-lg border border-hairline bg-surface p-6"
              >
                <h3 className="break-words text-lg font-semibold">{item.name}</h3>
                <p className="mt-4 text-2xl font-semibold tnum">
                  CA${item.priceCad.toLocaleString("en-CA")}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    / {item.days} days
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Placements and campaign dates are agreed before a sponsorship begins, subject to
            availability. No specific number of impressions, clicks, visitors, conversions, or
            advertising results is promised.
          </p>
        </PageSection>

        <PageSection id="sponsorship" title="A considered presence">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Your placement can feature your company name, logo or image, a short sponsor message,
              and a link to your website. Paid placements are clearly identified as advertising and
              remain separate from the time tools.
            </p>
            <p>
              Each sponsorship runs on agreed start and end dates. Renewal rates and availability
              are confirmed separately.
            </p>
          </div>
        </PageSection>

        <PageSection id="contact" title="Sponsorship enquiries">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            To discuss a Founding Sponsor placement, availability, or campaign dates, please email{" "}
            <a
              href="mailto:advertise@earthclock.fyi"
              className="font-medium text-foreground underline underline-offset-4"
            >
              advertise@earthclock.fyi
            </a>
            .
          </p>
        </PageSection>
      </div>
    </SiteLayout>
  );
}
