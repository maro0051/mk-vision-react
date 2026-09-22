import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceAreas() {
  const { language } = useLanguage();
  const fr = language === "fr";

  const areas = fr
    ? [
        ["Ottawa", "Ottawa et environs"],
        ["Gatineau", "Gatineau et environs"],
        ["Ontario", "Selon le projet"],
      ]
    : [
        ["Ottawa", "Ottawa and surrounding areas"],
        ["Gatineau", "Gatineau and surrounding areas"],
        ["Ontario", "Depending on the project"],
      ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">MK VISION</div>
          <h1>{fr ? "Zones desservies" : "Service Areas"}</h1>
          <p>{fr ? "Contactez-nous pour confirmer la disponibilité dans votre secteur." : "Contact us to confirm availability in your area."}</p>
        </div>
      </section>

      <section className="section">
        <div className="container area-grid">
          {areas.map(([name, description]) => (
            <div className="area-card" key={name}>
              <MapPin size={24} />
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
