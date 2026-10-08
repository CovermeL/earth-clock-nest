import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CITIES, formatOffset, tzOffsetMinutes } from "@/lib/timezones";

function dateISOInZone(timeZone: string, date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function TimeConverter() {
  const [fromTz, setFromTz] = useState("Europe/London");
  const [toTz, setToTz] = useState("Asia/Tokyo");
  const [time, setTime] = useState("09:00");
  const [date, setDate] = useState(() => dateISOInZone("Europe/London"));
  const [followsToday, setFollowsToday] = useState(true);

  useEffect(() => {
    if (!followsToday) return;

    const updateDate = () => {
      const today = dateISOInZone(fromTz);
      setDate((currentDate) => (currentDate === today ? currentDate : today));
    };

    updateDate();
    const interval = window.setInterval(updateDate, 30_000);
    return () => window.clearInterval(interval);
  }, [fromTz, followsToday]);

  const result = useMemo(() => {
    if (!date) return null;
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    if ([y, mo, d, h, mi].some((n) => Number.isNaN(n))) return null;
    const guess = Date.UTC(y!, mo! - 1, d!, h!, mi!);
    // resolve wall-clock time in the source zone to a real instant
    let instant = guess - tzOffsetMinutes(fromTz, new Date(guess)) * 60000;
    instant = guess - tzOffsetMinutes(fromTz, new Date(instant)) * 60000;
    const target = new Date(instant);
    return {
      time: new Intl.DateTimeFormat("en-GB", {
        timeZone: toTz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(target),
      date: new Intl.DateTimeFormat("en-US", {
        timeZone: toTz,
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(target),
      diff: (tzOffsetMinutes(toTz, target) - tzOffsetMinutes(fromTz, target)) / 60,
    };
  }, [fromTz, toTz, time, date]);

  return (
    <div className="card-soft grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto_1fr] md:items-end">
      <div className="space-y-3">
        <Field label="From" id="conv-from">
          <ZoneSelect id="conv-from" value={fromTz} onChange={setFromTz} />
        </Field>
        <Field label="Date" id="conv-date">
          <div className="space-y-2">
            <input
              id="conv-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setFollowsToday(false);
              }}
              className="tnum h-12 w-full rounded-[calc(var(--radius)-6px)] border border-hairline bg-surface px-4 text-base outline-none transition-colors focus:border-ring"
            />
            <button
              type="button"
              onClick={() => {
                setDate(dateISOInZone(fromTz));
                setFollowsToday(true);
              }}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Today
            </button>
          </div>
        </Field>
        <Field label="Time" id="conv-time">
          <input
            id="conv-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="tnum h-12 w-full rounded-[calc(var(--radius)-6px)] border border-hairline bg-surface px-4 text-base outline-none transition-colors focus:border-ring"
          />
        </Field>
      </div>

      <div className="flex justify-center pb-2 text-muted-foreground" aria-hidden="true">
        <ArrowRight className="size-5 rotate-90 md:rotate-0" />
      </div>

      <div className="space-y-3">
        <Field label="To" id="conv-to">
          <ZoneSelect id="conv-to" value={toTz} onChange={setToTz} />
        </Field>
        <div
          className="rounded-[calc(var(--radius)-6px)] bg-surface px-4 py-3"
          aria-live="polite"
        >
          <p className="tnum text-3xl font-semibold tracking-[-0.03em]">{result?.time ?? "--:--"}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {result?.date}
            {result ? ` · ${result.diff >= 0 ? "+" : ""}${result.diff}h difference` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function ZoneSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full appearance-none rounded-[calc(var(--radius)-6px)] border border-hairline bg-surface px-4 text-base outline-none transition-colors focus:border-ring"
    >
      {CITIES.map((c) => (
        <option key={c.tz + c.name} value={c.tz}>
          {c.name}, {c.country} ({formatOffset(tzOffsetMinutes(c.tz))})
        </option>
      ))}
    </select>
  );
}
