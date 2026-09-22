import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("mkvision-language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("mkvision-language", language);
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === "en" ? "fr" : "en"));
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
