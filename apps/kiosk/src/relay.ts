import { useKorku } from "@/lib/store";

/**
 * Hardware muscle. v0 logs OPEN. Swap `pulse` with DNAKE GPIO / USB relay later.
 * Phone swipe already sets openDoors in the same Zustand store — this watches it.
 */
export function subscribeUnlock() {
  let last = "";
  const unsub = useKorku.subscribe((s) => {
    const open = Object.entries(s.openDoors)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(",");
    if (!open || open === last) {
      last = open;
      return;
    }
    last = open;
    void pulse(open.split(",")[0] ?? "main", 3000);
  });
  return unsub;
}

export async function pulse(door: string, ms: number) {
  console.info(`[korkulook] OPEN ${door} ${ms}ms`);
  // TODO: DNAKE S617 relay / Pretech RS485 module
}
