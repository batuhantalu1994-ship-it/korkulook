import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Fence,
  HardHat,
  Landmark,
  Store,
  Users,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResidentPanel } from "@/components/demo/resident-panel";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useT();
  const a = t.audiences;
  const p = t.products;
  const s = t.steps;

  const audiences = [
    { icon: Landmark, ...a.site, to: "/industries" },
    { icon: Users, ...a.owners, to: "/industries" },
    { icon: Building2, ...a.builder, to: "/industries" },
    { icon: HardHat, ...a.sitework, to: "/industries" },
    { icon: Fence, ...a.farm, to: "/industries" },
    { icon: Warehouse, ...a.depot, to: "/industries" },
    { icon: Store, ...a.mall, to: "/industries" },
  ];

  const products = [
    p.look8,
    p.look12,
    p.app,
    p.panel,
  ];

  return (
    <main>
      <section className="overflow-hidden border-b border-border bg-elevated">
        <img
          src="/oem/banner.jpg"
          alt="Evinizi geleceğe taşıyın"
          className="max-h-[460px] w-full object-cover object-center lg:max-h-[520px]"
        />
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t.hero.kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-md text-base text-muted">{t.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/quote">{t.hero.cta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/live">{t.hero.secondary}</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-subtle">{t.hero.proof}</p>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted">
            {t.demo.phone}
          </p>
          <ResidentPanel compact />
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {s.kicker}
          </p>
          <h2 className="mt-3 text-3xl">{s.title}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[s.one, s.two, s.three].map((step, i) => (
              <article key={step.t}>
                <p className="font-mono text-xs tabular-nums text-accent">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-2xl">{step.t}</h3>
                <p className="mt-3 text-sm text-muted">{step.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {a.kicker}
          </p>
        <h2 className="mt-3 max-w-xl text-3xl">{a.title}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <Link
              key={item.t}
              to={item.to}
              className="rounded-lg border border-border bg-surface p-5 transition-colors duration-150 hover:border-accent"
            >
              <item.icon className="size-5 text-muted" />
              <h3 className="mt-4 text-xl">{item.t}</h3>
              <p className="mt-2 text-sm text-muted">{item.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {p.kicker}
          </p>
          <h2 className="mt-3 max-w-xl text-3xl">{p.title}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <article
                key={item.t}
                className="rounded-xl border border-border bg-bg p-5"
              >
                <h3 className="text-xl">{item.t}</h3>
                <p className="mt-2 text-sm text-muted">{item.d}</p>
              </article>
            ))}
          </div>
          <Button asChild className="mt-8" variant="outline">
            <Link to="/products">{t.nav.products}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {t.core.kicker}
        </p>
        <h2 className="mt-3 max-w-xl text-3xl">{t.core.title}</h2>
        <p className="mt-5 max-w-2xl text-muted">{t.core.body}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[t.core.a, t.core.b, t.core.c, t.core.d].map((line) => (
            <li
              key={line}
              className="rounded-lg border border-border px-4 py-3 text-sm"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {t.live.kicker}
            </p>
            <h2 className="mt-3 text-3xl">{t.live.title}</h2>
            <p className="mt-4 text-muted">{t.live.body}</p>
          </div>
          <Button asChild size="lg" className="mt-8 lg:mt-0">
            <Link to="/live">{t.live.cta}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
