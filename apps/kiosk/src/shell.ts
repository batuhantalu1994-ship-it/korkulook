/** Fullscreen, stay awake, Look 8 portrait. Safe to call in a browser too. */

export async function bootKioskShell() {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) {
      await requestWakeLock();
      return;
    }
    const { StatusBar } = await import("@capacitor/status-bar");
    const { KeepAwake } = await import("@capacitor-community/keep-awake");
    const { ScreenOrientation } = await import("@capacitor/screen-orientation");
    await KeepAwake.keepAwake();
    await ScreenOrientation.lock({ orientation: "portrait" });
    try {
      await StatusBar.hide();
    } catch {
      /* One UI can skip this */
    }
  } catch {
    await requestWakeLock();
  }
}

async function requestWakeLock() {
  try {
    await navigator.wakeLock?.request("screen");
  } catch {
    /* ignore */
  }
}
