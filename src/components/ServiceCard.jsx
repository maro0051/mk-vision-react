import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, basePath, language }) {
  return (
    <article className="service-card">
      <img src={service.image} alt={service.title[language]} />
      <div className="service-card-content">
        <div className="service-card-tag">{service.shortTitle[language]}</div>
        <h3>{service.title[language]}</h3>
        <p>{service.description[language]}</p>
        <Link to={`${basePath}/${service.slug}`} className="service-link">
          {language === "fr" ? "En savoir plus" : "Learn more"}
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
