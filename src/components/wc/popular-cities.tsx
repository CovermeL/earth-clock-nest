import { CITIES, formatOffset, timeInZone, tzOffsetMinutes } from "@/lib/timezones";
import { useNow } from "@/hooks/use-now";

export function PopularCities() {
  const now = useNow(30000);

  return (
    <ul className="flex flex-wrap gap-2.5">
      {CITIES.map((c) => (
        <li key={c.name}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-card px-4 py-2.5 text-sm transition-colors hover:bg-accent">
            <span className="font-medium">{c.name}</span>
            <span className="tnum text-muted-foreground">
              {now ? timeInZone(c.tz, now, false) : "--:--"}
            </span>
            <span className="text-xs text-muted-foreground/70">
              {now ? formatOffset(tzOffsetMinutes(c.tz, now)) : ""}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}