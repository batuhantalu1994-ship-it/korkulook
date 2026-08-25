import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doors } from "@/lib/doors";
import { useKorku } from "@/lib/store";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";

export function AdminPanel() {
  const { t, lang } = useT();
  const d = t.demo;
  const residents = useKorku((s) => s.residents);
  const logs = useKorku((s) => s.logs);
  const cargo = useKorku((s) => s.cargo);
  const doorOpen = useKorku((s) => s.doorOpen);
  const openDoors = useKorku((s) => s.openDoors);
  const call = useKorku((s) => s.call);
  const unlock = useKorku((s) => s.unlock);
  const addResident = useKorku((s) => s.addResident);
  const removeResident = useKorku((s) => s.removeResident);
  const resetDemo = useKorku((s) => s.resetDemo);
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex min-h-[560px] flex-col overflow-hidden rounded-xl border border-border-strong bg-bg">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Seninkent</p>
          <p className="font-display text-lg">{d.admin}</p>
        </div>
        <span
          className={cn(
            "rounded-sm px-2 py-1 text-xs font-medium",
            doorOpen ? "bg-live/20 text-live" : "bg-elevated text-muted",
          )}
        >
          {doorOpen ? d.doorOpen : d.doorClosed}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-px border-b border-border bg-border">
        <Stat n={residents.length} l={d.units} />
        <Stat n={logs.length} l={d.logs} />
        <Stat n={cargo.length} l={d.carriers} />
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {doors.map((door) => (
          <Button
            key={door.id}
            size="sm"
            variant={openDoors[door.id] ? "live" : "outline"}
            className="h-auto min-h-9 whitespace-normal py-2 text-left text-xs"
            onClick={() => unlock("admin", door.id)}
          >
            {lang === "tr" ? door.tr : door.en}
          </Button>
        ))}
        <Button size="sm" variant="outline" className="col-span-2" onClick={resetDemo}>
          {d.reset}
        </Button>
      </div>

      {call ? (
        <p className="px-4 pb-2 text-xs text-live">
          {d.calling} {residents.find((r) => r.id === call.residentId)?.name}
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
        <p className="mb-2 text-xs uppercase tracking-wider text-muted">{d.units}</p>
        <ul className="mb-4 divide-y divide-border rounded-md border border-border">
          {residents.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
            >
              <span>
                <span className="font-medium">{r.name}</span>
                <span className="ml-2 text-xs text-muted">
                  {r.unit} · PIN {r.pin}
                </span>
              </span>
              {r.role === "resident" ? (
                <button
                  type="button"
                  className="text-xs text-danger"
                  onClick={() => removeResident(r.id)}
                >
                  ×
                </button>
              ) : null}
            </li>
          ))}
        </ul>

        <form
          className="mb-5 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!unit.trim() || !name.trim()) return;
            addResident(unit.trim(), name.trim());
            setUnit("");
            setName("");
          }}
        >
          <div className="flex gap-2">
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="8D"
              className="w-20"
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={d.add}
            />
          </div>
          <Button type="submit" size="sm" variant="outline">
            {d.add}
          </Button>
        </form>

        <p className="mb-2 text-xs uppercase tracking-wider text-muted">{d.cargo}</p>
        <ul className="mb-5 space-y-1 text-sm">
          {cargo.map((c) => (
            <li key={c.id} className="flex justify-between font-mono text-xs">
              <span className="font-sans text-muted">{c.carrier}</span>
              <span className="tabular-nums">{c.code}</span>
            </li>
          ))}
        </ul>

        <p className="mb-2 text-xs uppercase tracking-wider text-muted">{d.logs}</p>
        <ul className="space-y-2">
          {logs.slice(0, 12).map((item) => (
            <li key={item.id} className="text-xs leading-snug text-muted">
              <span className="mr-2 font-mono tabular-nums text-subtle">
                {new Date(item.at).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {lang === "tr" ? item.messageTr : item.messageEn}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div className="bg-bg px-3 py-3">
      <p className="font-display text-xl tabular-nums">{n}</p>
      <p className="text-xs text-muted">{l}</p>
    </div>
  );
}
