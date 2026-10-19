import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import {
  FOUNDING_PACKAGES,
  getActiveSponsor,
  isSafeSponsorUrl,
  type SponsorCampaign,
} from "./advertising";

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
      assert.equal(item?.priceCad, price);
      assert.equal(item?.days, 30);
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
    assert.equal(Boolean(getActiveSponsor("home-leaderboard", new Date(time), [campaign])), active);
  }
});

test("different placements can show different sponsors without a global fallback", () => {
  const second: SponsorCampaign = {
    ...campaign,
    id: "second",
    placement: "converter-inline",
    advertiser: "Second sponsor",
  };
  const now = new Date("2026-10-20T12:00:00Z");
  assert.equal(
    getActiveSponsor("home-leaderboard", now, [campaign, second])?.advertiser,
    "Test sponsor",
  );
  assert.equal(
    getActiveSponsor("converter-inline", now, [campaign, second])?.advertiser,
    "Second sponsor",
  );
  assert.equal(getActiveSponsor("home-footer", now, [campaign, second]), undefined);
});

test("empty configurations, invalid dates and unsafe destinations have no active sponsor", () => {
  const now = new Date("2026-10-20T12:00:00Z");
  assert.equal(getActiveSponsor("home-leaderboard", now, []), undefined);
  for (const invalid of [
    { startDate: "2026-02-30" },
    { endDate: "2026-10-18" },
    { destinationUrl: "javascript:alert(1)" },
    { advertiser: " " },
  ]) {
    assert.equal(
      getActiveSponsor("home-leaderboard", now, [{ ...campaign, ...invalid }]),
      undefined,
    );
  }
  assert.equal(isSafeSponsorUrl("https://example.com"), true);
  assert.equal(isSafeSponsorUrl("https://user:password@example.com"), false);
});
