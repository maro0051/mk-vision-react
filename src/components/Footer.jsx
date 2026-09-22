import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config";

export default function Footer() {
  const { language } = useLanguage();
  const fr = language === "fr";

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span>MK</span> <strong>VISION</strong>
          </div>
          <p>
            {fr
              ? "Services de nettoyage professionnels et traiteur événementiel."
              : "Professional cleaning services and event catering."}
          </p>
        </div>

        <div>
          <h4>{fr ? "Services" : "Services"}</h4>
          <Link to="/cleaning">{fr ? "Nettoyage" : "Cleaning"}</Link>
          <Link to="/catering">{fr ? "Traiteur" : "Catering"}</Link>
          <Link to="/gallery">{fr ? "Galerie" : "Gallery"}</Link>
        </div>

        <div>
          <h4>{fr ? "Entreprise" : "Company"}</h4>
          <Link to="/about">{fr ? "À propos" : "About"}</Link>
          <Link to="/service-areas">{fr ? "Zones desservies" : "Service Areas"}</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div>
          <h4>{fr ? "Contact" : "Contact"}</h4>
          <a href={`tel:${config.phone}`}><Phone size={14} /> {config.phone}</a>
          <a href={`mailto:${config.email}`}><Mail size={14} /> {config.email}</a>
        </div>
      </div>

      <div className="container footer-bottom">
        © {new Date().getFullYear()} {config.businessName}.{" "}
        {fr ? "Tous droits réservés." : "All rights reserved."}
      </div>
    </footer>
  );
}
