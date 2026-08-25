export type DoorId = "main" | "garage" | "garageIn" | "package";

export type DoorTone = "accent" | "door-purple" | "door-green" | "door-lilac";

export type Door = {
  id: DoorId;
  tone: DoorTone;
  tr: string;
  en: string;
};

export const doors: Door[] = [
  { id: "main", tone: "accent", tr: "Ana kapı", en: "Main door" },
  { id: "garage", tone: "door-purple", tr: "Ana otopark kapısı", en: "Main garage door" },
  { id: "garageIn", tone: "door-green", tr: "Otopark iç kapı", en: "Garage access in-door" },
  { id: "package", tone: "door-lilac", tr: "Kargo kapısı", en: "Package door" },
];

export const emptyOpenDoors = (): Record<DoorId, boolean> => ({
  main: false,
  garage: false,
  garageIn: false,
  package: false,
});

export function doorName(id: DoorId, lang: "tr" | "en") {
  const d = doors.find((x) => x.id === id);
  if (!d) return id;
  return lang === "tr" ? d.tr : d.en;
}
