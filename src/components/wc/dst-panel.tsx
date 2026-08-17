import { CITIES, dstInfo, formatOffset } from "@/lib/timezones";
import { useNow } from "@/hooks/use-now";

const WATCHED = ["Europe/London", "America/New_York", "Australia/Sydney", "Asia/Tokyo", "Asia/Kolkata", "America/Sao_Paulo"];

export function DstPanel() {
  const now = useNow(60000);
  const rows = WATCHED.map((tz) => CITIES.find((c) => c.tz === tz)!).filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="card-soft p-6 sm:p-8">
        <h3 className="text-base font-semibold">How daylight saving time works</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Daylight saving time (DST) shifts local clocks forward by one hour during warmer months so
          evenings hold more daylight. Not every country takes part, and start and end dates differ
          by region — which is why a fixed UTC offset alone is never enough to tell the time
          somewhere else.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Northern hemisphere</dt>
            <dd className="mt-1 font-medium">March → October / November</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Southern hemisphere</dt>
            <dd className="mt-1 font-medium">September / October → April</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Typical shift</dt>
            <dd className="mt-1 font-medium">+1 hour</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Countries observing</dt>
            <dd className="mt-1 font-medium">Around 70 worldwide</dd>
          </div>
        </dl>
      </div>

      <div className="card-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Current daylight saving status by city</caption>
          <thead>
            <tr className="border-b border-hairline text-xs text-muted-foreground">
              <th scope="col" className="px-5 py-3 font-medium">City</th>
              <th scope="col" className="px-5 py-3 font-medium">Offset</th>
              <th scope="col" className="px-5 py-3 font-medium">DST status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const info = now ? dstInfo(c.tz, now) : null;
              return (
                <tr key={c.tz} className="border-b border-hairline last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-medium">{c.name}</th>
                  <td className="tnum px-5 py-3.5 text-muted-foreground">
                    {info ? formatOffset(info.currentOffset) : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted-foreground">
                      {info
                        ? info.observesDst
                          ? info.isDst
                            ? "In effect"
                            : "Standard time"
                          : "Not observed"
                        : "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}