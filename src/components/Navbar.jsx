import { useState } from "react";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const text = {
  en: {
    home: "Home",
    cleaning: "Cleaning Services",
    catering: "Event Catering",
    gallery: "Gallery",
    about: "About",
    areas: "Service Areas",
    faq: "FAQ",
    contact: "Contact",
    quote: "Get a Quote",
    dark: "Dark Mode",
    light: "Light Mode",
  },
  fr: {
    home: "Accueil",
    cleaning: "Services de nettoyage",
    catering: "Traiteur événementiel",
    gallery: "Galerie",
    about: "À propos",
    areas: "Zones desservies",
    faq: "FAQ",
    contact: "Contact",
    quote: "Demander un devis",
    dark: "Mode sombre",
    light: "Mode clair",
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = text[language];

  const links = [
    ["/", t.home],
    ["/cleaning", t.cleaning],
    ["/catering", t.catering],
    ["/gallery", t.gallery],
    ["/about", t.about],
    ["/service-areas", t.areas],
    ["/faq", t.faq],
    ["/contact", t.contact],
  ];

  return (
    <header className="site-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-main">MK</span>
          <span className="brand-name">VISION</span>
        </Link>

        <nav className="desktop-nav">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-right">
          <button className="navbar-icon-button" onClick={toggleLanguage}>
            <Globe size={16} />
            {language.toUpperCase()}
          </button>

          <button className="navbar-icon-button theme-button" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <Link to="/contact" className="navbar-quote">
            {t.quote}
          </Link>

          <button className="mobile-menu-button" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <div className="mobile-nav-bottom">
            <button className="mobile-setting-button" onClick={toggleLanguage}>
              <Globe size={17} />
              {language === "en" ? "Français" : "English"}
            </button>

            <button className="mobile-setting-button" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
              {theme === "light" ? t.dark : t.light}
            </button>

            <Link to="/contact" className="mobile-quote" onClick={() => setOpen(false)}>
              {t.quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
