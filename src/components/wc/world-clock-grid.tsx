import { useNow } from "@/hooks/use-now";
import {
  type City,
  dstInfo,
  formatOffset,
  shortDateInZone,
  timeInZone,
  tzOffsetMinutes,
} from "@/lib/timezones";

function isDaytime(tz: string, date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }).format(date),
  );
  return hour >= 6 && hour < 18;
}

export function WorldClockGrid({ cities }: { cities: City[] }) {
  const now = useNow();

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cities.map((c) => {
        const day = now ? isDaytime(c.tz, now) : true;
        const dst = now ? dstInfo(c.tz, now) : null;
        return (
          <li
            key={c.tz + c.name}
            className="card-soft group px-5 py-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.country}</p>
              </div>
              <span
                className={`mt-0.5 size-2 shrink-0 rounded-full ${day ? "bg-sun" : "bg-moon"}`}
                title={day ? "Daytime" : "Night"}
                aria-label={day ? "Daytime" : "Night"}
              />
            </div>
            <p className="tnum mt-4 text-3xl font-semibold tracking-[-0.03em]">
              {now ? timeInZone(c.tz, now, false) : "--:--"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {now ? shortDateInZone(c.tz, now) : "\u00a0"}
              {" · "}
              {now ? formatOffset(tzOffsetMinutes(c.tz, now)) : ""}
              {dst?.isDst ? " · DST" : ""}
            </p>
          </li>
        );
      })}
    </ul>
  );
}