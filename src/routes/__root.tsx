import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "KorkuLook";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Evini geleceğe taşı. Video interkom, kullanıcı uygulaması ve site paneli.",
      },
      { name: "theme-color", content: "#000000" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const kiosk = pathname === "/kiosk";
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className={kiosk ? "bg-bg" : undefined}>
        <PreviewHostBridge />
        <AuthProvider>
          {kiosk ? (
            <Outlet />
          ) : (
            <div className="flex min-h-dvh flex-col">
              <Header />
              <div className="flex-1">
                <Outlet />
              </div>
              <Footer />
            </div>
          )}
          {kiosk ? null : (
            <Toaster
              theme="dark"
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#000000",
                  color: "#ffffff",
                  border: "1px solid #FF0074",
                },
              }}
            />
          )}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
