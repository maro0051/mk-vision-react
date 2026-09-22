import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { config } from "../config";

const initialForm = {
  category: "cleaning",
  requestType: "quote",
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  cleaningService: "",
  cleaningFrequency: "",
  propertySize: "",
  cleaningDate: "",
  cleaningTime: "",
  cateringService: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  guestCount: "",
  budget: "",
  menuRequirements: "",
  message: "",
  agreement: false,
};

const text = {
  en: {
    title: "Request a Quote",
    subtitle: "Tell us what you need and we'll review your request.",
    service: "Service",
    details: "Details",
    detailsText: "Choose a service and tell us about the project.",
    information: "Your Information",
    informationText: "How can we contact you?",
    review: "Review",
    reviewText: "Check your request before submitting.",
    cleaning: "Cleaning Services",
    catering: "Event Catering",
    quote: "Request a Quote",
    booking: "Check Availability / Book",
    type: "Request Type",
    name: "Full Name",
    company: "Company / Organization",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address / Property Address",
    city: "City",
    postal: "Postal Code",
    cleaningService: "Cleaning Service",
    frequency: "Cleaning Frequency",
    size: "Approximate Property Size",
    date: "Preferred Date",
    time: "Preferred Time",
    cateringService: "Catering Service",
    eventType: "Event Type",
    venue: "Venue / Event Location",
    guests: "Number of Guests",
    budget: "Approximate Budget",
    menu: "Menu & Dietary Requirements",
    message: "Additional Requirements",
    agreement: "I confirm that the information provided is accurate and I agree to be contacted about this request.",
    back: "Back",
    continue: "Continue",
    submit: "Submit Request",
    success: "Request received",
    successText: "Thank you. Your request has been submitted successfully.",
    requestId: "Request ID",
    startOver: "Start a New Request",
    required: "Please complete the required fields before continuing.",
    sending: "Sending...",
    notConnected: "The form is ready, but Google Sheets has not been connected yet.",
  },
  fr: {
    title: "Demander un devis",
    subtitle: "Indiquez vos besoins et nous examinerons votre demande.",
    service: "Service",
    details: "Détails",
    detailsText: "Choisissez un service et indiquez les détails du projet.",
    information: "Vos informations",
    informationText: "Comment pouvons-nous vous joindre?",
    review: "Vérification",
    reviewText: "Vérifiez votre demande avant de l'envoyer.",
    cleaning: "Services de nettoyage",
    catering: "Traiteur événementiel",
    quote: "Demander un devis",
    booking: "Vérifier la disponibilité / Réserver",
    type: "Type de demande",
    name: "Nom complet",
    company: "Entreprise / Organisation",
    email: "Adresse courriel",
    phone: "Numéro de téléphone",
    address: "Adresse / Adresse de la propriété",
    city: "Ville",
    postal: "Code postal",
    cleaningService: "Service de nettoyage",
    frequency: "Fréquence de nettoyage",
    size: "Taille approximative de la propriété",
    date: "Date souhaitée",
    time: "Heure souhaitée",
    cateringService: "Service traiteur",
    eventType: "Type d'événement",
    venue: "Lieu de l'événement",
    guests: "Nombre d'invités",
    budget: "Budget approximatif",
    menu: "Menu et besoins alimentaires",
    message: "Besoins supplémentaires",
    agreement: "Je confirme que les informations fournies sont exactes et j'accepte d'être contacté au sujet de cette demande.",
    back: "Retour",
    continue: "Continuer",
    submit: "Envoyer la demande",
    success: "Demande reçue",
    successText: "Merci. Votre demande a été envoyée avec succès.",
    requestId: "Numéro de demande",
    startOver: "Nouvelle demande",
    required: "Veuillez remplir les champs obligatoires avant de continuer.",
    sending: "Envoi...",
    notConnected: "Le formulaire est prêt, mais Google Sheets n'est pas encore connecté.",
  },
};

function makeRequestId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(100 + Math.random() * 900);
  return `MKV-${stamp}-${random}`;
}

export default function Contact() {
  const { language } = useLanguage();
  const t = text[language];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [sending, setSending] = useState(false);

  const update = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  function validate() {
    if (step === 1) return Boolean(form.category && form.requestType);

    if (step === 2) {
      if (form.category === "cleaning") {
        return Boolean(form.cleaningService && form.cleaningDate);
      }

      return Boolean(
        form.cateringService &&
        form.eventDate &&
        form.venue &&
        form.guestCount
      );
    }

    if (step === 3) {
      return Boolean(form.name && form.email && form.phone);
    }

    return Boolean(form.agreement);
  }

  function next() {
    setError("");

    if (!validate()) {
      setError(t.required);
      return;
    }

    setStep((current) => Math.min(4, current + 1));
  }

  function back() {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (!validate()) {
      setError(t.required);
      return;
    }

    const id = makeRequestId();

    if (!config.googleAppsScriptUrl) {
      setError(t.notConnected);
      return;
    }

    setSending(true);

    try {
      await fetch(config.googleAppsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          requestId: id,
          ...form,
          language,
          submittedAt: new Date().toISOString(),
        }),
      });

      setRequestId(id);
      setSubmitted(true);
    } catch {
      setError(
        language === "fr"
          ? "Impossible d'envoyer la demande. Veuillez réessayer."
          : "We could not send the request. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setForm(initialForm);
    setStep(1);
    setError("");
    setSubmitted(false);
    setRequestId("");
  }

  if (submitted) {
    return (
      <section className="quote-page">
        <div className="quote-success">
          <div className="container">
            <div className="quote-success-card">
              <div className="quote-success-icon">
                <CheckCircle2 size={32} />
              </div>
              <h2>{t.success}</h2>
              <p>{t.successText}</p>
              <div className="request-id">
                {t.requestId}: {requestId}
              </div>
              <button className="btn btn-outline" onClick={reset}>
                {t.startOver}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quote-page">
      <div className="quote-hero">
        <div className="container">
          <div className="quote-eyebrow">MK VISION</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
      </div>

      <div className="quote-section">
        <div className="quote-container">
          <div className="quote-progress">
            {[
              [1, t.service],
              [2, t.details],
              [3, t.information],
              [4, t.review],
            ].map(([number, label]) => (
              <div
                key={number}
                className={`progress-step ${
                  step === number ? "active" : ""
                } ${step > number ? "completed" : ""}`}
              >
                <span>{number}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>

          {error && <div className="quote-error">{error}</div>}

          <form className="quote-form" onSubmit={submit}>
            {step === 1 && (
              <div className="quote-step">
                <StepHeading title={t.service} description={t.detailsText} />

                <div className="choice-grid">
                  <button
                    type="button"
                    className={`choice-card ${
                      form.category === "cleaning" ? "selected" : ""
                    }`}
                    onClick={() => update("category", "cleaning")}
                  >
                    <span className="choice-number">01</span>
                    <strong>{t.cleaning}</strong>
                    <span>
                      {language === "fr"
                        ? "Nettoyage commercial, bureaux et propriétés."
                        : "Commercial, office and property cleaning."}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`choice-card ${
                      form.category === "catering" ? "selected" : ""
                    }`}
                    onClick={() => update("category", "catering")}
                  >
                    <span className="choice-number">02</span>
                    <strong>{t.catering}</strong>
                    <span>
                      {language === "fr"
                        ? "Mariages, événements privés et corporatifs."
                        : "Weddings, private and corporate events."}
                    </span>
                  </button>
                </div>

                <div className="step-subsection">
                  <h3>{t.type}</h3>
                  <div className="request-type-grid">
                    <button
                      type="button"
                      className={`request-type ${
                        form.requestType === "quote" ? "selected" : ""
                      }`}
                      onClick={() => update("requestType", "quote")}
                    >
                      <strong>{t.quote}</strong>
                      <span>
                        {language === "fr"
                          ? "Recevoir une estimation pour votre projet."
                          : "Receive an estimate for your project."}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`request-type ${
                        form.requestType === "booking" ? "selected" : ""
                      }`}
                      onClick={() => update("requestType", "booking")}
                    >
                      <strong>{t.booking}</strong>
                      <span>
                        {language === "fr"
                          ? "Demander une disponibilité pour une date."
                          : "Ask about availability for a date."}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="quote-step">
                <StepHeading title={t.details} description={t.detailsText} />

                <div className="field-grid">
                  {form.category === "cleaning" ? (
                    <>
                      <Field label={t.cleaningService} required>
                        <select
                          value={form.cleaningService}
                          onChange={(e) =>
                            update("cleaningService", e.target.value)
                          }
                        >
                          <option value="">
                            {language === "fr" ? "Sélectionner..." : "Select..."}
                          </option>
                          {(language === "fr"
                            ? [
                                "Nettoyage commercial",
                                "Nettoyage de bureaux",
                                "Nettoyage après construction",
                                "Nettoyage d'immeubles",
                                "Nettoyage événementiel",
                                "Nettoyage ponctuel / récurrent",
                              ]
                            : [
                                "Commercial Cleaning",
                                "Office Cleaning",
                                "Post-Construction Cleaning",
                                "Building Cleaning",
                                "Event Cleaning",
                                "One-Time / Recurring Cleaning",
                              ]
                          ).map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label={t.frequency}>
                        <select
                          value={form.cleaningFrequency}
                          onChange={(e) =>
                            update("cleaningFrequency", e.target.value)
                          }
                        >
                          <option value="">
                            {language === "fr" ? "Sélectionner..." : "Select..."}
                          </option>
                          {(language === "fr"
                            ? [
                                "Ponctuel",
                                "Hebdomadaire",
                                "Bihebdomadaire",
                                "Mensuel",
                                "Personnalisé",
                              ]
                            : [
                                "One-time",
                                "Weekly",
                                "Biweekly",
                                "Monthly",
                                "Custom",
                              ]
                          ).map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label={t.size}>
                        <input
                          value={form.propertySize}
                          onChange={(e) =>
                            update("propertySize", e.target.value)
                          }
                          placeholder={
                            language === "fr"
                              ? "Ex. 2 500 pi²"
                              : "e.g. 2,500 sq ft"
                          }
                        />
                      </Field>

                      <Field label={t.date} required>
                        <input
                          type="date"
                          value={form.cleaningDate}
                          onChange={(e) =>
                            update("cleaningDate", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.time}>
                        <input
                          type="time"
                          value={form.cleaningTime}
                          onChange={(e) =>
                            update("cleaningTime", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.message} full>
                        <textarea
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder={
                            language === "fr"
                              ? "Ajoutez toute information utile..."
                              : "Add any additional information..."
                          }
                        />
                      </Field>
                    </>
                  ) : (
                    <>
                      <Field label={t.cateringService} required>
                        <select
                          value={form.cateringService}
                          onChange={(e) =>
                            update("cateringService", e.target.value)
                          }
                        >
                          <option value="">
                            {language === "fr" ? "Sélectionner..." : "Select..."}
                          </option>
                          {(language === "fr"
                            ? [
                                "Mariages",
                                "Anniversaires et événements privés",
                                "Événements corporatifs",
                                "Réceptions",
                                "Menus personnalisés",
                                "Personnel et nettoyage",
                              ]
                            : [
                                "Weddings",
                                "Birthdays & Private Events",
                                "Corporate Events",
                                "Receptions",
                                "Custom Menus",
                                "Service Staff & Cleanup",
                              ]
                          ).map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label={t.eventType}>
                        <input
                          value={form.eventType}
                          onChange={(e) =>
                            update("eventType", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.date} required>
                        <input
                          type="date"
                          value={form.eventDate}
                          onChange={(e) =>
                            update("eventDate", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.time}>
                        <input
                          type="time"
                          value={form.eventTime}
                          onChange={(e) =>
                            update("eventTime", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.venue} required>
                        <input
                          value={form.venue}
                          onChange={(e) => update("venue", e.target.value)}
                        />
                      </Field>

                      <Field label={t.guests} required>
                        <input
                          type="number"
                          min="1"
                          value={form.guestCount}
                          onChange={(e) =>
                            update("guestCount", e.target.value)
                          }
                        />
                      </Field>

                      <Field label={t.budget}>
                        <input
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          placeholder={
                            language === "fr" ? "Ex. 5 000 $" : "e.g. $5,000"
                          }
                        />
                      </Field>

                      <Field label={t.menu}>
                        <input
                          value={form.menuRequirements}
                          onChange={(e) =>
                            update("menuRequirements", e.target.value)
                          }
                          placeholder={
                            language === "fr"
                              ? "Allergies, préférences..."
                              : "Allergies, preferences..."
                          }
                        />
                      </Field>

                      <Field label={t.message} full>
                        <textarea
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                        />
                      </Field>
                    </>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="quote-step">
                <StepHeading
                  title={t.information}
                  description={t.informationText}
                />

                <div className="field-grid">
                  <Field label={t.name} required>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                    />
                  </Field>

                  <Field label={t.company}>
                    <input
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label={t.email} required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label={t.phone} required>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label={t.address} full>
                    <input
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      autoComplete="street-address"
                    />
                  </Field>

                  <Field label={t.city}>
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      autoComplete="address-level2"
                    />
                  </Field>

                  <Field label={t.postal}>
                    <input
                      value={form.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                      autoComplete="postal-code"
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="quote-step">
                <StepHeading title={t.review} description={t.reviewText} />

                <div className="review-grid">
                  <ReviewCard
                    title={t.service}
                    value={form.category === "cleaning" ? t.cleaning : t.catering}
                  />
                  <ReviewCard
                    title={t.type}
                    value={form.requestType === "quote" ? t.quote : t.booking}
                  />
                  <ReviewCard title={t.name} value={form.name} />
                  <ReviewCard title={t.email} value={form.email} />
                  <ReviewCard title={t.phone} value={form.phone} />
                  <ReviewCard
                    title={form.category === "cleaning" ? t.cleaningService : t.cateringService}
                    value={form.category === "cleaning" ? form.cleaningService : form.cateringService}
                  />
                  <ReviewCard
                    title={t.date}
                    value={form.category === "cleaning" ? form.cleaningDate : form.eventDate}
                  />
                  {form.category === "catering" && (
                    <ReviewCard title={t.venue} value={form.venue} />
                  )}
                  {form.category === "catering" && (
                    <ReviewCard title={t.guests} value={form.guestCount} />
                  )}
                  <div className="review-card review-message">
                    <h3>{t.message}</h3>
                    <p>{form.message || "—"}</p>
                  </div>
                </div>

                <div className="agreement">
                  <input
                    id="agreement"
                    type="checkbox"
                    checked={form.agreement}
                    onChange={(e) => update("agreement", e.target.checked)}
                  />
                  <label htmlFor="agreement">{t.agreement}</label>
                </div>
              </div>
            )}

            <div className="quote-actions">
              {step > 1 ? (
                <button type="button" className="btn btn-outline" onClick={back}>
                  <ArrowLeft size={17} /> {t.back}
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button type="button" className="btn btn-outline" onClick={next}>
                  {t.continue} <ArrowRight size={17} />
                </button>
              ) : (
                <button type="submit" className="btn btn-outline" disabled={sending}>
                  {sending ? t.sending : t.submit} <ArrowRight size={17} />
                </button>
              )}
            </div>
          </form>

          <div className="quote-contact-strip">
            <span><Phone size={14} /> {config.phone}</span>
            <span><Mail size={14} /> {config.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeading({ title, description }) {
  return (
    <div className="step-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Field({ label, required, full, children }) {
  return (
    <div className={`field ${full ? "field-full" : ""}`}>
      <label>
        {label} {required && <span>*</span>}
      </label>
      {children}
    </div>
  );
}

function ReviewCard({ title, value }) {
  return (
    <div className="review-card">
      <h3>{title}</h3>
      <p>{value || "—"}</p>
    </div>
  );
}
