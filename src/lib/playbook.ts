export type PlayStep = {
  when: { tr: string; en: string };
  title: { tr: string; en: string };
  body: { tr: string; en: string };
};

export const playSteps: PlayStep[] = [
  {
    when: { tr: "Bugün", en: "Today" },
    title: { tr: "Talep al. Satış konuş. Ürün dinle.", en: "Take demand. Talk. Listen." },
    body: {
      tr: "ButterflyMX önce teklif formu açtı, sonra Çin’den kiosk bekledi. Biz de öyle: Teklif al açık. Her form bir keşif — apartman mı, AVM mi, şantiye mi, kaç kapı.",
      en: "ButterflyMX opened a quote form before the kiosk landed from China. Same here. Every form is a survey: apartment, mall, jobsite, how many doors.",
    },
  },
  {
    when: { tr: "30 gün", en: "30 days" },
    title: { tr: "Lab kapı. PWA. WhatsApp.", en: "Lab door. PWA. WhatsApp." },
    body: {
      tr: "İlk 5–10 kapı: hazır Android panel + röle + PoE, üstüne Look yazılımı. Kullanıcı uygulaması tarayıcıda ve ana ekrana eklenir. İndirmeyen sakin WhatsApp’tan açar. OEM kalıbı paralel yürür, beklenmez.",
      en: "First 5–10 doors: off-the-shelf Android panel + relay + PoE, Look software on top. The user app is the site, added to the home screen. Residents who will not install open via WhatsApp. OEM tooling runs in parallel — we do not wait for it.",
    },
  },
  {
    when: { tr: "90 gün", en: "90 days" },
    title: { tr: "Bir ücretli site. Native sarmal. Tek montajcı.", en: "One paid site. Native wrap. One installer." },
    body: {
      tr: "80–120 dairelik ilk aidatlı kurulum. Aynı React arayüz Capacitor ile iOS ve Android’e girer — kilit ekranda çağrı için. İstanbul’da bir zayıf akım ortağı, bayi ağı değil.",
      en: "First dues-paying install, 80–120 units. The same React UI wraps in Capacitor for iOS and Android — so a door call can ring the lock screen. One low-voltage partner in Istanbul, not a dealer network.",
    },
  },
  {
    when: { tr: "180 gün", en: "180 days" },
    title: { tr: "Kendi kiosk. Look 8 / 12. Aidat faturası.", en: "Own kiosk. Look 8 / 12. Dues invoice." },
    body: {
      tr: "Dragonwing + kilit MCU, KorkuLook fascias. Cihaz kaydı, OTA, ₺/daire e-fatura. O zaman bayi. Ondan önce stok ve sahte ‘ulusal ağ’ yok.",
      en: "Dragonwing + lock MCU, KorkuLook fascia. Device registry, OTA, ₺-per-unit e-invoice. Dealers after that. No fake national network before stock exists.",
    },
  },
];

export const playTracks = [
  {
    t: { tr: "Talep", en: "Demand" },
    d: {
      tr: "Evet — şimdi. Form gerçek. Cevap aynı gün. İlk 20 talep karışımı gösterir; donanım siparişi ondan sonra.",
      en: "Yes — now. The form is live. Same-day reply. The first 20 requests show the mix; hardware POs follow that, not the other way around.",
    },
  },
  {
    t: { tr: "Uygulama", en: "App" },
    d: {
      tr: "Evet, Android ve iOS yapılır. Bugün bu site PWA. Native şart olan tek şey: telefon kilitliyken kapı çağrısı (CallKit / FCM). Bunu ilk sakinler kapıya gelince yazarız, sıfırdan değil — mevcut ekranlar sarmalanır.",
      en: "Yes, Android and iOS. Today this site is the PWA. The one reason to go native: a door call while the phone is locked (CallKit / FCM). We wrap these same screens when the first residents stand at a real door — not from scratch.",
    },
  },
  {
    t: { tr: "Donanım", en: "Hardware" },
    d: {
      tr: "İki hat, aynı yazılım. Lab: tablet + röle (haftalar). OEM: Dragonwing çift beyin (çeyrek). İlk pilot asla kalıbı beklemez. Kilit her zaman ayrı MCU’da — Linux donarsa PIN yine çalışır.",
      en: "Two tracks, one software. Lab: tablet + relay (weeks). OEM: Dragonwing dual-brain (a quarter). The first pilot never waits on a mould. The lock always sits on a separate MCU — PIN still works if Linux stalls.",
    },
  },
];

export const playVs = [
  {
    them: { tr: "Önce ABD sitesi, sonra kiosk", en: "US site first, kiosk second" },
    us: { tr: "Önce TR talep, lab kapı 30 gün", en: "TR demand first, lab door in 30 days" },
  },
  {
    them: { tr: "Native uygulama şart (CallKit)", en: "Native app required (CallKit)" },
    us: { tr: "PWA + WhatsApp şimdi, native ilk sitede", en: "PWA + WhatsApp now, native at first site" },
  },
  {
    them: { tr: "Kendi Android kiosk, Çin üretim", en: "Own Android kiosk, China build" },
    us: { tr: "Lab tablet, sonra kendi Dragonwing OEM", en: "Lab tablet, then own Dragonwing OEM" },
  },
  {
    them: { tr: "Bayi / tesisatçı ağı", en: "Dealer / installer network" },
    us: { tr: "Tek İstanbul montajcı, sonra bayi", en: "One Istanbul installer, dealers later" },
  },
  {
    them: { tr: "Dolar / kapı + yıllık yazılım", en: "USD per door + annual software" },
    us: { tr: "Donanım bir kez, ₺/daire/ay aidata", en: "Hardware once, ₺/unit/month on dues" },
  },
];
