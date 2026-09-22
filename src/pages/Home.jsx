import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { cleaningServices, cateringServices } from "../data";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const { language } = useLanguage();
  const fr = language === "fr";

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="eyebrow">MK VISION</div>
          <h1>{fr ? "Propre. Élégant. Prêt pour l'occasion." : "Clean. Polished. Ready for the occasion."}</h1>
          <p>
            {fr
              ? "Services de nettoyage professionnels et traiteur événementiel pour les entreprises, propriétés et célébrations."
              : "Professional cleaning and event catering services for businesses, properties and celebrations."}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-dark" to="/contact">{fr ? "Demander un devis" : "Get a Quote"}</Link>
            <Link className="btn btn-light" to="/cleaning">{fr ? "Nos services" : "Our Services"}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">{fr ? "NOTRE VISION" : "OUR VISION"}</div>
            <h2>{fr ? "Deux services. Une seule vision de qualité." : "Two services. One standard of quality."}</h2>
          </div>
          <p>
            {fr
              ? "Nous combinons un nettoyage professionnel et un service traiteur événementiel flexible pour vous aider à créer des espaces propres et des événements mémorables."
              : "We combine professional cleaning and flexible event catering to help you create polished spaces and memorable occasions."}
          </p>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{fr ? "NETTOYAGE" : "CLEANING"}</div>
              <h2>{fr ? "Services de nettoyage" : "Cleaning Services"}</h2>
            </div>
            <Link to="/cleaning" className="text-link">
              {fr ? "Voir tous les services" : "View all services"} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="cards">
            {cleaningServices.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} basePath="/cleaning" language={language} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{fr ? "TRAITEUR" : "CATERING"}</div>
              <h2>{fr ? "Traiteur événementiel" : "Event Catering"}</h2>
            </div>
            <Link to="/catering" className="text-link">
              {fr ? "Voir tous les services" : "View all services"} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="cards">
            {cateringServices.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} basePath="/catering" language={language} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container home-cta">
          <div>
            <div className="eyebrow">{fr ? "PARLONS DE VOTRE PROJET" : "LET'S TALK ABOUT YOUR PROJECT"}</div>
            <h2>{fr ? "Besoin d'un devis?" : "Need a quote?"}</h2>
          </div>

          <div className="home-cta-points">
            <span><CheckCircle2 size={19} /> {fr ? "Réponse personnalisée" : "Personal response"}</span>
            <span><CheckCircle2 size={19} /> {fr ? "Service flexible" : "Flexible service"}</span>
          </div>

          <Link className="btn btn-dark" to="/contact">
            {fr ? "Commencer" : "Get started"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
