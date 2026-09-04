import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/use-t";
import { BrandMark, Wordmark } from "./brand-mark";

export function Footer() {
  const { t } = useT();
  const f = t.footer;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <BrandMark className="size-9 rounded-md bg-accent p-1 text-fg" />
          <div>
            <Wordmark className="bg-accent px-2.5 py-2" />
            <p className="text-sm text-muted">{t.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link to="/app" className="hover:text-accent">
            {t.nav.app}
          </Link>
          <Link to="/products" className="hover:text-accent">
            {t.nav.products}
          </Link>
          <Link to="/how" className="hover:text-accent">
            {t.nav.how}
          </Link>
          <Link to="/industries" className="hover:text-accent">
            {t.nav.industries}
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-4 py-12 text-center sm:px-6">
        <div className="mx-auto max-w-3xl font-display tracking-wide text-accent transition-colors duration-300 hover:text-transparent">
          <p className="text-2xl font-semibold uppercase sm:text-3xl">
            {f.years}
          </p>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] sm:text-base">
            <span>{f.reserved}</span>
            {" · "}
            <Link to="/privacy" className="underline-offset-4 hover:underline">
              {f.legal}
            </Link>
            {" · "}
            <Link to="/privacy" className="underline-offset-4 hover:underline">
              {f.privacy}
            </Link>
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] sm:text-sm">
            {f.owner}
          </p>
        </div>
      </div>
    </footer>
  );
}
