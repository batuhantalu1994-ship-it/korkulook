import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { SplashOpen } from "@/components/app/splash-open";
import { ResidentPanel } from "@/components/demo/resident-panel";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/app")({ component: ResidentApp });

function ResidentApp() {
  const { t } = useT();
  const [open, setOpen] = useState(true);
  const done = useCallback(() => setOpen(false), []);

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      {open ? <SplashOpen onDone={done} /> : null}
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
        {t.nav.app}
      </p>
      <h1 className="mb-4 text-3xl">{t.appPage.title}</h1>
      <ResidentPanel />
      <button
        type="button"
        className="mt-4 h-11 w-full text-xs uppercase tracking-[0.18em] text-muted hover:text-fg"
        onClick={() => setOpen(true)}
      >
        {t.splash.replay}
      </button>
    </main>
  );
}
