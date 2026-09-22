import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  const fr = language === "fr";

  const points = fr
    ? ["Service professionnel", "Solutions flexibles", "Attention aux détails"]
    : ["Professional service", "Flexible solutions", "Attention to detail"];

  return (
    <>
      <section className="page-hero about-hero">
        <div className="container">
          <div className="eyebrow">MK VISION</div>
          <h1>{fr ? "À propos de nous" : "About MK Vision"}</h1>
          <p>{fr ? "Une approche professionnelle, flexible et orientée vers la qualité." : "A professional, flexible and quality-focused approach."}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-bottom">
          <div>
            <div className="eyebrow">{fr ? "NOTRE VISION" : "OUR VISION"}</div>
            <h2>{fr ? "Créer des espaces et des événements dont les clients sont fiers." : "Create spaces and events clients can be proud of."}</h2>
          </div>

          <div className="features">
            {points.map((point) => (
              <div key={point}><CheckCircle2 size={18} /> {point}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
