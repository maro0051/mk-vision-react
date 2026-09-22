import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceListing({ type, services }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const cleaning = type === "cleaning";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">{cleaning ? "MK VISION CLEANING" : "MK VISION CATERING"}</div>
          <h1>
            {cleaning
              ? (fr ? "Services de nettoyage" : "Cleaning Services")
              : (fr ? "Traiteur événementiel" : "Event Catering")}
          </h1>
          <p>
            {cleaning
              ? (fr ? "Des solutions de nettoyage professionnelles adaptées à vos besoins." : "Professional cleaning solutions tailored to your needs.")
              : (fr ? "Un service traiteur flexible pour vos mariages, événements privés et fonctions corporatives." : "Flexible catering for weddings, private events and corporate functions.")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                basePath={cleaning ? "/cleaning" : "/catering"}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="simple-cta">
        <div className="container simple-cta-inner">
          <h2>{fr ? "Parlons de votre projet." : "Let's talk about your project."}</h2>
          <Link className="btn btn-dark" to="/contact">{fr ? "Demander un devis" : "Request a Quote"}</Link>
        </div>
      </section>
    </>
  );
}
