import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const faqs = {
  en: [
    ["Do you offer recurring cleaning?", "Yes. We can discuss a recurring schedule based on your property and preferred frequency."],
    ["Can I request a one-time cleaning?", "Yes. One-time cleaning requests can be submitted through our quote form."],
    ["Do you cater corporate events?", "Yes. We offer catering options for corporate meetings, functions and events."],
    ["Can menus be customized?", "Yes. Tell us about your preferences and dietary requirements in your request."],
    ["How do I request a quote?", "Use the Get a Quote form and provide your service or event details."],
  ],
  fr: [
    ["Offrez-vous le nettoyage récurrent?", "Oui. Nous pouvons discuter d'un horaire récurrent selon votre propriété et votre fréquence préférée."],
    ["Puis-je demander un nettoyage ponctuel?", "Oui. Les demandes de nettoyage ponctuel peuvent être soumises via notre formulaire de devis."],
    ["Faites-vous du traiteur corporatif?", "Oui. Nous offrons des options de traiteur pour les réunions et événements corporatifs."],
    ["Les menus peuvent-ils être personnalisés?", "Oui. Indiquez vos préférences et besoins alimentaires dans votre demande."],
    ["Comment demander un devis?", "Utilisez le formulaire de demande de devis et indiquez les détails de votre service ou événement."],
  ],
};

export default function FAQ() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">MK VISION</div>
          <h1>FAQ</h1>
          <p>{language === "fr" ? "Réponses aux questions fréquentes." : "Answers to common questions."}</p>
        </div>
      </section>

      <section className="section">
        <div className="container faq">
          {faqs[language].map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <button onClick={() => setOpen(open === index ? null : index)}>
                {question}
                <ChevronDown className={open === index ? "rotate" : ""} size={19} />
              </button>
              {open === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
