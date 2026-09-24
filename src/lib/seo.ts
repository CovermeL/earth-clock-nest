export const SITE_URL = "https://earthclock.fyi";
export const SITE_NAME = "Earthclock.fyi";

/** Canonical, og:url and JSON-LD (WebPage + BreadcrumbList) for a sub-page. */
export function subPageSeo(path: string, name: string, description: string, type = "WebPage") {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [{ property: "og:url", content: url }],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": type,
              name,
              description,
              url,
              isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
                { "@type": "ListItem", position: 2, name, item: url },
              ],
            },
          ],
        }),
      },
    ],
  };
}
