import { useEffect, useMemo, useState } from "react";
import { KeyRound, Phone, Hash, QrCode, Search, Users } from "lucide-react";
import { useKorku } from "@/lib/store";
import { doorName } from "@/lib/doors";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandMark } from "@/components/site/brand-mark";

export function KioskPanel({
  compact = false,
  immersive = false,
}: {
  compact?: boolean;
  immersive?: boolean;
}) {
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
  const [idle, setIdle] = useState(!compact);

  useEffect(() => {
    if (compact) {
      setTab("home");
      setIdle(false);
    }
  }, [compact, setTab]);

  useEffect(() => {
    if (compact || idle || call || flash || tab !== "home" || doorOpen) return;
    const id = window.setTimeout(() => setIdle(true), 25000);
    return () => window.clearTimeout(id);
  }, [compact, idle, call, flash, tab]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return residents.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q),
    );
  }, [residents, query]);

  const called = residents.find((r) => r.id === call?.residentId);
  const onHome = !idle && tab === "home" && !call && !flash;
  const chrome = compact || (!idle && !onHome);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden bg-bg",
        immersive
          ? "h-full min-h-0 rounded-none border-0"
          : "rounded-lg border-2 border-accent",
        !immersive && (compact ? "min-h-[420px]" : "min-h-[560px]"),
      )}
    >
      {chrome ? (
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-live" />
            <span className="text-xs font-medium tracking-wide text-muted">
              LOOK 8 · SENINKENT
            </span>
          </div>
          <KioskClock />
        </div>
      ) : null}

      {idle && !compact ? (
        <WakeScreen
          title={d.wakeTitle}
          tap={d.wakeTap}
          onWake={() => {
            setIdle(false);
            setTab("home");
          }}
        />
      ) : flash && flash.kind === "no" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-fg px-6 text-center text-bg">
          <p className="font-display text-3xl">
            {lang === "tr" ? flash.textTr : flash.textEn}
          </p>
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
          {tab !== "home" ? (
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
          ) : null}

          {tab === "home" ? (
            <HomeTiles
              lang={lang}
              doorOpen={doorOpen}
              onOpen={(id) => setTab(id)}
              onStaff={() => startCall("r4")}
            />
          ) : null}

          {tab === "directory" ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <button
                type="button"
                onClick={() => setTab("home")}
                className="px-4 pt-3 text-left text-xs text-muted hover:text-fg"
              >
                ←
              </button>
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

          {tab === "pin" ? (
            <PinPad
              onSubmit={(code) => {
                if (tryPin(code)) setTab("home");
              }}
              label={d.enterPin}
            />
          ) : null}
          {tab === "qr" ? (
            <PassPad
              onSubmit={(code) => {
                if (tryPass(code)) setTab("home");
              }}
              label={d.qr}
            />
          ) : null}
        </>
      )}

      {chrome ? (
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-subtle">
          <span className="inline-flex items-center gap-1">KorkuLook</span>
          <span className={doorOpen ? "text-live" : ""}>
            {doorOpen
              ? lastDoor
                ? doorName(lastDoor, lang)
                : d.doorOpen
              : d.doorClosed}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function WakeScreen({
  title,
  tap,
  onWake,
}: {
  title: string;
  tap: string;
  onWake: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onWake}
      className="relative flex min-h-0 flex-1 flex-col items-center px-8 py-10 text-center text-white"
      style={{
        background:
          "linear-gradient(180deg, #FF0074 0%, #FF2E82 32%, #FF7AAD 64%, #FFD6E8 100%)",
      }}
    >
      <p className="mt-[12%] font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
        {title}
      </p>
      <p className="mt-auto mb-auto text-base font-medium tracking-wide text-white/90 sm:text-lg">
        {tap}
      </p>
      <div className="mt-auto flex flex-col items-center gap-2 pb-2">
        <BrandMark className="size-10 text-white" />
        <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
          KorkuLook
        </p>
      </div>
    </button>
  );
}

function HomeTiles({
  lang,
  doorOpen,
  onOpen,
  onStaff,
}: {
  lang: string;
  doorOpen: boolean;
  onOpen: (id: "directory" | "pin" | "qr") => void;
  onStaff: () => void;
}) {
  const tr = lang === "tr";
  const tiles = [
    { id: "directory" as const, t: tr ? "Daireler #" : "Units #", Icon: Users, run: () => onOpen("directory") },
    { id: "staff" as const, t: tr ? "Görevli" : "Staff", Icon: Phone, run: onStaff },
    { id: "pin" as const, t: tr ? "Kapı PIN" : "Door PIN", Icon: Hash, run: () => onOpen("pin") },
    { id: "qr" as const, t: tr ? "Geçici PIN" : "Guest PIN", Icon: KeyRound, run: () => onOpen("qr") },
  ];
  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 bg-black p-2">
      <div className="flex min-h-0 flex-col gap-2">
        <VisitorStage live doorOpen={doorOpen} />
        <div className="flex items-center gap-3 rounded-2xl bg-[#1c1c1e] p-3">
          <BrandMark className="size-11 shrink-0 rounded-lg bg-accent p-1 text-fg" />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">Seninkent</p>
            <p className="text-[11px] text-muted">İstanbul</p>
            <p
              className={cn(
                "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                doorOpen ? "bg-accent text-accent-fg" : "bg-white/10 text-muted",
              )}
            >
              {doorOpen ? (tr ? "Kapı açık" : "Door open") : tr ? "Kapı kilitli" : "Door locked"}
            </p>
          </div>
        </div>
      </div>
      <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-2">
        {tiles.map((tile) => (
          <button
            key={tile.t}
            type="button"
            onClick={tile.run}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#1c1c1e] text-white transition-colors hover:bg-[#2c2c2e]"
          >
            <tile.Icon className="size-7 stroke-[1.5]" />
            <span className="text-[11px] font-medium tracking-wide">{tile.t}</span>
          </button>
        ))}
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

function VisitorStage({
  live = false,
  doorOpen = false,
}: {
  live?: boolean;
  doorOpen?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-end justify-center overflow-hidden bg-[#141416]",
        live ? "min-h-0 flex-1 rounded-2xl" : "h-40",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,116,0.18),transparent_62%)]" />
      {live ? (
        <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white/80">
          Kamera
        </span>
      ) : null}
      <svg viewBox="0 0 120 90" className="relative h-[85%] w-auto text-white/55">
        <circle cx="60" cy="32" r="16" fill="currentColor" opacity="0.7" />
        <path
          d="M24 90c4-28 20-42 36-42s32 14 36 42"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
      {doorOpen ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 p-3">
          <p className="rounded-2xl bg-[#39FF14] px-4 py-3 text-center font-display text-lg font-bold leading-tight text-accent shadow-lg sm:text-xl">
            Kapı açıldı, girebilirsiniz!
          </p>
        </div>
      ) : null}
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
    if (k === "C") {
      setCode("");
      return;
    }
    if (k === "OK") {
      if (code.length >= 4) onSubmit(code);
      return;
    }
    if (code.length >= 5) return;
    const next = code + k;
    setCode(next);
    if (next.length === 4) onSubmit(next);
  }
  return (
    <div className="flex flex-1 flex-col justify-between p-4">
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-2 font-mono text-2xl tracking-[0.4em] tabular-nums">
          {code.padEnd(4, "·")}
        </p>
        <p className="mt-2 text-[11px] text-subtle">Deneme: 4821 · 9001</p>
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
