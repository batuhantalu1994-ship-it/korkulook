import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "tr.korkulook.kiosk",
  appName: "KorkuLook",
  webDir: "dist",
  android: {
    allowMixedContent: true,
    backgroundColor: "#000000",
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: "DARK",
      backgroundColor: "#00000000",
    },
  },
};

export default config;
