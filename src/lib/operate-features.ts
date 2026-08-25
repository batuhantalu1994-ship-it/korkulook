export type FeatStatus = "have" | "need" | "later";

export type Feat = {
  area: { tr: string; en: string };
  name: { tr: string; en: string };
  why: { tr: string; en: string };
  status: FeatStatus;
};

export const operateFeatures: Feat[] = [
  {
    area: { tr: "Kapı", en: "Door" },
    name: { tr: "Dizin, PIN, QR, kaydır-aç", en: "Directory, PIN, QR, swipe-unlock" },
    why: { tr: "Ziyaretçi ve sakin aynı saniye", en: "Visitor and resident in the same second" },
    status: "have",
  },
  {
    area: { tr: "Kapı", en: "Door" },
    name: { tr: "Gerçek WebRTC görüntü + ses", en: "Real WebRTC video + audio" },
    why: { tr: "Demo siluet; sahada codec ve NAT", en: "Demo is a silhouette; field needs codec and NAT" },
    status: "need",
  },
  {
    area: { tr: "Kapı", en: "Door" },
    name: { tr: "Cihaz kaydı / seri / OTA", en: "Device registry / serial / OTA" },
    why: { tr: "Hangi kiosk hangi site, uzaktan APK", en: "Which kiosk belongs where, remote APK" },
    status: "need",
  },
  {
    area: { tr: "Kapı", en: "Door" },
    name: { tr: "Kilit röle + çevrimdışı PIN (MCU)", en: "Lock relay + offline PIN (MCU)" },
    why: { tr: "Linux donarsa kapı yine açılsın", en: "Door still opens if Linux stalls" },
    status: "need",
  },
  {
    area: { tr: "Kapı", en: "Door" },
    name: { tr: "Kenarda yüz / kargo tanıma", en: "On-device face / parcel detect" },
    why: { tr: "KVKK: yüz buluta gitmez", en: "KVKK: faces stay on device" },
    status: "later",
  },
  {
    area: { tr: "Sakin", en: "Resident" },
    name: { tr: "Çağrı, geçiş, kargo PIN (demo)", en: "Call, pass, cargo PIN (demo)" },
    why: { tr: "Ürünün kalbi, tarayıcıda çalışıyor", en: "Product heart, already in the browser" },
    status: "have",
  },
  {
    area: { tr: "Sakin", en: "Resident" },
    name: { tr: "iOS / Android native + push", en: "iOS / Android native + push" },
    why: { tr: "Arka planda kapı çağrısı", en: "Door call while the phone is locked" },
    status: "need",
  },
  {
    area: { tr: "Sakin", en: "Resident" },
    name: { tr: "WhatsApp kapı aç / çağrı", en: "WhatsApp unlock / call" },
    why: { tr: "Dördüncü uygulama indirmeyen sakin", en: "Residents who will not install a fourth app" },
    status: "need",
  },
  {
    area: { tr: "Sakin", en: "Resident" },
    name: { tr: "Davet SMS / link ile onboarding", en: "Invite SMS / link onboarding" },
    why: { tr: "Taşınan daire 30 saniye", en: "Move-in in 30 seconds" },
    status: "need",
  },
  {
    area: { tr: "Yönetim", en: "Management" },
    name: { tr: "Daire, kayıt, uzaktan aç, kargo listesi", en: "Units, log, remote unlock, carriers" },
    why: { tr: "Alıcının paneli — demo hazır", en: "Buyer console — demo ready" },
    status: "have",
  },
  {
    area: { tr: "Yönetim", en: "Management" },
    name: { tr: "Çoklu site / rol (yönetici, görevli, bayi)", en: "Multi-site / roles (admin, staffer, dealer)" },
    why: { tr: "Portföy firması tek giriş", en: "Portfolio company, one login" },
    status: "need",
  },
  {
    area: { tr: "Yönetim", en: "Management" },
    name: { tr: "Aidat / e-fatura / ₺ birim fiyat", en: "Dues / e-invoice / ₺ unit price" },
    why: { tr: "Para burada döner", en: "This is where money turns" },
    status: "need",
  },
  {
    area: { tr: "Yönetim", en: "Management" },
    name: { tr: "Apsiyon / Yönet entegrasyonu", en: "Apsiyon / site-software integration" },
    why: { tr: "Taşınmayı iki kez yazmasınlar", en: "Don't make them type move-ins twice" },
    status: "later",
  },
  {
    area: { tr: "Yönetim", en: "Management" },
    name: { tr: "Kayıt dışa aktar + 365 gün saklama politikası", en: "Log export + 365-day retention policy" },
    why: { tr: "Hırsızlık / kurul sorusu", en: "Theft / board questions" },
    status: "need",
  },
  {
    area: { tr: "Satış", en: "Sales" },
    name: { tr: "Teklif formu + TR/EN site", en: "Quote form + TR/EN site" },
    why: { tr: "Huni bugün açık", en: "Funnel is open today" },
    status: "have",
  },
  {
    area: { tr: "Satış", en: "Sales" },
    name: { tr: "CRM / teklif PDF / keşif checklist", en: "CRM / quote PDF / site-survey checklist" },
    why: { tr: "Bayi kapıyı ölçsün", en: "Dealer measures the door" },
    status: "need",
  },
  {
    area: { tr: "Satış", en: "Sales" },
    name: { tr: "Bayi portalı (fiyat, iş emri, komisyon)", en: "Dealer portal (price, job, commission)" },
    why: { tr: "ButterflyMX'in asıl ölçek motoru", en: "ButterflyMX's actual scale engine" },
    status: "later",
  },
  {
    area: { tr: "Güvenlik", en: "Security" },
    name: { tr: "Hesap / oturum yok (demo)", en: "No accounts (demo)" },
    why: { tr: "Önizleme kasıtlı açık", en: "Preview is intentionally open" },
    status: "have",
  },
  {
    area: { tr: "Güvenlik", en: "Security" },
    name: { tr: "Yönetici + sakin girişi, cihaz sertifikası", en: "Admin + resident auth, device certs" },
    why: { tr: "Yanlış siteyi açmak felaket", en: "Unlocking the wrong site is catastrophic" },
    status: "need",
  },
  {
    area: { tr: "Güvenlik", en: "Security" },
    name: { tr: "Kiosk aydınlatma metni + onay", en: "Kiosk privacy notice + consent" },
    why: { tr: "Kameraya bakan herkes veri öznesi", en: "Everyone the camera sees is a data subject" },
    status: "need",
  },
];
