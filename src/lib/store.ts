import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COMPANY_WA_E164 } from "./contact";
import { doorName, emptyOpenDoors, type DoorId } from "./doors";
import type { Lang } from "./i18n";

export type Resident = {
  id: string;
  unit: string;
  name: string;
  role: "resident" | "manager" | "guard";
  pin: string;
};

export type LogItem = {
  id: string;
  at: number;
  kind: "call" | "unlock" | "pin" | "pass" | "denied" | "add" | "remove";
  messageTr: string;
  messageEn: string;
  unit?: string;
};

export type GuestPass = {
  id: string;
  code: string;
  label: string;
  hours: number;
  createdAt: number;
};

export type CargoPin = {
  id: string;
  code: string;
  carrier: string;
};

export type Quote = {
  id: string;
  at: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  type: string;
  units: string;
  notes: string;
};

export type CallState = {
  residentId: string;
  status: "ringing" | "connected";
  startedAt: number;
} | null;

export type KioskTab = "home" | "directory" | "pin" | "qr";
export type KioskFlash = { kind: "ok" | "no"; textTr: string; textEn: string } | null;

export type WaMsg = {
  id: string;
  at: number;
  residentId: string;
  kind: "video" | "text";
  textTr: string;
  textEn: string;
};

const seedResidents: Resident[] = [
  { id: "r1", unit: "4A", name: "Ayşe Demir", role: "resident", pin: "4821" },
  { id: "r2", unit: "7B", name: "Mehmet Kaya", role: "resident", pin: "7390" },
  { id: "r3", unit: "12C", name: "Elif Yılmaz", role: "resident", pin: "1552" },
  { id: "r4", unit: "K1", name: "Hasan Görevli", role: "guard", pin: "9001" },
  { id: "r5", unit: "Y1", name: "Seninkent Yönetim", role: "manager", pin: "1000" },
];

const seedCargo: CargoPin[] = [
  { id: "c1", code: "38471", carrier: "Trendyol" },
  { id: "c2", code: "22609", carrier: "Hepsijet" },
  { id: "c3", code: "55180", carrier: "Yurtiçi" },
];

function nid() {
  return Math.random().toString(36).slice(2, 9);
}

function log(
  kind: LogItem["kind"],
  messageTr: string,
  messageEn: string,
  unit?: string,
): LogItem {
  return { id: nid(), at: Date.now(), kind, messageTr, messageEn, unit };
}

type State = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  quotes: Quote[];
  addQuote: (q: Omit<Quote, "id" | "at">) => void;
  residents: Resident[];
  logs: LogItem[];
  call: CallState;
  doorOpen: boolean;
  openDoors: Record<DoorId, boolean>;
  lastDoor: DoorId | null;
  kioskTab: KioskTab;
  kioskQuery: string;
  kioskFlash: KioskFlash;
  actingAs: string;
  passes: GuestPass[];
  cargo: CargoPin[];
  waThread: WaMsg[];
  setKioskTab: (t: KioskTab) => void;
  setKioskQuery: (q: string) => void;
  setActingAs: (id: string) => void;
  startCall: (residentId: string) => void;
  answer: () => void;
  decline: () => void;
  hangup: () => void;
  unlock: (source: "phone" | "call" | "admin" | "whatsapp", doorId?: DoorId) => void;
  tryPin: (code: string) => void;
  tryPass: (code: string) => void;
  createPass: (label: string, hours: number) => GuestPass;
  addCargo: (carrier: string) => CargoPin;
  addResident: (unit: string, name: string) => void;
  removeResident: (id: string) => void;
  resetDemo: () => void;
  waE164: string;
  setWaE164: (n: string) => void;
};

export const useKorku = create<State>()(
  persist(
    (set, get) => ({
      lang: "tr",
      setLang: (lang) => set({ lang }),
      quotes: [],
      addQuote: (q) =>
        set({ quotes: [{ ...q, id: nid(), at: Date.now() }, ...get().quotes] }),
      waE164: COMPANY_WA_E164,
      setWaE164: (waE164) => set({ waE164 }),
      residents: seedResidents,
      logs: [
        log("unlock", "Ayşe Demir kapıyı açtı", "Ayşe Demir unlocked", "4A"),
        log("pin", "Trendyol PIN ile giriş", "Trendyol PIN entry", "—"),
      ],
      call: null,
      doorOpen: false,
      openDoors: emptyOpenDoors(),
      lastDoor: null,
      kioskTab: "home",
      kioskQuery: "",
      kioskFlash: null,
      actingAs: "r1",
      passes: [],
      cargo: seedCargo,
      waThread: [],
      setKioskTab: (kioskTab) => set({ kioskTab, kioskFlash: null }),
      setKioskQuery: (kioskQuery) => set({ kioskQuery }),
      setActingAs: (actingAs) => set({ actingAs }),
      startCall: (residentId) => {
        const r = get().residents.find((x) => x.id === residentId);
        if (!r) return;
        set({
          call: { residentId, status: "ringing", startedAt: Date.now() },
          actingAs: residentId,
          waThread: [
            {
              id: nid(),
              at: Date.now(),
              residentId,
              kind: "video" as const,
              textTr: "LOOK 8 · kapıda biri. Canlı görüntü.",
              textEn: "LOOK 8 · someone at the door. Live video.",
            },
            ...get().waThread,
          ].slice(0, 12),
          logs: [
            log("call", `${r.name} arandı`, `${r.name} was called`, r.unit),
            ...get().logs,
          ],
        });
      },
      answer: () => {
        const c = get().call;
        if (!c) return;
        set({ call: { ...c, status: "connected" } });
      },
      decline: () => {
        const c = get().call;
        const r = get().residents.find((x) => x.id === c?.residentId);
        set({
          call: null,
          logs: [
            log(
              "denied",
              `${r?.name ?? "Sakin"} reddetti`,
              `${r?.name ?? "Resident"} declined`,
              r?.unit,
            ),
            ...get().logs,
          ],
        });
      },
      hangup: () => set({ call: null }),
      unlock: (source, doorId = "main") => {
        const actor =
          source === "admin"
            ? "Yönetim"
            : source === "whatsapp"
              ? "WhatsApp"
              : get().residents.find((x) => x.id === get().actingAs)?.name ?? "Sakin";
        const nameTr = doorName(doorId, "tr");
        const nameEn = doorName(doorId, "en");
        const openDoors = { ...get().openDoors, [doorId]: true };
        set({
          openDoors,
          lastDoor: doorId,
          doorOpen: true,
          call: null,
          kioskFlash: { kind: "ok", textTr: `${nameTr} açık`, textEn: `${nameEn} open` },
          waThread: [
            {
              id: nid(),
              at: Date.now(),
              residentId: get().actingAs,
              kind: "text" as const,
              textTr: `${nameTr} açıldı.`,
              textEn: `${nameEn} opened.`,
            },
            ...get().waThread,
          ].slice(0, 12),
          logs: [
            log(
              "unlock",
              `${actor} · ${nameTr}`,
              `${actor} · ${nameEn}`,
              undefined,
            ),
            ...get().logs,
          ],
        });
        window.setTimeout(() => {
          set((s) => {
            const next = { ...s.openDoors, [doorId]: false };
            const any = Object.values(next).some(Boolean);
            return {
              openDoors: next,
              doorOpen: any,
              kioskFlash: any ? s.kioskFlash : null,
            };
          });
        }, 2800);
      },
      tryPin: (code) => {
        const cargo = get().cargo.find((c) => c.code === code);
        const res = get().residents.find((r) => r.pin === code);
        if (cargo || res) {
          const who = cargo ? cargo.carrier : res!.name;
          const doorId: DoorId = cargo ? "package" : "main";
          const nameTr = doorName(doorId, "tr");
          const nameEn = doorName(doorId, "en");
          set({
            openDoors: { ...get().openDoors, [doorId]: true },
            lastDoor: doorId,
            doorOpen: true,
            kioskFlash: { kind: "ok", textTr: `${nameTr} · giriş`, textEn: `${nameEn} · entry` },
            logs: [
              log("pin", `${who} PIN · ${nameTr}`, `${who} PIN · ${nameEn}`),
              ...get().logs,
            ],
          });
          window.setTimeout(() => {
            set((s) => {
              const next = { ...s.openDoors, [doorId]: false };
              return {
                openDoors: next,
                doorOpen: Object.values(next).some(Boolean),
                kioskFlash: null,
              };
            });
          }, 2800);
        } else {
          set({
            kioskFlash: { kind: "no", textTr: "Reddedildi", textEn: "Denied" },
            logs: [log("denied", "Hatalı PIN", "Bad PIN"), ...get().logs],
          });
          window.setTimeout(() => set({ kioskFlash: null }), 1800);
        }
      },
      tryPass: (code) => {
        const p = get().passes.find(
          (x) => x.code === code && Date.now() < x.createdAt + x.hours * 3600_000,
        );
        if (p) {
          set({
            openDoors: { ...get().openDoors, main: true },
            lastDoor: "main",
            doorOpen: true,
            kioskFlash: { kind: "ok", textTr: "Geçiş kabul", textEn: "Pass accepted" },
            logs: [
              log("pass", `${p.label} geçişi`, `${p.label} pass`),
              ...get().logs,
            ],
          });
          window.setTimeout(() => {
            set((s) => {
              const next = { ...s.openDoors, main: false };
              return {
                openDoors: next,
                doorOpen: Object.values(next).some(Boolean),
                kioskFlash: null,
              };
            });
          }, 2800);
        } else {
          set({
            kioskFlash: { kind: "no", textTr: "Geçiş yok", textEn: "No pass" },
            logs: [log("denied", "Geçersiz QR/geçiş", "Invalid pass"), ...get().logs],
          });
          window.setTimeout(() => set({ kioskFlash: null }), 1800);
        }
      },
      createPass: (label, hours) => {
        const pass: GuestPass = {
          id: nid(),
          code: String(10000 + Math.floor(Math.random() * 90000)),
          label,
          hours,
          createdAt: Date.now(),
        };
        set({
          passes: [pass, ...get().passes],
          logs: [
            log("pass", `Geçiş: ${label} · ${pass.code}`, `Pass: ${label} · ${pass.code}`),
            ...get().logs,
          ],
        });
        return pass;
      },
      addCargo: (carrier) => {
        const pin: CargoPin = {
          id: nid(),
          code: String(10000 + Math.floor(Math.random() * 90000)),
          carrier,
        };
        set({ cargo: [pin, ...get().cargo] });
        return pin;
      },
      addResident: (unit, name) => {
        const r: Resident = {
          id: nid(),
          unit,
          name,
          role: "resident",
          pin: String(1000 + Math.floor(Math.random() * 9000)),
        };
        set({
          residents: [...get().residents, r],
          logs: [
            log("add", `${name} eklendi (${unit})`, `${name} added (${unit})`, unit),
            ...get().logs,
          ],
        });
      },
      removeResident: (id) => {
        const r = get().residents.find((x) => x.id === id);
        if (!r || r.role !== "resident") return;
        set({
          residents: get().residents.filter((x) => x.id !== id),
          actingAs: get().actingAs === id ? "r1" : get().actingAs,
          logs: [
            log("remove", `${r.name} çıkarıldı`, `${r.name} removed`, r.unit),
            ...get().logs,
          ],
        });
      },
      resetDemo: () =>
        set({
          residents: seedResidents,
          logs: [log("unlock", "Demo sıfırlandı", "Demo reset")],
          call: null,
          doorOpen: false,
          openDoors: emptyOpenDoors(),
          lastDoor: null,
          kioskTab: "home",
          kioskQuery: "",
          kioskFlash: null,
          actingAs: "r1",
          passes: [],
          cargo: seedCargo,
          waThread: [],
        }),
    }),
    {
      name: "korkulook",
      partialize: (s) => ({ lang: s.lang, quotes: s.quotes, waE164: s.waE164 }),
    },
  ),
);
