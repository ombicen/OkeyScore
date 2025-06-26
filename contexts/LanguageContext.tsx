import { setLanguage, type Language } from "@/constants/Translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ku");

  // Load saved language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (
          savedLanguage &&
          (savedLanguage === "ku" || savedLanguage === "en")
        ) {
          setCurrentLanguage(savedLanguage as Language);
          setLanguage(savedLanguage as Language);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (language: Language) => {
    try {
      await AsyncStorage.setItem("language", language);
      setCurrentLanguage(language);
      setLanguage(language);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
