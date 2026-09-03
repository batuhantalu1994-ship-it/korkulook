import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const { t } = useT();
  const p = t.products;
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-center text-xs font-medium tracking-wide text-subtle">
        {p.disclaimer}
      </p>
      <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted">{p.kicker}</p>
      <h1 className="mt-4 max-w-2xl text-4xl">{p.title}</h1>

      <figure className="mt-12 overflow-hidden rounded-xl border border-border bg-bg">
        <img
          src="/oem/look-12.jpg"
          alt="Look 12"
          className="mx-auto w-full max-w-4xl object-contain"
        />
      </figure>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="bg-bg px-6 py-4">
            <img src="/oem/look-8.jpg" alt="Look 8" className="mx-auto max-h-[520px] w-auto object-contain" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl">{p.look8.t}</h2>
            <p className="mt-3 text-sm text-muted">{p.look8.d}</p>
          </div>
        </article>
        <article className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="bg-bg px-6 py-4">
            <img src="/oem/look-12.jpg" alt="Look 12" className="w-full object-contain" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl">{p.look12.t}</h2>
            <p className="mt-3 text-sm text-muted">{p.look12.d}</p>
          </div>
        </article>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {[p.app, p.panel].map((item) => (
          <article
            key={item.t}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h2 className="text-2xl">{item.t}</h2>
            <p className="mt-3 text-sm text-muted">{item.d}</p>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-border p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.core.kicker}
        </p>
        <h2 className="mt-3 text-3xl">{t.core.title}</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[t.core.a, t.core.b, t.core.c, t.core.d].map((line) => (
            <li key={line} className="text-sm text-muted">
              {line}
            </li>
          ))}
        </ul>
      </section>
      <Button asChild className="mt-10">
        <Link to="/quote">{t.hero.cta}</Link>
      </Button>
    </main>
  );
}
