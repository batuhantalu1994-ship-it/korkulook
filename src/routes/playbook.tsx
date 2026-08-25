import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WaBind } from "@/components/site/wa-bind";
import { playSteps, playTracks, playVs } from "@/lib/playbook";
import { useKorku } from "@/lib/store";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

function PlaybookPage() {
  const { t, lang } = useT();
  const p = t.playbook;
  const quotes = useKorku((s) => s.quotes);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {p.kicker}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl">{p.title}</h1>
      <p className="mt-5 max-w-2xl text-muted">{p.lead}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/quote">{t.nav.quote}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/live">{t.nav.live}</Link>
        </Button>
      </div>

      <div className="mt-10">
        <WaBind />
      </div>

      <section className="mt-16 grid gap-4 lg:grid-cols-3">
        {playTracks.map((track) => (
          <article
            key={track.t.en}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h2 className="font-display text-2xl">{track.t[lang]}</h2>
            <p className="mt-3 text-sm text-muted">{track.d[lang]}</p>
          </article>
        ))}
      </section>

      <ol className="mt-16 divide-y divide-border border-y border-border">
        {playSteps.map((step, i) => (
          <li key={step.when.en} className="grid gap-3 py-8 md:grid-cols-[8rem_1fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {i + 1} · {step.when[lang]}
            </p>
            <div>
              <h2 className="text-2xl">{step.title[lang]}</h2>
              <p className="mt-3 max-w-2xl text-sm text-muted">{step.body[lang]}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{p.vsKicker}</p>
        <h2 className="mt-3 text-3xl">{p.vsTitle}</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-subtle">
                <th className="py-3 pr-4 font-medium">{p.vsThem}</th>
                <th className="py-3 font-medium text-accent">{p.vsUs}</th>
              </tr>
            </thead>
            <tbody>
              {playVs.map((row) => (
                <tr key={row.them.en} className="border-b border-border">
                  <td className="py-4 pr-4 text-muted">{row.them[lang]}</td>
                  <td className="py-4">{row.us[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-accent p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{p.inboxKicker}</p>
        <h2 className="mt-3 text-3xl">{p.inboxTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">{p.inboxLead}</p>
        {quotes.length === 0 ? (
          <p className="mt-6 text-sm text-subtle">{p.inboxEmpty}</p>
        ) : (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {quotes.map((q) => (
              <li key={q.id} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr_6rem]">
                <p className="font-mono text-xs text-subtle">
                  {new Date(q.at).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB")}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{q.name}</span>
                  <span className="text-muted">
                    {" "}
                    · {q.city} · {q.type} · {q.units}
                  </span>
                </p>
                <p className="text-xs text-muted">{q.phone}</p>
              </li>
            ))}
          </ul>
        )}
        <Button asChild className="mt-8">
          <Link to="/quote">{t.nav.quote}</Link>
        </Button>
      </section>
    </main>
  );
}
