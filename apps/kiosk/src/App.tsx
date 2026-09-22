import { useEffect } from "react";
import { KioskPanel } from "@/components/demo/kiosk-panel";
import { bootKioskShell } from "./shell";
import { subscribeUnlock } from "./relay";

export function App() {
  useEffect(() => {
    document.documentElement.classList.add("kiosk-mode");
    void bootKioskShell();
    return subscribeUnlock();
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <KioskPanel immersive />
    </div>
  );
}
