import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { KioskPanel } from "@/components/demo/kiosk-panel";

export const Route = createFileRoute("/kiosk")({ component: KioskPage });

function KioskPage() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("kiosk-mode");
    let lock: WakeLockSentinel | null = null;
    const request = async () => {
      try {
        lock = await navigator.wakeLock?.request("screen");
      } catch {
        /* panel may ignore */
      }
    };
    void request();
    const onVis = () => {
      if (document.visibilityState === "visible") void request();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      html.classList.remove("kiosk-mode");
      document.removeEventListener("visibilitychange", onVis);
      void lock?.release();
    };
  }, []);

  return (
    <div className="flex h-dvh min-h-0 flex-col bg-bg">
      <KioskPanel immersive />
    </div>
  );
}
