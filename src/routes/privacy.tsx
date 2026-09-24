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
  const lastUpdated = "September 24, 2026";

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
          description="Small files stored on your device to remember preferences and enable core features."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi uses cookies and similar technologies to operate the
              site. Cookies are small text files placed on your device that allow
              the site to function and to understand how it is used.
            </p>
            <p>
              The local time displayed on the homepage is determined from your
              browser's time zone setting; a cookie or browser storage may remember
              a city you have selected so it can be shown again on a later visit.
            </p>
            <p>
              You can clear or block cookies through your browser settings.
              Disabling cookies may affect some site features, such as remembering a
              selected city.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="analytics"
          title="Analytics"
          description="Aggregated, anonymized measurement of how the site is used."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              We may use Google Analytics or a similar measurement service to
              understand aggregate usage — for example, which pages are visited, how
              long visitors stay, and general geographic regions. This information is
              reported in an aggregated, anonymized form and is not used to identify
              you personally.
            </p>
            <p>
              These services may set their own cookies to collect this data. You can
              opt out of Google Analytics measurement by installing the Google
              Analytics Opt-out Browser Add-on, or by blocking analytics cookies in
              your browser.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="advertising"
          title="Advertising & Google AdSense"
          description="How ads may be shown and what that means for your privacy."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Earthclock.fyi may display advertising provided by Google AdSense.
              Third-party vendors, including Google, use cookies to serve ads based on
              a user's prior visits to this and other websites.
            </p>
            <p>
              Google's use of advertising cookies enables it and its partners to
              serve ads based on your visit to this site and other sites on the
              internet. You may opt out of personalized advertising by visiting Google
              Ads Settings, and you can opt out of third-party vendor cookies through
              the Network Advertising Initiative opt-out page.
            </p>
            <p>
              Third-party vendors and ad networks may also serve ads on this site.
              These vendors may use cookies and similar technologies to measure and
              improve ad performance.
            </p>
          </div>
        </PageSection>

        <PageSection
          id="third-party"
          title="Third-party services"
          description="External providers that help run the site or measure its use."
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This site relies on third-party services that may include Google
              Analytics, Google AdSense, font providers, and the platform that hosts
              and delivers the website. These providers may collect information as
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
              Earthclock.fyi does not require you to create an account, log in, or
              submit personal information to use the time zone tools. The site does
              not knowingly collect names, email addresses, phone numbers, or other
              identifying details from visitors.
            </p>
            <p>
              Information collected automatically — such as IP address, browser
              type, and pages visited — may be processed by the hosting platform,
              analytics, and advertising providers as described in their respective
              policies. We use this only to operate and improve the site.
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
              If you have questions about this Privacy Policy, contact us through the
              website. We will do our best to respond to legitimate inquiries.
            </p>
          </div>
        </PageSection>
      </div>
    </SiteLayout>
  );
}
