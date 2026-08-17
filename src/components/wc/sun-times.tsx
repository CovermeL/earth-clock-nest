import { Sunrise, Sunset } from "lucide-react";
import { useNow } from "@/hooks/use-now";
import { type City, sunTimes } from "@/lib/timezones";

function fmt(d: Date | null, tz: string) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

function dayLength(sunrise: Date | null, sunset: Date | null) {
  if (!sunrise || !sunset) return "—";
  let ms = sunset.getTime() - sunrise.getTime();
  if (ms < 0) ms += 86400000;
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export function SunTimes({ cities }: { cities: City[] }) {
  const now = useNow(60000);

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((c) => {
        const { sunrise, sunset } = now
          ? sunTimes(c.lat, c.lon, now)
          : { sunrise: null, sunset: null };
        return (
          <li key={c.name} className="card-soft p-5">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.country}</p>
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <Sunrise className="size-4.5 text-sun" aria-hidden="true" />
                <span className="tnum text-lg font-medium">{fmt(sunrise, c.tz)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sunset className="size-4.5 text-moon" aria-hidden="true" />
                <span className="tnum text-lg font-medium">{fmt(sunset, c.tz)}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Daylight {dayLength(sunrise, sunset)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}