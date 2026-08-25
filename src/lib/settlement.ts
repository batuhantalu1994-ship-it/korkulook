export type CostRow = {
  item: { tr: string; en: string };
  need: { tr: string; en: string };
  amount: string;
  cadence: { tr: string; en: string };
};

export const companyRows: CostRow[] = [
  {
    item: { tr: "Ltd. Şti. kuruluş (MERSİS, sicil, noter)", en: "LLC formation (registry, notary)" },
    need: { tr: "Fatura kesmek, sözleşme, ithalat", en: "Invoice, contracts, import" },
    amount: "₺15.000–25.000",
    cadence: { tr: "bir kez", en: "once" },
  },
  {
    item: { tr: "Asgari sermaye", en: "Minimum capital" },
    need: { tr: "TTK Ltd. tabanı — 24 ay içinde ödenebilir", en: "TTK LLC floor — payable in 24 months" },
    amount: "₺50.000",
    cadence: { tr: "sermaye", en: "capital" },
  },
  {
    item: { tr: "Avukat + yeminli mali müşavir, yıl 1", en: "Lawyer + CPA, year 1" },
    need: { tr: "Sözleşme, bordro, KDV, e-fatura", en: "Contracts, payroll, VAT, e-invoice" },
    amount: "₺40.000–80.000",
    cadence: { tr: "yıl 1", en: "year 1" },
  },
  {
    item: { tr: "Marka tescili (Türk Patent)", en: "Trademark (Turkish Patent)" },
    need: { tr: "KorkuLook adı + iris işareti, 1–2 sınıf", en: "KorkuLook name + iris mark, 1–2 classes" },
    amount: "₺8.000–15.000",
    cadence: { tr: "bir kez", en: "once" },
  },
  {
    item: { tr: "KVKK / VERBİS + aydınlatma", en: "KVKK / VERBİS + notices" },
    need: { tr: "Kamera + yüz, saklama süresi, DPO", en: "Camera + face, retention, DPO" },
    amount: "₺20.000–45.000",
    cadence: { tr: "yıl 1", en: "year 1" },
  },
  {
    item: { tr: "Ürün / mesleki sorumluluk sigortası", en: "Product / professional liability" },
    need: { tr: "Kapı açılmazsa, kaza, siber", en: "Failed unlock, accident, cyber" },
    amount: "₺25.000–60.000",
    cadence: { tr: "yıl", en: "year" },
  },
  {
    item: { tr: "Sanal ofis + e-posta + alan adı", en: "Virtual office + mail + domain" },
    need: { tr: "Ticaret sicili adresi", en: "Registry address" },
    amount: "₺3.000–6.000",
    cadence: { tr: "ay", en: "month" },
  },
];

export const stackRows: CostRow[] = [
  {
    item: { tr: "Look 8 kiosk (OEM Android 8\", bizim APK)", en: "Look 8 kiosk (OEM Android 8\", our APK)" },
    need: { tr: "Kapı yüzü — stok 10 adet ile başla", en: "The door face — start with 10 units" },
    amount: "$280–380 / adet",
    cadence: { tr: "stok", en: "stock" },
  },
  {
    item: { tr: "Elektrikli kilit + adaptör", en: "Electric strike + PSU" },
    need: { tr: "Kapıyı fiilen açan parça", en: "The part that actually opens the door" },
    amount: "$50–90 / kapı",
    cadence: { tr: "stok", en: "stock" },
  },
  {
    item: { tr: "PoE enjektör veya switch portu", en: "PoE injector or switch port" },
    need: { tr: "Tek kablo: güç + ethernet", en: "One cable: power + ethernet" },
    amount: "$25–45",
    cadence: { tr: "stok", en: "stock" },
  },
  {
    item: { tr: "4G yedek (modem + SIM)", en: "4G fallback (modem + SIM)" },
    need: { tr: "Fiber kesilince kiosk ölmesin", en: "Kiosk stays up if fibre dies" },
    amount: "$40 + ₺150–250/ay",
    cadence: { tr: "kapı", en: "door" },
  },
  {
    item: { tr: "Arduino UNO Q × 5 (lab)", en: "Arduino UNO Q × 5 (lab)" },
    need: { tr: "Kilit MCU + kenar AI deneyi — duvara değil", en: "Lock MCU + edge AI — not in the wall" },
    amount: "$220",
    cadence: { tr: "bir kez", en: "once" },
  },
  {
    item: { tr: "Cam / ön panel baskı (marka)", en: "Glass / fascia print (brand)" },
    need: { tr: "OEM'i Look yapmak", en: "Turn OEM into Look" },
    amount: "$40–80 / adet",
    cadence: { tr: "stok", en: "stock" },
  },
  {
    item: { tr: "WebRTC (LiveKit vb.)", en: "WebRTC (LiveKit etc.)" },
    need: { tr: "Görüntülü çağrı", en: "Video calling" },
    amount: "$50–200",
    cadence: { tr: "ay", en: "month" },
  },
  {
    item: { tr: "Kayıt deposu (7–30 gün, KVKK)", en: "Clip storage (7–30 days, KVKK)" },
    need: { tr: "Olay videosu, yüz değil", en: "Event video, not faces" },
    amount: "$30–80",
    cadence: { tr: "ay", en: "month" },
  },
  {
    item: { tr: "App Store + Play + imza", en: "App Store + Play + signing" },
    need: { tr: "Sakin uygulaması", en: "Resident app" },
    amount: "$99/yıl + $25",
    cadence: { tr: "yıl", en: "year" },
  },
  {
    item: { tr: "WhatsApp Cloud API", en: "WhatsApp Cloud API" },
    need: { tr: "Kapı aç / çağrı, yaşlı sakin", en: "Unlock / call for older residents" },
    amount: "konuşma başı ücret",
    cadence: { tr: "kullanım", en: "usage" },
  },
];

export const siteRows: CostRow[] = [
  {
    item: { tr: "2 × Look 8 (ana + otopark)", en: "2 × Look 8 (lobby + garage)" },
    need: { tr: "Tipik 80–120 daire site", en: "Typical 80–120 unit site" },
    amount: "$700–900",
    cadence: { tr: "kurulum", en: "install" },
  },
  {
    item: { tr: "Kilit + kablo + PoE", en: "Lock + cable + PoE" },
    need: { tr: "Mevcut diafon kablosu çoğu yerde yeter", en: "Existing intercom cable often enough" },
    amount: "$200–350",
    cadence: { tr: "kurulum", en: "install" },
  },
  {
    item: { tr: "Zayıf akım işçilik (İstanbul)", en: "Low-voltage labour (Istanbul)" },
    need: { tr: "Yarım–1 gün, 2 kapı", en: "Half–1 day, 2 doors" },
    amount: "₺12.000–22.000",
    cadence: { tr: "kurulum", en: "install" },
  },
  {
    item: { tr: "Yazılım (sakin ücretsiz)", en: "Software (residents free)" },
    need: { tr: "Aidat cetveline yazılır", en: "Goes on the dues sheet" },
    amount: "₺45–75 / daire / ay",
    cadence: { tr: "abonelik", en: "subscription" },
  },
];

export const launchTotals = {
  tr: [
    { k: "Şirket + uyum, yıl 0", v: "₺180.000–350.000" },
    { k: "Lab + 10 kiosk stok (CIF)", v: "$4.500–6.500" },
    { k: "Bulut / mağaza, aylık işletme", v: "$150–400" },
    { k: "İlk 10 site kurulumu (işçilik hariç donanım)", v: "$8.000–12.000" },
    { k: "100 daire × ₺60/ay yazılım (yıl)", v: "₺72.000 / site / yıl" },
  ],
  en: [
    { k: "Company + compliance, year 0", v: "₺180,000–350,000" },
    { k: "Lab + 10 kiosk stock (CIF)", v: "$4,500–6,500" },
    { k: "Cloud / stores, monthly run-rate", v: "$150–400" },
    { k: "First 10 site installs (hardware, ex-labour)", v: "$8,000–12,000" },
    { k: "100 units × ₺60/mo software (year)", v: "₺72,000 / site / year" },
  ],
};
