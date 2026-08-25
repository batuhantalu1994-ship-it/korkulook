import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  companyRows,
  launchTotals,
  siteRows,
  stackRows,
  type CostRow,
} from "@/lib/settlement";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/cost")({ component: CostPage });

function CostPage() {
  const { t, lang } = useT();
  const c = t.cost;
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {c.kicker}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl">{c.title}</h1>
      <p className="mt-5 max-w-2xl text-muted">{c.lead}</p>

      <Totals />

      <Table title={c.company} rows={companyRows} />
      <Table title={c.stack} rows={stackRows} />
      <Table title={c.site} rows={siteRows} />

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/quote">{t.hero.cta}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/operate">{t.nav.operate}</Link>
        </Button>
      </div>
    </main>
  );
}

function Totals() {
  const { t, lang } = useT();
  const rows = launchTotals[lang];
  return (
    <section className="mt-12 border border-accent bg-accent text-accent-fg">
      <h2 className="border-b border-accent-fg/20 px-5 py-4 text-xl">
        {t.cost.totals}
      </h2>
      <ul>
        {rows.map((r) => (
          <li
            key={r.k}
            className="flex flex-col gap-1 border-b border-accent-fg/15 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="text-sm">{r.k}</span>
            <span className="font-display text-lg font-extrabold tabular-nums">
              {r.v}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Table({ title, rows }: { title: string; rows: CostRow[] }) {
  const { t, lang } = useT();
  const c = t.cost;
  return (
    <section className="mt-12">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-accent text-xs uppercase tracking-wider text-accent">
              <th className="py-3 pr-4 font-medium">{c.colItem}</th>
              <th className="py-3 pr-4 font-medium">{c.colNeed}</th>
              <th className="py-3 pr-4 font-medium">{c.colAmount}</th>
              <th className="py-3 font-medium">{c.colWhen}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item.en} className="border-b border-border">
                <td className="py-3 pr-4 font-medium">{row.item[lang]}</td>
                <td className="py-3 pr-4 text-muted">{row.need[lang]}</td>
                <td className="py-3 pr-4 font-mono text-xs tabular-nums">
                  {row.amount}
                </td>
                <td className="py-3 text-muted">{row.cadence[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
