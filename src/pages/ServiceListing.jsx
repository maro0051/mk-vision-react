import { Link } from "react-router-dom";

import ServiceCard from "../components/ServiceCard";

import { useLanguage } from "../context/LanguageContext";

const cateringVideos = [
  "/video/video1.mp4",
  "/video/video2.mp4",
  "/video/video3.mp4",
  "/video/video4.mp4",
  "/video/video5.mp4",
  "/video/video6.mp4",
  "/video/video7.mp4",
];

export default function ServiceListing({
  type,
  services,
}) {
  const { language } = useLanguage();

  const fr = language === "fr";

  const cleaning = type === "cleaning";

  const catering = type === "catering";

  return (
    <>
      {/* =========================================
          PAGE HERO
      ========================================= */}

      <section className="page-hero">
        <div className="container">

          <div className="eyebrow">
            {cleaning
              ? "MK VISION CLEANING"
              : "MK VISION CATERING"}
          </div>

          <h1>
            {cleaning
              ? (
                fr
                  ? "Services de nettoyage"
                  : "Cleaning Services"
              )
              : (
                fr
                  ? "Traiteur événementiel"
                  : "Event Catering"
              )}
          </h1>

          <p>
            {cleaning
              ? (
                fr
                  ? "Des solutions de nettoyage professionnelles adaptées à vos besoins."
                  : "Professional cleaning solutions tailored to your needs."
              )
              : (
                fr
                  ? "Un service traiteur flexible pour vos mariages, événements privés et fonctions corporatives."
                  : "Flexible catering for weddings, private events and corporate functions."
              )}
          </p>

        </div>
      </section>


      {/* =========================================
          SERVICE CARDS
      ========================================= */}

      <section className="section">
        <div className="container">

          <div className="cards">

            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                basePath={
                  cleaning
                    ? "/cleaning"
                    : "/catering"
                }
                language={language}
              />
            ))}

          </div>

        </div>
      </section>


      {/* =========================================
          CATERING VIDEO GALLERY
      ========================================= */}

      {catering && (
        <section className="catering-video-section">
          <div className="container">

            <div className="catering-video-heading">

              <div className="eyebrow">
                {fr
                  ? "NOTRE TRAITEUR EN ACTION"
                  : "CATERING IN ACTION"}
              </div>

              <h2>
                {fr
                  ? "Découvrez notre service en images"
                  : "See Our Catering in Action"}
              </h2>

              <p>
                {fr
                  ? "Découvrez notre façon de créer des expériences culinaires mémorables."
                  : "Get a look at how we create memorable catering experiences."}
              </p>

            </div>


            <div className="catering-video-grid">

              {cateringVideos.map(
                (video, index) => (
                  <div
                    className="catering-video-card"
                    key={video}
                  >

                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    />

                    <div className="catering-video-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        </section>
      )}


      {/* =========================================
          CTA
      ========================================= */}

      <section className="simple-cta">
        <div className="container simple-cta-inner">

          <h2>
            {fr
              ? "Parlons de votre projet."
              : "Let's talk about your project."}
          </h2>

          <Link
            className="btn btn-dark"
            to="/contact"
          >
            {fr
              ? "Demander un devis"
              : "Request a Quote"}
          </Link>

        </div>
      </section>
    </>
  );
}