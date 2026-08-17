export type City = {
  name: string;
  country: string;
  tz: string;
  lat: number;
  lon: number;
};

export const CITIES: City[] = [
  { name: "London", country: "United Kingdom", tz: "Europe/London", lat: 51.5074, lon: -0.1278 },
  { name: "New York", country: "United States", tz: "America/New_York", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", country: "United States", tz: "America/Los_Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", country: "United States", tz: "America/Chicago", lat: 41.8781, lon: -87.6298 },
  { name: "Toronto", country: "Canada", tz: "America/Toronto", lat: 43.6532, lon: -79.3832 },
  { name: "São Paulo", country: "Brazil", tz: "America/Sao_Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Mexico City", country: "Mexico", tz: "America/Mexico_City", lat: 19.4326, lon: -99.1332 },
  { name: "Paris", country: "France", tz: "Europe/Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", country: "Germany", tz: "Europe/Berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", country: "Spain", tz: "Europe/Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Amsterdam", country: "Netherlands", tz: "Europe/Amsterdam", lat: 52.3676, lon: 4.9041 },
  { name: "Moscow", country: "Russia", tz: "Europe/Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "Istanbul", country: "Türkiye", tz: "Europe/Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Dubai", country: "United Arab Emirates", tz: "Asia/Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Mumbai", country: "India", tz: "Asia/Kolkata", lat: 19.076, lon: 72.8777 },
  { name: "Singapore", country: "Singapore", tz: "Asia/Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Hong Kong", country: "China", tz: "Asia/Hong_Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Shanghai", country: "China", tz: "Asia/Shanghai", lat: 31.2304, lon: 121.4737 },
  { name: "Tokyo", country: "Japan", tz: "Asia/Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", country: "South Korea", tz: "Asia/Seoul", lat: 37.5665, lon: 126.978 },
  { name: "Sydney", country: "Australia", tz: "Australia/Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Auckland", country: "New Zealand", tz: "Pacific/Auckland", lat: -36.8485, lon: 174.7633 },
  { name: "Johannesburg", country: "South Africa", tz: "Africa/Johannesburg", lat: -26.2041, lon: 28.0473 },
  { name: "Cairo", country: "Egypt", tz: "Africa/Cairo", lat: 30.0444, lon: 31.2357 },
];

export function tzOffsetMinutes(tz: string, date = new Date()): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return Math.round((asUTC - date.getTime()) / 60000);
}

export function formatOffset(minutes: number): string {
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const h = String(Math.floor(abs / 60)).padStart(2, "0");
  const m = String(abs % 60).padStart(2, "0");
  return `UTC${sign}${h}:${m}`;
}

export function tzAbbreviation(tz: string, date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "short",
  }).formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

/** DST is active when the current offset exceeds the minimum offset across the year. */
export function dstInfo(tz: string, date = new Date()) {
  const year = date.getUTCFullYear();
  let min = Infinity;
  let max = -Infinity;
  for (let m = 0; m < 12; m++) {
    const off = tzOffsetMinutes(tz, new Date(Date.UTC(year, m, 15, 12)));
    min = Math.min(min, off);
    max = Math.max(max, off);
  }
  const current = tzOffsetMinutes(tz, date);
  return {
    observesDst: max !== min,
    isDst: max !== min && current === max,
    standardOffset: min,
    currentOffset: current,
  };
}

export function timeInZone(tz: string, date: Date, withSeconds = true) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" as const } : {}),
    hour12: false,
  }).format(date);
}

export function dateInZone(tz: string, date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function shortDateInZone(tz: string, date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

/** Approximate sunrise/sunset (NOAA algorithm), returned as UTC Date objects. */
export function sunTimes(lat: number, lon: number, date = new Date()) {
  const rad = Math.PI / 180;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86400000);

  const calc = (isSunrise: boolean): Date | null => {
    const zenith = 90.833 * rad;
    const lngHour = lon / 15;
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = (L + 360) % 360;
    let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad;
    RA = (RA + 360) % 360;
    RA += (Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90);
    RA /= 15;
    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(zenith) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null;
    let H = isSunrise ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad;
    H /= 15;
    const T = H + RA - 0.06571 * t - 6.622;
    const UT = ((T - lngHour) % 24 + 24) % 24;
    const ms = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) + UT * 3600000;
    return new Date(ms);
  };

  return { sunrise: calc(true), sunset: calc(false) };
}