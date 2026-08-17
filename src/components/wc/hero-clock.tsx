import { useNow } from "@/hooks/use-now";
import { dstInfo, dateInZone, formatOffset, timeInZone, tzAbbreviation, tzOffsetMinutes } from "@/lib/timezones";

export function HeroClock({ tz }: { tz: string }) {
  const now = useNow();
  const time = now ? timeInZone(tz, now) : "--:--:--";
  const [h, m, s] = time.split(":");
  const offset = now ? formatOffset(tzOffsetMinutes(tz, now)) : "UTC+00:00";
  const dst = now ? dstInfo(tz, now) : null;

  return (
    <div className="animate-[var(--animate-rise)] text-center">
      <p className="text-sm font-medium text-muted-foreground">
        {now ? dateInZone(tz, now) : "\u00a0"}
      </p>

      <h1 className="sr-only">World Clock — current local time, time zones and UTC offsets</h1>

      <div
        className="tnum mt-4 flex items-end justify-center gap-1 font-semibold leading-none tracking-[-0.04em]"
        aria-hidden="true"
      >
        <span className="text-[clamp(3.5rem,17vw,9rem)]">{h}</span>
        <span className="text-[clamp(3rem,14vw,7.5rem)] text-muted-foreground/40">:</span>
        <span className="text-[clamp(3.5rem,17vw,9rem)]">{m}</span>
        <span
          key={s}
          className="animate-[var(--animate-tick)] mb-[clamp(0.5rem,2vw,1.5rem)] text-[clamp(1.5rem,6vw,3rem)] text-muted-foreground"
        >
          {s}
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {now ? `Local time ${h}:${m} in ${tz.replace("_", " ")}` : "Loading time"}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Pill>
          <span className="inline-block size-1.5 rounded-full bg-live" aria-hidden="true" /> Live
        </Pill>
        <Pill>{tz.replace(/_/g, " ")}</Pill>
        <Pill>{offset}</Pill>
        {now && tzAbbreviation(tz, now) !== tz && <Pill>{tzAbbreviation(tz, now)}</Pill>}
        <Pill>
          {dst
            ? dst.observesDst
              ? dst.isDst
                ? "Daylight saving time in effect"
                : "Standard time"
              : "No daylight saving"
            : "—"}
        </Pill>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}