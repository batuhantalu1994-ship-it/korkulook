import { useEffect } from "react";
import { BrandMark, CrowGlyph, Wordmark } from "@/components/site/brand-mark";
import { playCaw } from "@/lib/caw";
import { useT } from "@/lib/use-t";

export function SplashOpen({ onDone }: { onDone: () => void }) {
  const { t } = useT();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const caw = window.setTimeout(() => playCaw(), 420);
    const end = window.setTimeout(onDone, 2800);
    return () => {
      window.clearTimeout(caw);
      window.clearTimeout(end);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-accent text-accent-fg">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="splash-wind absolute h-px bg-fg/40"
            style={{
              top: `${18 + i * 10}%`,
              width: `${40 + (i % 3) * 18}%`,
              animationDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative size-44">
        <BrandMark hideCrow className="size-44 text-fg" />
        <div className="splash-crow absolute left-[26%] top-[10%] w-[5.5rem]">
          <CrowGlyph className="splash-flap w-full" />
        </div>
      </div>

      <Wordmark className="splash-mark mt-6 text-2xl tracking-[0.28em]" />
      <p className="splash-mark mt-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-fg/80">
        {t.tagline}
      </p>

      <button
        type="button"
        onClick={onDone}
        className="absolute bottom-8 h-11 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-fg"
      >
        {t.splash.skip}
      </button>
    </div>
  );
}
