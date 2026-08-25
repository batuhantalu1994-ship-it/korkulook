import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { operateFeatures, type FeatStatus } from "@/lib/operate-features";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/operate")({ component: OperatePage });

function OperatePage() {
  const { t, lang } = useT();
  const o = t.operate;
  const counts = {
    have: operateFeatures.filter((f) => f.status === "have").length,
    need: operateFeatures.filter((f) => f.status === "need").length,
    later: operateFeatures.filter((f) => f.status === "later").length,
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {o.kicker}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl">{o.title}</h1>
      <p className="mt-5 max-w-2xl text-muted">{o.lead}</p>

      <div className="mt-8 grid grid-cols-3 gap-px bg-border">
        <Stat n={counts.have} l={o.have} tone="have" />
        <Stat n={counts.need} l={o.need} tone="need" />
        <Stat n={counts.later} l={o.later} tone="later" />
      </div>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {operateFeatures.map((f) => (
          <li
            key={f.name.en}
            className="grid gap-3 py-5 md:grid-cols-[7rem_1fr_6rem] md:items-start"
          >
            <p className="text-xs uppercase tracking-wider text-subtle">
              {f.area[lang]}
            </p>
            <div>
              <p className="font-medium">{f.name[lang]}</p>
              <p className="mt-1 text-sm text-muted">{f.why[lang]}</p>
            </div>
            <Badge status={f.status} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/live">{t.live.cta}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/cost">{t.nav.cost}</Link>
        </Button>
      </div>
    </main>
  );
}

function Stat({
  n,
  l,
  tone,
}: {
  n: number;
  l: string;
  tone: FeatStatus;
}) {
  return (
    <div
      className={cn(
        "bg-bg px-4 py-5",
        tone === "need" && "bg-accent text-accent-fg",
      )}
    >
      <p className="font-display text-3xl font-extrabold tabular-nums">{n}</p>
      <p className="text-xs uppercase tracking-wider">{l}</p>
    </div>
  );
}

function Badge({ status }: { status: FeatStatus }) {
  const { t } = useT();
  const label =
    status === "have" ? t.operate.have : status === "need" ? t.operate.need : t.operate.later;
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-sm px-2 text-xs font-semibold uppercase tracking-wide",
        status === "need" && "bg-accent text-accent-fg",
        status === "have" && "bg-fg text-bg",
        status === "later" && "border border-border-strong text-muted",
      )}
    >
      {label}
    </span>
  );
}
