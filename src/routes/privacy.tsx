import { createFileRoute } from "@tanstack/react-router";
import { subPageSeo } from "@/lib/seo";

import { PageHeader, PageSection, SiteLayout } from "@/components/wc/site-layout";

const TITLE = "Privacy Policy — Earthclock.fyi";
const DESCRIPTION =
  "How Earthclock.fyi handles cookies, analytics, advertising, and your personal information when you use our time zone tools.";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const seo = subPageSeo("/privacy", "Privacy Policy", DESCRIPTION, "Article");
    return {
      meta: [
        ...seo.meta,
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: seo.links,
      scripts: seo.scripts,
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const lastUpdated = "October 20, 2026";

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={DESCRIPTION}
      />

      <div className="mt-10">
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="mt-12 space-y-12">
        <PageSection id="intro" title="Overview">
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi ("we", "us", or "our") operates a free, informational
              website that displays live local times, time zone tools, and related
              utilities. We are committed to protecting your privacy. This Privacy
              Policy explains what information we collect, how we use it, and the
              choices you have.
            </p>
            <p>
              By using this website, you agree to the practices described in this
              policy.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="cookies"
          title="Cookies"
          description="Cookies and browser storage currently used by Earthclock.fyi."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi currently does not set cookies. It does not currently
              store visitor preferences in localStorage, sessionStorage, IndexedDB,
              or similar persistent browser storage. A city you select is not saved
              between visits or page refreshes. Your local time and time zone are
              determined from your browser each time you visit and are not stored by
              Earthclock.fyi.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="analytics"
          title="Analytics"
          description="Client-side visitor analytics and hosting infrastructure."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi currently does not use Google Analytics or another
              client-side visitor analytics or tracking service. Cloudflare provides
              website hosting and delivery infrastructure and may process technical
              information, such as IP addresses and request information, to operate
              and secure that service. This infrastructure processing is not an
              analytics product installed by Earthclock.fyi.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="advertising"
          title="Advertising and sponsorship"
          description="Current direct sponsor placements and related privacy practices."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi currently offers direct sponsor placements rather than
              advertising through Google AdSense or another third-party advertising
              network. Sponsor placements are clearly identified as advertising.
              Earthclock.fyi currently does not use advertising cookies, personalized
              advertising, tracking pixels, or third-party ad-network scripts. A
              sponsor link may take you to the advertiser's website, where the
              advertiser's privacy policy and practices apply. These statements
              describe current practices, which may change.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="third-party"
          title="Third-party services"
          description="External providers used to host, deliver, or support the site."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The website uses Cloudflare for hosting and delivery infrastructure. It
              also uses Google Fonts, so your browser may connect to Google's servers
              to retrieve font files. These providers may process information as
              described in their own privacy policies.
            </p>
            <p>
              We do not control how third-party services handle the data they
              collect. Please review their privacy policies for details.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="personal-information"
          title="Personal information"
          description="What we collect, and what we do not."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              You do not need an account or login to use Earthclock.fyi. The time
              tools do not require you to submit identifying personal information.
              Information you enter into search, time, or date fields is handled by
              browser-based functionality and is not submitted through a visitor
              account. Earthclock.fyi does not currently provide a general contact
              form. If you voluntarily email advertise@earthclock.fyi, your email
              address, message, and information you choose to include will be
              received to handle and reply to that advertising or sponsorship
              enquiry. Visiting the site alone does not send your email information
              to an advertiser.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="security"
          title="Data security"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              We take reasonable measures to protect the information used to operate
              this site. However, no method of transmission over the internet or
              electronic storage is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="children"
          title="Children's privacy"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi is an informational time zone tool and is not directed to
              children under 13. We do not knowingly collect personal information from
              children. If you believe a child has provided us with personal
              information, please contact us so it can be removed.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="external-links"
          title="External links"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This site may link to external websites that we do not control. We are
              not responsible for the privacy practices or content of those sites.
              Please review the privacy policy of any website you visit.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="changes"
          title="Changes to this policy"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated "Last updated" date. Continued use
              of the site after changes indicates your acceptance of the revised
              policy.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="contact"
          title="Contact"
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              For privacy questions related to advertising or sponsorship enquiries,
              email{" "}
              <a
                href="mailto:advertise@earthclock.fyi"
                className="text-foreground underline underline-offset-4"
              >
                advertise@earthclock.fyi
              </a>
              . Earthclock.fyi does not currently provide a separate general contact
              form.
            </p>
          </div>
        </PageSection>
      </div>
    </SiteLayout>
  );
}
