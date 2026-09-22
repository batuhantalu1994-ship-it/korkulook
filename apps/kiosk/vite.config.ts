import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const kiosk = fileURLToPath(new URL(".", import.meta.url));
const src = fileURLToPath(new URL("../../src", import.meta.url));
const nm = (pkg: string) => path.join(kiosk, "node_modules", pkg);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": src,
      zustand: nm("zustand"),
      "@radix-ui/react-slot": nm("@radix-ui/react-slot"),
      "class-variance-authority": nm("class-variance-authority"),
      clsx: nm("clsx"),
      "tailwind-merge": nm("tailwind-merge"),
      "lucide-react": nm("lucide-react"),
      react: nm("react"),
      "react-dom": nm("react-dom"),
    },
    dedupe: ["react", "react-dom", "zustand"],
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    fs: { allow: [kiosk, src, path.join(kiosk, "../..")] },
  },
});
