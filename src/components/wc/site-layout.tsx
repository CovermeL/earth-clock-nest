import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/world-clocks", label: "World Clocks" },
  { to: "/converter", label: "Converter" },
  { to: "/daylight-saving", label: "Daylight Saving" },
  { to: "/sunrise-sunset", label: "Sun Times" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-hairline/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-[-0.02em]">
            <Globe className="size-5 text-muted-foreground" aria-hidden="true" />
            World Clock
          </Link>
          <nav
            aria-label="Main"
            className="-mx-1 flex gap-5 overflow-x-auto px-1 text-sm text-muted-foreground"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-foreground font-medium" }}
                className="whitespace-nowrap transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24">{children}</main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>World Clock — live local times and time zone tools.</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="animate-rise pt-14 sm:pt-20">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function PageSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      {eyebrow && (
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
          {eyebrow}
        </p>
      )}
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}