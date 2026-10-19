import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getActiveSponsor, isSafeSponsorUrl, type AdPlacement } from "@/lib/advertising";

type AdSlotProps = {
  placement: AdPlacement;
  label: string;
  format?: "leaderboard" | "inline" | "footer";
};

const heights: Record<NonNullable<AdSlotProps["format"]>, string> = {
  leaderboard: "min-h-[96px] sm:min-h-[110px]",
  inline: "min-h-[140px] sm:min-h-[120px]",
  footer: "min-h-[110px]",
};

export function AdSlot({ placement, label, format = "inline" }: AdSlotProps) {
  const [now, setNow] = useState<Date | null>(null);
  const [failedImage, setFailedImage] = useState<string | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const sponsor = now ? getActiveSponsor(placement, now) : undefined;
  const image = sponsor?.imageUrl;
  const showImage = image && isSafeSponsorUrl(image) && image !== failedImage;

  return (
    <aside
      aria-label="Advertisement"
      data-placement={placement}
      className={`flex w-full min-w-0 flex-col items-center justify-center gap-1 rounded-[var(--radius)] border border-hairline bg-surface px-6 py-6 text-center ${sponsor ? "" : "border-dashed"} ${heights[format]}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
        Advertisement
      </span>
      {sponsor ? (
        <a
          href={sponsor.destinationUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`${sponsor.advertiser}: ${sponsor.message} (opens in a new tab)`}
          className="mt-2 flex w-full min-w-0 max-w-2xl flex-col items-center gap-3 rounded-sm text-foreground transition-opacity hover:opacity-80 sm:flex-row sm:justify-center sm:text-left"
        >
          {showImage && (
            <img
              src={image}
              alt={sponsor.imageAlt || sponsor.advertiser}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFailedImage(image)}
              className="h-16 w-28 shrink-0 object-contain"
            />
          )}
          <span className="min-w-0 break-words">
            <span className="block text-sm font-semibold">{sponsor.advertiser}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{sponsor.message}</span>
          </span>
        </a>
      ) : (
        <>
          <span className="text-sm text-muted-foreground">{label}</span>
          <Link to="/advertise" className="mt-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Founding Sponsor opportunities
          </Link>
        </>
      )}
    </aside>
  );
}