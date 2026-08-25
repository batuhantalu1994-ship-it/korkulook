import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/how")({ component: HowPage });

function HowPage() {
  const { t } = useT();
  const blocks = [t.how.visitor, t.how.resident, t.how.admin];
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        {t.how.kicker}
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl">{t.how.title}</h1>
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {blocks.map((b, i) => (
          <li key={b.t} className="rounded-xl border border-border bg-surface p-6">
            <p className="font-mono text-xs text-subtle">0{i + 1}</p>
            <h2 className="mt-3 text-2xl">{b.t}</h2>
            <p className="mt-3 text-sm text-muted">{b.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/live">{t.live.cta}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/quote">{t.hero.cta}</Link>
        </Button>
      </div>
    </main>
  );
}
