import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";
import { BrandMark, Wordmark } from "./brand-mark";

const links = [
  { to: "/app", key: "app" as const },
  { to: "/live", key: "live" as const },
];

export function Header() {
  const { t, lang, setLang } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <header className="sticky top-0 z-40 bg-accent text-accent-fg">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <BrandMark className="size-10 text-fg" />
          <Wordmark onMagenta />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-sm px-2.5 py-2 text-sm font-medium transition-colors duration-150",
                pathname === l.to ? "text-fg" : "text-accent-fg hover:text-fg",
              )}
            >
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "tr" ? "en" : "tr")}
            className="h-11 min-w-11 rounded-sm bg-fg px-3 text-xs font-semibold tracking-wide text-bg hover:opacity-90"
            aria-label="Language"
          >
            {lang === "tr" ? "EN" : "TR"}
          </button>
          <Button
            asChild
            size="sm"
            className="flash-cta hidden border-0 bg-bg text-fg hover:bg-bg hover:text-fg sm:inline-flex"
          >
            <Link to="/quote">{t.nav.quote}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-accent-fg lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-accent-fg/20 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium",
                  pathname === l.to ? "text-fg" : "text-accent-fg",
                )}
              >
                {t.nav[l.key]}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="flash-cta rounded-md bg-bg px-3 py-3 text-center text-sm font-medium text-fg"
            >
              {t.nav.quote}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

