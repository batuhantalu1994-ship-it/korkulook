/** Fullscreen, stay awake, Look 8 portrait. Safe to call in a browser too. */

export async function bootKioskShell() {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (!Capacitor.isNativePlatform()) {
      await requestWakeLock();
      return;
    }
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    const { KeepAwake } = await import("@capacitor-community/keep-awake");
    const { ScreenOrientation } = await import("@capacitor/screen-orientation");
    await StatusBar.hide();
    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setStyle({ style: Style.Dark });
    await KeepAwake.keepAwake();
    await ScreenOrientation.lock({ orientation: "portrait" });
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
