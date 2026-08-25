import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminPanel } from "@/components/demo/admin-panel";
import { KioskPanel } from "@/components/demo/kiosk-panel";
import { ResidentPanel } from "@/components/demo/resident-panel";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/live")({ component: LivePage });

type Pane = "kiosk" | "phone" | "admin";

function LivePage() {
  const { t } = useT();
  const [pane, setPane] = useState<Pane>("kiosk");
  const tabs: { id: Pane; label: string }[] = [
    { id: "kiosk", label: t.demo.kiosk },
    { id: "phone", label: t.demo.phone },
    { id: "admin", label: t.demo.admin },
  ];

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="mb-6 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.live.kicker}
        </p>
        <h1 className="mt-3 text-3xl">{t.live.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.demo.liveHint}</p>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1 lg:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPane(tab.id)}
            className={cn(
              "h-11 rounded-md text-sm",
              pane === tab.id ? "bg-bg text-fg" : "text-muted",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className={cn(pane === "kiosk" ? "block" : "hidden", "lg:block")}>
          <p className="mb-2 hidden text-xs uppercase tracking-wider text-muted lg:block">
            {t.demo.kiosk}
          </p>
          <KioskPanel />
        </div>
        <div className={cn(pane === "phone" ? "block" : "hidden", "lg:block")}>
          <p className="mb-2 hidden text-xs uppercase tracking-wider text-muted lg:block">
            {t.demo.phone}
          </p>
          <ResidentPanel />
        </div>
        <div className={cn(pane === "admin" ? "block" : "hidden", "lg:block")}>
          <p className="mb-2 hidden text-xs uppercase tracking-wider text-muted lg:block">
            {t.demo.admin}
          </p>
          <AdminPanel />
        </div>
      </div>
    </main>
  );
}
