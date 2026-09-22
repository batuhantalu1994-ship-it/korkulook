import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "tr.korkulook.kiosk",
  appName: "KorkuLook",
  webDir: "dist",
  android: {
    allowMixedContent: true,
    backgroundColor: "#FF0074",
    webContentsDebuggingEnabled: true,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#FF0074",
    },
  },
};

export default config;
