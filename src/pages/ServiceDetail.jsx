import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

export default function ServiceDetail({
  service,
  basePath,
}) {
  const { language } = useLanguage();
  const fr = language === "fr";

  const isCatering = basePath === "/catering";

  return (
    <>
      {/* =========================================
          DETAIL HERO
      ========================================= */}

      <section className="detail-hero">
        <div className="container detail-grid">

          <div>
            <Link
              className="back-link"
              to={basePath}
            >
              <ArrowLeft size={15} />

              {fr ? "Retour" : "Back"}
            </Link>

            <div className="eyebrow">
              {service.shortTitle[language]}
            </div>

            <h1>
              {service.title[language]}
            </h1>

            <p>
              {service.details[language]}
            </p>

            <Link
              className="btn btn-dark"
              to="/contact"
            >
              {fr
                ? "Demander un devis"
                : "Request a Quote"}

              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="detail-hero-media">

            <img
              src={service.image}
              alt={service.title[language]}
            />

          </div>

        </div>
      </section>


      {/* =========================================
          CATERING SERVICE VIDEO
      ========================================= */}

      {isCatering && service.video && (
        <section className="catering-service-video-section">
          <div className="container">

            <div className="catering-service-video-heading">
              <div className="eyebrow">
                {fr
                  ? "NOTRE SERVICE EN ACTION"
                  : "OUR SERVICE IN ACTION"}
              </div>

              <h2>
                {fr
                  ? `${service.title.fr} en action`
                  : `${service.title.en} in Action`}
              </h2>

              <p>
                {fr
                  ? "Découvrez notre service traiteur en action."
                  : "Take a look at our catering service in action."}
              </p>
            </div>

            <div className="catering-service-video">
              <video
                src={service.video}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

          </div>
        </section>
      )}


      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="section">
        <div className="container detail-bottom">

          <div>
            <div className="eyebrow">
              {fr
                ? "CE QUE NOUS OFFRONS"
                : "WHAT WE OFFER"}
            </div>

            <h2>
              {fr
                ? "Un service adapté à vos besoins."
                : "A service built around your needs."}
            </h2>
          </div>

          <div className="features">

            {service.features[language].map(
              (feature) => (
                <div key={feature}>

                  <CheckCircle2 size={18} />

                  {feature}

                </div>
              )
            )}

          </div>

        </div>
      </section>
    </>
  );
}