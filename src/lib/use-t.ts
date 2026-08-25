import { messages, type Lang, type Messages } from "./i18n";
import { useKorku } from "./store";

export function useT(): { t: Messages; lang: Lang; setLang: (l: Lang) => void } {
  const lang = useKorku((s) => s.lang);
  const setLang = useKorku((s) => s.setLang);
  return { t: messages[lang], lang, setLang };
}
