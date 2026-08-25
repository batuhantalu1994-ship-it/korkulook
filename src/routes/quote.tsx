import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_WA_E164 } from "@/lib/contact";
import { useKorku } from "@/lib/store";
import { useT } from "@/lib/use-t";
import { quoteWaText, waMeUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/quote")({ component: QuotePage });

function QuotePage() {
  const { t } = useT();
  const q = t.quote;
  const addQuote = useKorku((s) => s.addQuote);
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    type: "site",
    units: "",
    notes: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{q.kicker}</p>
        <h1 className="mt-4 text-4xl">{q.title}</h1>
        <p className="mt-5 text-muted">{q.body}</p>
        <ol className="mt-10 space-y-3 text-sm">
          <li>
            <span className="text-accent">1 · </span>
            {q.next1}
          </li>
          <li>
            <span className="text-accent">2 · </span>
            {q.next2}
          </li>
          <li>
            <span className="text-accent">3 · </span>
            {q.next3}
          </li>
        </ol>
      </div>
      <form
        className="space-y-4 rounded-xl border border-border bg-surface p-6"
        onSubmit={(e) => {
          e.preventDefault();
          addQuote(form);
          setWaUrl(waMeUrl(COMPANY_WA_E164, quoteWaText(form)));
          toast.success(q.sentWa);
          setSent(true);
        }}
      >
        <Field label={q.name} htmlFor="name">
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>
        <Field label={q.phone} htmlFor="phone">
          <Input
            id="phone"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field label={q.email} htmlFor="email">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label={q.city} htmlFor="city">
          <Input
            id="city"
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </Field>
        <Field label={q.type} htmlFor="type">
          <select
            id="type"
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm"
          >
            {Object.entries(q.types).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={q.units} htmlFor="units">
          <Input
            id="units"
            inputMode="numeric"
            required
            value={form.units}
            onChange={(e) => set("units", e.target.value)}
          />
        </Field>
        <Field label={q.notes} htmlFor="notes">
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            className="w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm"
          />
        </Field>
        <Button type="submit" className="w-full" size="lg">
          {sent ? q.submitAgain : q.submit}
        </Button>
        {waUrl ? (
          <div className="space-y-2">
            <Button asChild size="lg" variant="inverse" className="w-full">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                {q.openWa}
              </a>
            </Button>
            <p className="text-sm text-muted">{q.sentHint}</p>
          </div>
        ) : null}
      </form>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
