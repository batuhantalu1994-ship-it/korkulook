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
  const [pane, setPane] = useState<Pane>("phone");
  const tabs: { id: Pane; label: string }[] = [
    { id: "kiosk", label: t.demo.kiosk },
    { id: "phone", label: t.demo.phone },
    { id: "admin", label: t.demo.admin },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.live.kicker}
        </p>
        <h1 className="mt-3 text-3xl">{t.live.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.demo.liveHint}</p>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPane(tab.id)}
            className={cn(
              "h-11 rounded-md text-sm font-medium transition-colors",
              pane === tab.id
                ? "bg-accent text-accent-fg"
                : "text-muted hover:text-fg",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {pane === "kiosk" ? <KioskPanel /> : null}
      {pane === "phone" ? <ResidentPanel /> : null}
      {pane === "admin" ? <AdminPanel /> : null}
    </main>
  );
}
