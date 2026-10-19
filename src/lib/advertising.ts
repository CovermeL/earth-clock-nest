export const AD_PLACEMENTS = [
  "home-leaderboard",
  "home-inline",
  "home-footer",
  "world-clocks-leaderboard",
  "world-clocks-inline",
  "world-clocks-footer",
  "converter-leaderboard",
  "converter-inline",
  "daylight-saving-leaderboard",
  "daylight-saving-inline",
  "daylight-saving-footer",
  "sunrise-sunset-leaderboard",
  "sunrise-sunset-inline",
  "sunrise-sunset-footer",
] as const;

export type AdPlacement = (typeof AD_PLACEMENTS)[number];

export type SponsorCampaign = {
  id: string;
  placement: AdPlacement;
  advertiser: string;
  imageUrl?: string;
  imageAlt?: string;
  message: string;
  destinationUrl: string;
  /** Inclusive calendar dates, YYYY-MM-DD, in UTC. */
  startDate: string;
  endDate: string;
};

/** Assign each paid placement explicitly. Leave empty until a sponsor is approved.
 * For multiple placements, add one entry per placement with a unique id.
 * Overlapping campaigns: the first valid active entry for that placement wins.
 * Use project asset URLs for images; only HTTPS destinations are accepted.
 */
export const SPONSOR_CAMPAIGNS: readonly SponsorCampaign[] = [];

export const FOUNDING_PACKAGES = [
  {
    name: "Standard Placement",
    priceCad: 250,
    days: 30,
    description: "One standard advertising position on an agreed page.",
  },
  {
    name: "Premium Homepage Placement",
    priceCad: 500,
    days: 30,
    description: "The prominent advertising position on the homepage.",
  },
  {
    name: "Section Sponsorship",
    priceCad: 500,
    days: 30,
    description: "An agreed sponsorship placement alongside one of our time tools.",
  },
  {
    name: "Multi-Page Sponsorship",
    priceCad: 1000,
    days: 30,
    description: "A coordinated presence across an agreed selection of pages.",
  },
  {
    name: "Exclusive Earthclock Sponsor",
    priceCad: 1500,
    days: 30,
    description: "Exclusive direct sponsorship across the site's existing advertising positions.",
  },
] as const;

export function isSafeSponsorUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

function utcDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) return null;
  return time;
}

export function getActiveSponsor(
  placement: AdPlacement,
  now: Date,
  campaigns: readonly SponsorCampaign[] = SPONSOR_CAMPAIGNS,
): SponsorCampaign | undefined {
  const time = now.getTime();
  return campaigns.find((campaign) => {
    const start = utcDate(campaign.startDate);
    const end = utcDate(campaign.endDate);
    return (
      campaign.placement === placement &&
      campaign.advertiser.trim().length > 0 &&
      campaign.message.trim().length > 0 &&
      isSafeSponsorUrl(campaign.destinationUrl) &&
      start !== null &&
      end !== null &&
      end >= start &&
      time >= start &&
      time < end + 86_400_000
    );
  });
}
