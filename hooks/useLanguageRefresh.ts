import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function useLanguageRefresh() {
  const { currentLanguage } = useLanguage();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Force re-render when language changes
    forceUpdate({});
  }, [currentLanguage]);

  return currentLanguage;
}
