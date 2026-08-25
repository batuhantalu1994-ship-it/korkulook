import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const { t } = useT();
  const p = t.products;
  const items = [p.look8, p.look12, p.app, p.panel];
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{p.kicker}</p>
      <h1 className="mt-4 max-w-2xl text-4xl">{p.title}</h1>
      <p className="mt-5 max-w-2xl text-muted">{t.core.body}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
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
