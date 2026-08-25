import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/use-t";
import { BrandMark, Wordmark } from "./brand-mark";

export function Footer() {
  const { t } = useT();
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
    </footer>
  );
}
