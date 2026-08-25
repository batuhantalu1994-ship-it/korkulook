import { useEffect, useRef, useState } from "react";
import { Phone, PhoneOff, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doors, type DoorTone } from "@/lib/doors";
import { useKorku } from "@/lib/store";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";
import { WhatsAppThread } from "./whatsapp-thread";

export function ResidentPanel() {
  const { t, lang } = useT();
  const d = t.demo;
  const residents = useKorku((s) => s.residents);
  const actingAs = useKorku((s) => s.actingAs);
  const setActingAs = useKorku((s) => s.setActingAs);
  const call = useKorku((s) => s.call);
  const unlock = useKorku((s) => s.unlock);
  const answer = useKorku((s) => s.answer);
  const decline = useKorku((s) => s.decline);
  const hangup = useKorku((s) => s.hangup);
  const createPass = useKorku((s) => s.createPass);
  const addCargo = useKorku((s) => s.addCargo);
  const passes = useKorku((s) => s.passes);
  const cargo = useKorku((s) => s.cargo);
  const openDoors = useKorku((s) => s.openDoors);
  const me = residents.find((r) => r.id === actingAs) ?? residents[0];
  const ringingForMe = call?.status === "ringing" && call.residentId === me.id;
  const inCall = call?.status === "connected" && call.residentId === me.id;

  const [passLabel, setPassLabel] = useState("Misafir");
  const [hours, setHours] = useState(4);
  const [lastPass, setLastPass] = useState<string | null>(null);
  const [lastCargo, setLastCargo] = useState<string | null>(null);

  return (
    <div className="flex min-h-[560px] flex-col overflow-hidden rounded-xl border border-border-strong bg-bg">
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-muted">{d.youAre}</p>
        <select
          value={me.id}
          onChange={(e) => setActingAs(e.target.value)}
          className="mt-1 h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm"
        >
          {residents.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} · {r.unit}
            </option>
          ))}
        </select>
      </div>

      {ringingForMe ? (
        <Incoming
          onAnswer={answer}
          onDecline={decline}
          answerLabel={d.answer}
          declineLabel={d.decline}
          title={d.incoming}
        />
      ) : null}

      {inCall ? (
        <div className="space-y-3 border-b border-border bg-elevated p-4">
          <p className="text-xs uppercase tracking-wider text-live">{d.connected}</p>
          <div className="flex gap-2">
            <Button className="flex-1" variant="live" onClick={() => unlock("call", "main")}>
              <Unlock className="size-4" /> {d.unlock}
            </Button>
            <Button variant="outline" onClick={hangup}>
              <PhoneOff className="size-4" /> {d.hangup}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-5 p-4">
        <WhatsAppThread />
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted">{d.swipe}</p>
          {doors.map((door) => (
            <SwipeToOpen
              key={door.id}
              name={lang === "tr" ? door.tr : door.en}
              tone={door.tone}
              open={openDoors[door.id]}
              openLabel={d.doorOpen}
              onOpen={() => unlock("phone", door.id)}
            />
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted">{d.pass}</p>
          <Label htmlFor="pass-label">{d.pass}</Label>
          <Input
            id="pass-label"
            value={passLabel}
            onChange={(e) => setPassLabel(e.target.value)}
          />
          <div className="flex gap-2">
            {[1, 4, 24].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHours(h)}
                className={cn(
                  "h-9 flex-1 rounded-sm border text-xs",
                  hours === h
                    ? "border-fg bg-elevated"
                    : "border-border text-muted",
                )}
              >
                {h} {d.hours}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              const p = createPass(passLabel || "Misafir", hours);
              setLastPass(p.code);
            }}
          >
            {d.createPass}
          </Button>
          {lastPass ? (
            <p className="font-mono text-lg tracking-[0.25em]">{lastPass}</p>
          ) : null}
          {passes[0] && !lastPass ? (
            <p className="text-xs text-muted">
              {passes[0].label} · {passes[0].code}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted">{d.cargo}</p>
          <div className="flex gap-2">
            {["Trendyol", "Getir", "Yurtiçi"].map((c) => (
              <Button
                key={c}
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setLastCargo(addCargo(c).code)}
              >
                {c}
              </Button>
            ))}
          </div>
          {lastCargo ? (
            <p className="font-mono text-lg tracking-[0.25em]">{lastCargo}</p>
          ) : (
            <p className="text-xs text-subtle">
              {cargo[0]?.carrier} · {cargo[0]?.code}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Incoming({
  onAnswer,
  onDecline,
  answerLabel,
  declineLabel,
  title,
}: {
  onAnswer: () => void;
  onDecline: () => void;
  answerLabel: string;
  declineLabel: string;
  title: string;
}) {
  return (
    <div className="space-y-3 border-b border-live/40 bg-live/10 p-4">
      <p className="text-sm font-medium">{title}</p>
      <div className="flex gap-2">
        <Button className="flex-1" variant="live" onClick={onAnswer}>
          <Phone className="size-4" /> {answerLabel}
        </Button>
        <Button variant="danger" onClick={onDecline}>
          {declineLabel}
        </Button>
      </div>
    </div>
  );
}

const trackTone: Record<DoorTone, string> = {
  accent: "bg-accent",
  "door-purple": "bg-door-purple",
  "door-green": "bg-door-green",
  "door-lilac": "bg-door-lilac",
};

const labelTone: Record<DoorTone, string> = {
  accent: "text-accent-fg",
  "door-purple": "text-fg",
  "door-green": "text-bg",
  "door-lilac": "text-bg",
};

function SwipeToOpen({
  name,
  tone,
  open,
  openLabel,
  onOpen,
}: {
  name: string;
  tone: DoorTone;
  open: boolean;
  openLabel: string;
  onOpen: () => void;
}) {
  const [x, setX] = useState(0);
  const [trackW, setTrackW] = useState(240);
  const [dragging, setDragging] = useState(false);
  const [drained, setDrained] = useState(open);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const sync = () => setTrackW(el.clientWidth);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setDrained(open);
    if (!open) setX(0);
  }, [open]);

  const max = Math.max(80, trackW - 56);
  const gone = drained || open;
  const remain = gone ? 0 : Math.max(0, 1 - x / max);

  function end(nx: number) {
    setDragging(false);
    if (nx > max * 0.72) {
      setDrained(true);
      onOpen();
    }
    setX(0);
  }

  return (
    <div
      ref={track}
      className="relative h-16 overflow-hidden rounded-lg bg-elevated"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0",
          trackTone[tone],
          !dragging && "transition-[width,opacity] duration-300 ease-out",
        )}
        style={{ width: `${remain * 100}%`, opacity: remain }}
      />
      <div
        className="absolute inset-y-1 left-1 z-10 flex size-14 cursor-grab items-center justify-center rounded-md bg-bg text-fg active:cursor-grabbing"
        style={{ transform: `translateX(${gone ? 0 : x}px)` }}
        onPointerDown={(e) => {
          if (gone) return;
          setDragging(true);
          const start = e.clientX - x;
          const move = (ev: PointerEvent) => {
            setX(Math.max(0, Math.min(max, ev.clientX - start)));
          };
          const up = (ev: PointerEvent) => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            end(Math.max(0, Math.min(max, ev.clientX - start)));
          };
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
        }}
      >
        <Unlock className="size-5" />
      </div>
      <p
        className={cn(
          "relative z-[1] flex h-full items-center justify-center pl-16 pr-3 text-center text-sm font-semibold",
          gone ? "text-fg" : labelTone[tone],
        )}
      >
        {gone ? openLabel : name}
      </p>
    </div>
  );
}
