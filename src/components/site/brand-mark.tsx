import { cn } from "@/lib/utils";

export function CrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      fill="none"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      <path
        className="fill-crow-tail"
        d="M7.2 3.2 C10.6 0.6 17 2.4 17.2 7.2 C14 8.4 10 7.2 7.6 4.6 Z"
      />
      <path
        className="fill-crow-tail"
        d="M9 4 C12.2 2.8 15.4 4.4 15.6 6.6 C13.2 6.8 10.4 5.6 9 4 Z"
      />
      <path className="fill-crow" d="M0.2 3.2 L4.4 2.1 L4.6 4.6 Z" />
      <circle className="fill-crow" cx="5.4" cy="3.1" r="2.55" />
      <circle className="fill-fg" cx="4.65" cy="2.55" r="0.7" />
      <circle className="fill-fg" cx="6.35" cy="2.45" r="0.55" />
    </svg>
  );
}

export function BrandMark({
  className,
  hideCrow = false,
}: {
  className?: string;
  hideCrow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.2 15.2 L16.2 10.2 L22.2 15.2 Z" />
        <path d="M7.6 15.2 H24.8" />
        <circle cx="16.2" cy="19" r="2.7" />
        <path d="M15.1 18.3 L17.3 19.7" />
        <path d="M17.3 18.3 L15.1 19.7" />
        <path d="M16.2 21.7 V24" />
        <path d="M7.4 22.8 L16.2 23.5 L24.8 22.8" />
        <path d="M16.2 24 L11.2 30" />
        <path d="M16.2 24 L21.2 30" />
      </g>
      {hideCrow ? null : (
        <g transform="translate(8.2,4)">
          <path
            className="fill-crow-tail"
            d="M7.2 3.2 C10.6 0.6 17 2.4 17.2 7.2 C14 8.4 10 7.2 7.6 4.6 Z"
          />
          <path
            className="fill-crow-tail"
            d="M9 4 C12.2 2.8 15.4 4.4 15.6 6.6 C13.2 6.8 10.4 5.6 9 4 Z"
          />
          <path className="fill-crow" d="M0.2 3.2 L4.4 2.1 L4.6 4.6 Z" />
          <circle className="fill-crow" cx="5.4" cy="3.1" r="2.55" />
          <circle className="fill-fg" cx="4.65" cy="2.55" r="0.7" />
          <circle className="fill-fg" cx="6.35" cy="2.45" r="0.55" />
        </g>
      )}
    </svg>
  );
}

export function Wordmark({
  className,
  onMagenta = true,
}: {
  className?: string;
  onMagenta?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col font-mark text-[0.95rem] font-semibold uppercase leading-[0.95] tracking-[0.22em]",
        className,
      )}
    >
      <span className={onMagenta ? "text-accent-fg" : "text-fg"}>KORKU</span>
      <span className="text-fg">LOOK</span>
    </span>
  );
}
