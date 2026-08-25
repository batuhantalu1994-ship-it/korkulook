import { useEffect, useMemo, useState } from "react";
import { Phone, Hash, QrCode, Search, Video } from "lucide-react";
import { useKorku } from "@/lib/store";
import { doorName } from "@/lib/doors";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function KioskPanel({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useT();
  const d = t.demo;
  const tab = useKorku((s) => s.kioskTab);
  const query = useKorku((s) => s.kioskQuery);
  const residents = useKorku((s) => s.residents);
  const call = useKorku((s) => s.call);
  const flash = useKorku((s) => s.kioskFlash);
  const doorOpen = useKorku((s) => s.doorOpen);
  const lastDoor = useKorku((s) => s.lastDoor);
  const setTab = useKorku((s) => s.setKioskTab);
  const setQuery = useKorku((s) => s.setKioskQuery);
  const startCall = useKorku((s) => s.startCall);
  const hangup = useKorku((s) => s.hangup);
  const tryPin = useKorku((s) => s.tryPin);
  const tryPass = useKorku((s) => s.tryPass);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return residents.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q),
    );
  }, [residents, query]);

  const called = residents.find((r) => r.id === call?.residentId);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border-2 border-accent bg-bg",
        compact ? "min-h-[420px]" : "min-h-[560px]",
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-live" />
          <span className="text-xs font-medium tracking-wide text-muted">
            LOOK 8 · SENINKENT
          </span>
        </div>
        <KioskClock />
      </div>

      {flash ? (
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center",
                flash.kind === "ok" ? "bg-accent text-accent-fg" : "bg-fg text-bg",
          )}
        >
          <p className="font-display text-3xl">
            {lang === "tr" ? flash.textTr : flash.textEn}
          </p>
          {doorOpen ? <p className="text-sm text-live">{d.doorOpen}</p> : null}
        </div>
      ) : call ? (
        <div className="flex flex-1 flex-col">
          <VisitorStage />
          <div className="space-y-3 p-4">
            <p className="text-xs uppercase tracking-wider text-muted">
              {call.status === "ringing" ? d.calling : d.connected}
            </p>
            <p className="font-display text-2xl">{called?.name}</p>
            <p className="text-sm text-muted">{called?.unit}</p>
            <Button variant="outline" className="w-full" onClick={hangup}>
              {d.hangup}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 border-b border-border">
            {(
              [
                ["directory", Search, d.directory],
                ["pin", Hash, d.pin],
                ["qr", QrCode, d.qr],
              ] as const
            ).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex h-12 items-center justify-center gap-1.5 text-xs font-medium",
                  tab === id
                    ? "bg-elevated text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>

          {tab === "directory" ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="p-3">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={d.search}
                />
              </div>
              <ul className="min-h-0 flex-1 overflow-auto px-2 pb-3">
                {filtered.length === 0 ? (
                  <li className="px-2 py-6 text-center text-sm text-muted">
                    {d.noMatch}
                  </li>
                ) : (
                  filtered.map((r) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => startCall(r.id)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left hover:bg-elevated"
                      >
                        <span>
                          <span className="block text-sm font-medium">
                            {r.name}
                          </span>
                          <span className="text-xs text-muted">{r.unit}</span>
                        </span>
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-accent-fg">
                          <Phone className="size-4" />
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : null}

          {tab === "pin" ? <PinPad onSubmit={tryPin} label={d.enterPin} /> : null}
          {tab === "qr" ? <PassPad onSubmit={tryPass} label={d.qr} /> : null}
        </>
      )}

      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-subtle">
        <span className="inline-flex items-center gap-1">
          <Video className="size-3" /> KorkuLook
        </span>
        <span className={doorOpen ? "text-live" : ""}>
          {doorOpen
            ? lastDoor
              ? doorName(lastDoor, lang)
              : d.doorOpen
            : d.doorClosed}
        </span>
      </div>
    </div>
  );
}

function KioskClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xs tabular-nums text-muted">
      {now
        ? now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
        : "--:--"}
    </span>
  );
}

function VisitorStage() {
  return (
    <div className="relative flex h-40 items-end justify-center bg-elevated">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(143,165,138,0.18),transparent_60%)]" />
      <svg viewBox="0 0 120 90" className="relative h-full w-auto text-muted">
        <circle cx="60" cy="32" r="16" fill="currentColor" opacity="0.55" />
        <path
          d="M24 90c4-28 20-42 36-42s32 14 36 42"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}

function PinPad({
  onSubmit,
  label,
}: {
  onSubmit: (code: string) => void;
  label: string;
}) {
  const [code, setCode] = useState("");
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"];
  function press(k: string) {
    if (k === "C") setCode("");
    else if (k === "OK") {
      onSubmit(code);
      setCode("");
    } else if (code.length < 5) setCode(code + k);
  }
  return (
    <div className="flex flex-1 flex-col justify-between p-4">
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-2 font-mono text-2xl tracking-[0.4em] tabular-nums">
          {code.padEnd(5, "·")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className="h-12 rounded-md bg-elevated text-sm font-medium hover:bg-surface"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function PassPad({
  onSubmit,
  label,
}: {
  onSubmit: (code: string) => void;
  label: string;
}) {
  const [code, setCode] = useState("");
  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <p className="text-xs text-muted">{label}</p>
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
        placeholder="•••••"
        inputMode="numeric"
        className="font-mono tracking-[0.3em]"
      />
      <Button
        onClick={() => {
          onSubmit(code);
          setCode("");
        }}
        disabled={code.length < 4}
      >
        OK
      </Button>
      <p className="text-xs leading-relaxed text-subtle">
        QR veya 5 haneli geçiş kodu. Sakin uygulamadan üretilir.
      </p>
    </div>
  );
}
