# KorkuLook kiosk APK (`tr.korkulook.kiosk`)

Fullscreen Look 8 UI (Welcome + Daireler / PIN / Kargo). Same tiles as the site.
Hardware pulse is a stub in `src/relay.ts` until S617 / WP103 GPIO is wired.

## Build APK (Mac / Linux with Android SDK)

```bash
cd apps/kiosk
npm install
npx cap add android          # first time only
npm run cap:sync
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

Sideload: enable USB debugging, then the `adb install` line.

Portrait lock + keep-awake + hidden status bar run only on a real device
(Capacitor). In a browser, open `/kiosk` on korkulook.com — same UI, no chrome.

## After you change the tiles

Edit `src/components/demo/kiosk-panel.tsx` (shared). Then `npm run cap:sync` and reinstall.
