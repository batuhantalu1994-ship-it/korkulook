export type WaCountry = "TR" | "US";

export function toE164(raw: string, prefer: WaCountry = "TR"): string | null {
  const d = raw.replace(/\D/g, "");
  if (!d) return null;

  if (d.startsWith("90") && d.length === 12) return d;
  if (d.startsWith("1") && d.length === 11) return d;
  if (prefer === "US" || d.length === 10 && /^[2-9]/.test(d) && !d.startsWith("5")) {
    if (d.length === 10 && /^[2-9]/.test(d)) return `1${d}`;
  }
  if (d.startsWith("0") && d.length === 11) return `90${d.slice(1)}`;
  if (d.startsWith("5") && d.length === 10) return `90${d}`;
  if (d.length === 10 && /^[2-9]/.test(d)) return `1${d}`;
  return null;
}

export function formatWa(e164: string) {
  if (e164.startsWith("90") && e164.length === 12) {
    const r = e164.slice(2);
    return `+90 ${r.slice(0, 3)} ${r.slice(3, 6)} ${r.slice(6)}`;
  }
  if (e164.startsWith("1") && e164.length === 11) {
    const r = e164.slice(1);
    return `+1 (${r.slice(0, 3)}) ${r.slice(3, 6)}-${r.slice(6)}`;
  }
  return `+${e164}`;
}

export function quoteWaText(q: {
  name: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  units: string;
  notes: string;
}) {
  return [
    "KorkuLook teklif / quote",
    `Ad / Name: ${q.name}`,
    `Tel: ${q.phone}`,
    q.email ? `E-posta: ${q.email}` : "",
    `İl / City: ${q.city}`,
    `Tür / Type: ${q.type}`,
    `Daire-kapı / Units: ${q.units}`,
    q.notes ? `Not: ${q.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function waMeUrl(e164: string, text: string) {
  return `https://wa.me/${e164}?text=${encodeURIComponent(text)}`;
}
