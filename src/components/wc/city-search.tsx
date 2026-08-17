import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CITIES, type City, formatOffset, timeInZone, tzOffsetMinutes } from "@/lib/timezones";
import { useNow } from "@/hooks/use-now";

export function CitySearch({ onSelect }: { onSelect: (city: City) => void }) {
  const [q, setQ] = useState("");
  const now = useNow(30000);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.country.toLowerCase().includes(term) ||
        c.tz.toLowerCase().includes(term),
    ).slice(0, 6);
  }, [q]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <label htmlFor="city-search" className="sr-only">
        Search for a city or country
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="city-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search a city or country — e.g. Tokyo, Brazil"
        autoComplete="off"
        className="h-14 w-full rounded-full border border-hairline bg-card pl-13 pr-5 text-base text-foreground shadow-[var(--shadow-card)] outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:shadow-[var(--shadow-float)]"
      />

      {results.length > 0 && (
        <ul
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-[var(--radius)] border border-hairline bg-card p-1.5 shadow-[var(--shadow-float)]"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((c) => (
            <li key={c.tz + c.name}>
              <button
                type="button"
                onClick={() => {
                  onSelect(c);
                  setQ("");
                }}
                className="flex w-full items-center justify-between rounded-[calc(var(--radius)-8px)] px-4 py-3 text-left transition-colors hover:bg-accent"
              >
                <span>
                  <span className="block text-sm font-medium">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.country}</span>
                </span>
                <span className="tnum text-right text-sm text-muted-foreground">
                  {now ? timeInZone(c.tz, now, false) : "--:--"}
                  <span className="ml-2 text-xs">
                    {now ? formatOffset(tzOffsetMinutes(c.tz, now)) : ""}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}