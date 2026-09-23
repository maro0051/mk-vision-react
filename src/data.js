const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export const cleaningServices = [
  {
    slug: "commercial-cleaning",

    title: {
      en: "Commercial Cleaning",
      fr: "Nettoyage commercial",
    },

    shortTitle: {
      en: "Commercial",
      fr: "Commercial",
    },

    description: {
      en: "Professional cleaning solutions for commercial spaces of all sizes.",
      fr: "Solutions de nettoyage professionnelles pour les espaces commerciaux de toutes tailles.",
    },

    details: {
      en: "Keep your workplace clean, welcoming and ready for business with dependable commercial cleaning.",
      fr: "Gardez votre milieu de travail propre, accueillant et prêt pour les affaires grâce à un nettoyage commercial fiable.",
    },

    image: img("photo-1581578731548-c64695cc6952"),

    features: {
      en: [
        "Flexible schedules",
        "Professional team",
        "Quality-focused service",
      ],
      fr: [
        "Horaires flexibles",
        "Équipe professionnelle",
        "Service axé sur la qualité",
      ],
    },
  },

  {
    slug: "office-cleaning",

    title: {
      en: "Office Cleaning",
      fr: "Nettoyage de bureaux",
    },

    shortTitle: {
      en: "Office",
      fr: "Bureaux",
    },

    description: {
      en: "Clean, comfortable office environments for teams and clients.",
      fr: "Des bureaux propres et confortables pour vos équipes et vos clients.",
    },

    details: {
      en: "From workstations to shared areas, we help maintain a polished office environment.",
      fr: "Des postes de travail aux espaces communs, nous contribuons à maintenir un environnement de bureau impeccable.",
    },

    image: img("photo-1497366811353-6870744d04b2"),

    features: {
      en: [
        "Workstations",
        "Common areas",
        "Recurring service",
      ],
      fr: [
        "Postes de travail",
        "Espaces communs",
        "Service récurrent",
      ],
    },
  },

  {
    slug: "post-construction-cleaning",

    title: {
      en: "Post-Construction Cleaning",
      fr: "Nettoyage après construction",
    },

    shortTitle: {
      en: "Post-Construction",
      fr: "Après construction",
    },

    description: {
      en: "Detailed cleanup after renovations, construction and property improvements.",
      fr: "Nettoyage détaillé après rénovations, travaux et améliorations immobilières.",
    },

    details: {
      en: "Remove construction dust and debris so your newly completed space is ready to use.",
      fr: "Éliminez la poussière et les débris de construction afin que votre espace soit prêt à être utilisé.",
    },

    image: img("photo-1503387762-592deb58ef4e"),

    features: {
      en: [
        "Dust removal",
        "Detailed finishing",
        "Ready-to-use spaces",
      ],
      fr: [
        "Élimination de la poussière",
        "Finition détaillée",
        "Espaces prêts à utiliser",
      ],
    },
  },

  {
    slug: "building-cleaning",

    title: {
      en: "Building Cleaning",
      fr: "Nettoyage d'immeubles",
    },

    shortTitle: {
      en: "Building",
      fr: "Immeubles",
    },

    description: {
      en: "Reliable cleaning for multi-unit buildings and shared properties.",
      fr: "Nettoyage fiable pour les immeubles à logements multiples et propriétés communes.",
    },

    details: {
      en: "Maintain common areas and building spaces with a consistent cleaning plan.",
      fr: "Entretenez les espaces communs et les zones de l'immeuble avec un plan de nettoyage constant.",
    },

    image: img("photo-1486406146926-c627a92ad1ab"),

    features: {
      en: [
        "Common areas",
        "Flexible frequency",
        "Consistent standards",
      ],
      fr: [
        "Espaces communs",
        "Fréquence flexible",
        "Normes constantes",
      ],
    },
  },

  {
    slug: "event-cleaning",

    title: {
      en: "Event Cleaning",
      fr: "Nettoyage événementiel",
    },

    shortTitle: {
      en: "Events",
      fr: "Événements",
    },

    description: {
      en: "Before, during and after-event cleaning support.",
      fr: "Soutien au nettoyage avant, pendant et après vos événements.",
    },

    details: {
      en: "Keep event spaces presentable while your guests and team focus on the occasion.",
      fr: "Gardez vos espaces événementiels impeccables pendant que vos invités et votre équipe profitent de l'occasion.",
    },

    image: img("photo-1519167758481-83f550bb49b3"),

    features: {
      en: [
        "Pre-event setup cleaning",
        "During-event support",
        "Post-event cleanup",
      ],
      fr: [
        "Nettoyage avant l'événement",
        "Soutien pendant l'événement",
        "Nettoyage après l'événement",
      ],
    },
  },

  {
    slug: "one-time-recurring",

    title: {
      en: "One-Time & Recurring Cleaning",
      fr: "Nettoyage ponctuel ou récurrent",
    },

    shortTitle: {
      en: "One-Time / Recurring",
      fr: "Ponctuel / Récurrent",
    },

    description: {
      en: "Choose a one-time service or build a recurring cleaning schedule.",
      fr: "Choisissez un service ponctuel ou établissez un calendrier de nettoyage récurrent.",
    },

    details: {
      en: "We can adapt service frequency to your property's needs and schedule.",
      fr: "Nous pouvons adapter la fréquence du service aux besoins et à l'horaire de votre propriété.",
    },

    image: img("photo-1581578731548-c64695cc6952"),

    features: {
      en: [
        "One-time service",
        "Weekly options",
        "Custom schedules",
      ],
      fr: [
        "Service ponctuel",
        "Options hebdomadaires",
        "Horaires personnalisés",
      ],
    },
  },
];


export const cateringServices = [
  {
    slug: "weddings",

    title: {
      en: "Weddings",
      fr: "Mariages",
    },

    shortTitle: {
      en: "Weddings",
      fr: "Mariages",
    },

    description: {
      en: "Thoughtful catering for weddings and milestone celebrations.",
      fr: "Un service traiteur attentionné pour les mariages et grandes célébrations.",
    },

    details: {
      en: "Create a memorable wedding meal with flexible menu planning and event service.",
      fr: "Créez un repas de mariage mémorable grâce à une planification flexible et un service événementiel.",
    },

    image: "/images/catering/catering-1.jpg",

    features: {
      en: [
        "Custom menus",
        "Service staff",
        "Event cleanup",
      ],
      fr: [
        "Menus personnalisés",
        "Personnel de service",
        "Nettoyage événementiel",
      ],
    },
  },

  {
    slug: "birthdays-private-events",

    title: {
      en: "Birthdays & Private Events",
      fr: "Anniversaires et événements privés",
    },

    shortTitle: {
      en: "Private Events",
      fr: "Événements privés",
    },

    description: {
      en: "Catering for birthdays, family celebrations and private gatherings.",
      fr: "Service traiteur pour anniversaires, célébrations familiales et rassemblements privés.",
    },

    details: {
      en: "Plan food and service around your guest count, venue and celebration style.",
      fr: "Planifiez les repas et le service selon le nombre d'invités, le lieu et le style de votre célébration.",
    },

    image: "/images/catering/catering-2.jpg",

    features: {
      en: [
        "Flexible menus",
        "Guest-focused service",
        "Setup support",
      ],
      fr: [
        "Menus flexibles",
        "Service axé sur les invités",
        "Soutien à l'installation",
      ],
    },
  },

  {
    slug: "corporate-events",

    title: {
      en: "Corporate Events",
      fr: "Événements corporatifs",
    },

    shortTitle: {
      en: "Corporate",
      fr: "Corporatif",
    },

    description: {
      en: "Professional catering for meetings, corporate functions and teams.",
      fr: "Service traiteur professionnel pour réunions, fonctions corporatives et équipes.",
    },

    details: {
      en: "Keep corporate events organized with dependable food service and professional presentation.",
      fr: "Gardez vos événements corporatifs organisés grâce à un service alimentaire fiable et une présentation professionnelle.",
    },

    image: "/images/catering/catering-3.jpg",

    features: {
      en: [
        "Corporate menus",
        "Professional service",
        "Flexible timing",
      ],
      fr: [
        "Menus corporatifs",
        "Service professionnel",
        "Horaire flexible",
      ],
    },
  },

  {
    slug: "receptions",

    title: {
      en: "Receptions",
      fr: "Réceptions",
    },

    shortTitle: {
      en: "Receptions",
      fr: "Réceptions",
    },

    description: {
      en: "Food and service for receptions and special gatherings.",
      fr: "Repas et service pour réceptions et rassemblements spéciaux.",
    },

    details: {
      en: "Coordinate food service with the flow and schedule of your reception.",
      fr: "Coordonnez le service alimentaire avec le déroulement et l'horaire de votre réception.",
    },

    image: "/images/catering/catering-1.jpg",

    features: {
      en: [
        "Buffet options",
        "Plated service",
        "Cleanup support",
      ],
      fr: [
        "Options buffet",
        "Service à l'assiette",
        "Soutien au nettoyage",
      ],
    },
  },

  {
    slug: "custom-menus",

    title: {
      en: "Custom Menus",
      fr: "Menus personnalisés",
    },

    shortTitle: {
      en: "Custom Menus",
      fr: "Menus personnalisés",
    },

    description: {
      en: "Build a menu around your event, preferences and dietary needs.",
      fr: "Créez un menu selon votre événement, vos préférences et vos besoins alimentaires.",
    },

    details: {
      en: "Discuss your preferences and requirements so we can shape a menu for your occasion.",
      fr: "Discutez de vos préférences et besoins afin de créer un menu adapté à votre occasion.",
    },

    image: "/images/catering/catering-2.jpg",

    features: {
      en: [
        "Menu consultation",
        "Dietary requests",
        "Flexible options",
      ],
      fr: [
        "Consultation menu",
        "Demandes alimentaires",
        "Options flexibles",
      ],
    },
  },

  {
    slug: "service-staff-cleanup",

    title: {
      en: "Service Staff & Cleanup",
      fr: "Personnel et nettoyage",
    },

    shortTitle: {
      en: "Staff & Cleanup",
      fr: "Personnel et nettoyage",
    },

    description: {
      en: "Event staff and cleanup support to help your occasion run smoothly.",
      fr: "Personnel événementiel et soutien au nettoyage pour faciliter le déroulement de votre occasion.",
    },

    details: {
      en: "Add service staff and cleanup support so you can focus on your guests.",
      fr: "Ajoutez du personnel de service et du soutien au nettoyage pour vous concentrer sur vos invités.",
    },

    image: "/images/catering/catering-3.jpg",

    features: {
      en: [
        "Service staff",
        "Table support",
        "Post-event cleanup",
      ],
      fr: [
        "Personnel de service",
        "Soutien aux tables",
        "Nettoyage après événement",
      ],
    },
  },
];


export const galleryItems = [
  ...cleaningServices.map((service) => ({
    type: "cleaning",
    title: service.title,
    image: service.image,
  })),

  ...cateringServices.map((service) => ({
    type: "catering",
    title: service.title,
    image: service.image,
  })),
];