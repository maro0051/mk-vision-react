import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceDetail({ service, basePath }) {
  const { language } = useLanguage();
  const fr = language === "fr";

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-grid">
          <div>
            <Link className="back-link" to={basePath}>
              <ArrowLeft size={15} /> {fr ? "Retour" : "Back"}
            </Link>
            <div className="eyebrow">{service.shortTitle[language]}</div>
            <h1>{service.title[language]}</h1>
            <p>{service.details[language]}</p>
            <Link className="btn btn-dark" to="/contact">
              {fr ? "Demander un devis" : "Request a Quote"} <ArrowRight size={16} />
            </Link>
          </div>
          <img src={service.image} alt={service.title[language]} />
        </div>
      </section>

      <section className="section">
        <div className="container detail-bottom">
          <div>
            <div className="eyebrow">{fr ? "CE QUE NOUS OFFRONS" : "WHAT WE OFFER"}</div>
            <h2>{fr ? "Un service adapté à vos besoins." : "A service built around your needs."}</h2>
          </div>

          <div className="features">
            {service.features[language].map((feature) => (
              <div key={feature}>
                <CheckCircle2 size={18} />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
