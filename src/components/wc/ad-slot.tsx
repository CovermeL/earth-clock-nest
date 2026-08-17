type AdSlotProps = {
  label: string;
  format?: "leaderboard" | "inline" | "footer";
};

const heights: Record<NonNullable<AdSlotProps["format"]>, string> = {
  leaderboard: "min-h-[96px] sm:min-h-[110px]",
  inline: "min-h-[140px] sm:min-h-[120px]",
  footer: "min-h-[110px]",
};

export function AdSlot({ label, format = "inline" }: AdSlotProps) {
  return (
    <aside
      aria-label="Advertisement"
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-[var(--radius)] border border-dashed border-hairline bg-surface px-6 py-6 text-center ${heights[format]}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
        Advertisement
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </aside>
  );
}