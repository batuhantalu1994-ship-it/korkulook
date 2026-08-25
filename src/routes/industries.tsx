import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Fence, HardHat, Landmark, Store, Users, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
});

function IndustriesPage() {
  const { t } = useT();
  const a = t.audiences;
  const items = [
    { icon: Landmark, ...a.site },
    { icon: Users, ...a.owners },
    { icon: Building2, ...a.builder },
    { icon: HardHat, ...a.sitework },
    { icon: Fence, ...a.farm },
    { icon: Warehouse, ...a.depot },
    { icon: Store, ...a.mall },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        {t.industriesPage.kicker}
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl">{t.industriesPage.title}</h1>
      <p className="mt-5 max-w-2xl text-muted">{t.industriesPage.lead}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.t}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <item.icon className="size-5 text-muted" />
            <h2 className="mt-4 text-2xl">{item.t}</h2>
            <p className="mt-3 text-sm text-muted">{item.d}</p>
          </article>
        ))}
      </div>
      <Button asChild className="mt-10">
        <Link to="/quote">{t.hero.cta}</Link>
      </Button>
    </main>
  );
}
