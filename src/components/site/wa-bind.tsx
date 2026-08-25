import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKorku } from "@/lib/store";
import { formatWa, toE164, type WaCountry } from "@/lib/whatsapp";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";

export function WaBind() {
  const { t } = useT();
  const w = t.waBind;
  const waE164 = useKorku((s) => s.waE164);
  const setWaE164 = useKorku((s) => s.setWaE164);
  const [raw, setRaw] = useState("");
  const [err, setErr] = useState("");
  const [country, setCountry] = useState<WaCountry>("US");

  return (
    <div className="rounded-xl border border-accent p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {w.kicker}
      </p>
      <h2 className="mt-2 text-xl">{w.title}</h2>
      <p className="mt-2 text-sm text-muted">{w.lead}</p>
      {waE164 ? (
        <p className="mt-4 text-sm">
          {w.linked} <span className="font-medium">{formatWa(waE164)}</span>
        </p>
      ) : (
        <p className="mt-4 text-sm text-subtle">{w.unlinked}</p>
      )}
      <div className="mt-4 flex gap-2">
        {(["US", "TR"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCountry(c)}
            className={cn(
              "h-11 min-w-14 rounded-sm border px-3 text-sm font-medium",
              country === c
                ? "border-fg bg-elevated text-fg"
                : "border-border text-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="wa-line">{w.number}</Label>
          <Input
            id="wa-line"
            type="tel"
            inputMode="tel"
            placeholder={country === "US" ? "+1 415 555 0100" : "05xx xxx xx xx"}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            const n = toE164(raw, country);
            if (!n) {
              setErr(w.bad);
              return;
            }
            setErr("");
            setWaE164(n);
            setRaw("");
          }}
        >
          {w.save}
        </Button>
      </div>
      {err ? <p className="mt-2 text-sm text-fg">{err}</p> : null}
      {waE164 ? (
        <div className="mt-4 space-y-2">
          <a
            href={`https://wa.me/${waE164}?text=${encodeURIComponent("KorkuLook hat testi")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center text-sm font-medium text-accent hover:text-fg"
          >
            {w.test}
          </a>
          <p className="text-sm text-muted">{w.self}</p>
        </div>
      ) : null}
    </div>
  );
}
