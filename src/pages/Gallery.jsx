import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { galleryItems } from "../data";

export default function Gallery() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const fr = language === "fr";

  const items = galleryItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">MK VISION</div>
          <h1>{fr ? "Galerie" : "Gallery"}</h1>
          <p>{fr ? "Découvrez nos services de nettoyage et de traiteur." : "Explore our cleaning and catering services."}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {[
              ["all", fr ? "Tout" : "All"],
              ["cleaning", fr ? "Nettoyage" : "Cleaning"],
              ["catering", fr ? "Traiteur" : "Catering"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {items.map((item, index) => (
              <button
                key={`${item.type}-${index}`}
                className="gallery-item"
                onClick={() => setSelected(item)}
              >
                <img src={item.image} alt={item.title[language]} />
                <span>{item.title[language]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)}>
            <X />
          </button>
          <img
            src={selected.image}
            alt={selected.title[language]}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
