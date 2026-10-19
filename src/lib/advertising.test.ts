import { describe, expect, test } from "bun:test";
import { FOUNDING_PACKAGES, getActiveSponsor, isSafeSponsorUrl, type SponsorCampaign } from "./advertising";

const campaign: SponsorCampaign = {
  id: "test-only",
  placement: "home-leaderboard",
  advertiser: "Test sponsor",
  message: "Test message",
  destinationUrl: "https://example.com/sponsor",
  startDate: "2026-10-19",
  endDate: "2026-11-17",
};

describe("Founding Sponsor packages", () => {
  for (const [name, price] of [
    ["Standard Placement", 250],
    ["Premium Homepage Placement", 500],
    ["Section Sponsorship", 500],
    ["Multi-Page Sponsorship", 1000],
    ["Exclusive Earthclock Sponsor", 1500],
  ] as const) {
    test(`${name} costs CA$${price} for 30 days`, () => {
      const item = FOUNDING_PACKAGES.find((entry) => entry.name === name);
      expect(item?.priceCad).toBe(price);
      expect(item?.days).toBe(30);
    });
  }
});

test("campaign starts at UTC midnight and includes the entire end date", () => {
  for (const [time, active] of [
    ["2026-10-18T23:59:59.999Z", false],
    ["2026-10-19T00:00:00.000Z", true],
    ["2026-11-17T23:59:59.999Z", true],
    ["2026-11-18T00:00:00.000Z", false],
  ] as const) {
    expect(Boolean(getActiveSponsor("home-leaderboard", new Date(time), [campaign]))).toBe(active);
  }
});

test("different placements can show different sponsors without a global fallback", () => {
  const second: SponsorCampaign = { ...campaign, id: "second", placement: "converter-inline", advertiser: "Second sponsor" };
  const now = new Date("2026-10-20T12:00:00Z");
  expect(getActiveSponsor("home-leaderboard", now, [campaign, second])?.advertiser).toBe("Test sponsor");
  expect(getActiveSponsor("converter-inline", now, [campaign, second])?.advertiser).toBe("Second sponsor");
  expect(getActiveSponsor("home-footer", now, [campaign, second])).toBeUndefined();
});

test("empty configurations, invalid dates and unsafe destinations have no active sponsor", () => {
  const now = new Date("2026-10-20T12:00:00Z");
  expect(getActiveSponsor("home-leaderboard", now, [])).toBeUndefined();
  for (const invalid of [
    { startDate: "2026-02-30" },
    { endDate: "2026-10-18" },
    { destinationUrl: "javascript:alert(1)" },
    { advertiser: " " },
  ]) {
    expect(getActiveSponsor("home-leaderboard", now, [{ ...campaign, ...invalid }])).toBeUndefined();
  }
  expect(isSafeSponsorUrl("https://example.com")).toBe(true);
  expect(isSafeSponsorUrl("https://user:password@example.com")).toBe(false);
});