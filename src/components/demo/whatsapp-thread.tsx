import { Phone, Unlock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKorku } from "@/lib/store";
import { useT } from "@/lib/use-t";
import { cn } from "@/lib/utils";

export function WhatsAppThread() {
  const { t, lang } = useT();
  const wa = t.wa;
  const thread = useKorku((s) => s.waThread);
  const actingAs = useKorku((s) => s.actingAs);
  const call = useKorku((s) => s.call);
  const unlock = useKorku((s) => s.unlock);
  const answer = useKorku((s) => s.answer);
  const decline = useKorku((s) => s.decline);
  const mine = thread.filter((m) => m.residentId === actingAs);
  const ringing = call?.status === "ringing" && call.residentId === actingAs;
  const live = call?.status === "connected" && call.residentId === actingAs;

  return (
    <div className="overflow-hidden rounded-lg bg-wa text-fg">
      <div className="flex items-center justify-between bg-wa-head px-3 py-2">
        <div>
          <p className="text-xs font-semibold">{wa.title}</p>
          <p className="text-xs text-muted">{wa.sub}</p>
        </div>
        <span className="text-xs uppercase tracking-wider text-accent">{wa.sync}</span>
      </div>

      <div className="flex max-h-64 flex-col-reverse gap-2 overflow-auto p-3">
        {mine.length === 0 && !ringing ? (
          <p className="py-6 text-center text-xs text-muted">{wa.empty}</p>
        ) : null}

        {mine.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[92%] rounded-md px-3 py-2 text-xs",
              m.kind === "video" ? "bg-wa-head" : "ml-auto bg-wa-mine",
            )}
          >
            {m.kind === "video" ? (
              <VideoBubble live={live || (ringing && m.id === mine[0]?.id)} label={wa.live} />
            ) : null}
            <p className="mt-1 leading-relaxed">
              {lang === "tr" ? m.textTr : m.textEn}
            </p>
          </div>
        ))}
      </div>

      {ringing || live ? (
        <div className="grid grid-cols-3 gap-1 border-t border-border p-2">
          <Button
            size="sm"
            className="h-10 bg-wa-mine text-fg hover:bg-wa-mine"
            onClick={() => unlock("whatsapp", "main")}
          >
            <Unlock className="size-3.5" /> {wa.open}
          </Button>
          <Button size="sm" variant="outline" className="h-10" onClick={answer}>
            <Phone className="size-3.5" /> {wa.answer}
          </Button>
          <Button size="sm" variant="outline" className="h-10" onClick={decline}>
            {t.demo.decline}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function VideoBubble({ live, label }: { live: boolean; label: string }) {
  return (
    <div className="relative mb-1 overflow-hidden rounded-sm bg-bg">
      <svg viewBox="0 0 120 72" className="h-24 w-full text-muted">
        <circle cx="60" cy="28" r="12" fill="currentColor" opacity="0.55" />
        <path
          d="M30 72c4-20 14-32 30-32s26 12 30 32"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-sm bg-accent px-1.5 py-0.5 text-xs font-semibold text-accent-fg">
        <Video className="size-3" />
        {live ? label : "LOOK 8"}
      </span>
    </div>
  );
}
