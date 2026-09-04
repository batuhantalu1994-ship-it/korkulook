import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/use-t";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const { lang } = useT();
  const tr = lang === "tr";
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">
        {tr ? "Yasal" : "Legal"}
      </p>
      <h1 className="mt-4 text-4xl">
        {tr ? "Gizlilik ve KVKK" : "Privacy & KVKK"}
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          {tr
            ? "KorkuLook, JEFE İç ve Dış Ticaret Ltd. Şti. ürünüdür. Bu site teklif, ürün tanıtımı ve canlı demo içindir."
            : "KorkuLook is a product of JEFE İç ve Dış Ticaret Ltd. Şti. This site is for quotes, product info, and the live demo."}
        </p>
        <p>
          {tr
            ? "Teklif formunda verdiğiniz ad, telefon, e-posta ve site bilgisi yalnızca teklif ve kurulum iletişimi için işlenir. WhatsApp hattımız satış içindir; sakin videosu bu hatta gitmez."
            : "Name, phone, email, and site details from the quote form are used only to reply and plan install. Our WhatsApp line is for sales — resident video does not go there."}
        </p>
        <p>
          {tr
            ? "Canlı demo tarayıcınızda çalışır; gerçek kapı kaydı tutulmaz. Canlı bir sitede kamera, dizin ve geçiş logları site yönetiminin veri sorumluluğundadır; KorkuLook veri işleyen olarak sözleşmeyle bağlıdır."
            : "The live demo runs in your browser; no real door is logged. On a live site, camera, directory, and access logs sit with the property as controller; KorkuLook is processor under contract."}
        </p>
        <p>
          {tr
            ? "Haklarınız: bilgi, düzeltme, silme, itiraz. Yazın: sor@korkulook.com"
            : "Your rights: access, correction, deletion, objection. Write: sor@korkulook.com"}
        </p>
      </div>
    </main>
  );
}
