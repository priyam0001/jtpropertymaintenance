// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE: this file is the client. For a new client, edit this file, replace
// public/images/*, and set brand colours in app/globals.css (@theme). See README.
// Every fact here came from the client; never invent reviews, stats or awards.
// ─────────────────────────────────────────────────────────────────────────────

const name = "J.T. Property Maintenance";
const city = "Barrie";
const phone = "705-721-9335";
const founded = 1995;

export const site = {
  name,
  shortName: "J.T.",
  wordmark: ["J.T. Property", "Maintenance"], // logo text, two lines on phones
  url: "https://www.jtpropertymaintenance.ca", // production domain: canonicals, sitemap, OG
  phone,
  phoneHref: "tel:+17057219335", // E.164, also used for JSON-LD
  email: "jtproperty@hotmail.com",
  founded,
  city,
  region: "Ontario",
  regionCode: "ON",
  country: "CA",
  area: `${city} & surrounding area`,
  tagline: "Bringing Out the Best in Your Property All Year Long",
  description: `Year-round landscaping and property maintenance in ${city} since ${founded}: grass cutting, spring and fall clean-ups, snow plowing, snow removal and salting for homes and businesses.`,
  footerLine: `Lawn care, landscaping & snow removal in ${city}, Ontario`,
  logo: { src: "/images/jt-logo.png", width: 433, height: 558 },
  ogImage: "/images/og.jpg", // 1200×630 JPG
  heroBadges: ["Residential & Commercial", "Free Estimates", "Year-Round Service"],
  hours: [
    { label: "Summer (April–October)", value: "Monday–Friday, 9:00 AM–5:00 PM" },
    { label: "Winter (November–March)", value: "Available 24/7" },
  ],
} as const;

// Set to null when the client has no award: every award block and award sentence on the site then disappears.
export type Award = { name: string; category: string; years: string; images: { src: string; alt: string }[] };
export const award: Award | null = {
  name: "Consumer Choice Award",
  category: "Lawn Maintenance",
  years: "2020 & 2026",
  images: [
    { src: "/images/award-2020.webp", alt: `2020 Consumer Choice Award letter for ${name}, Lawn Maintenance` },
    { src: "/images/award-2026.webp", alt: `2026 Consumer Choice Award certificate for ${name}, Lawn Maintenance, ${city}` },
  ],
};
const awardYears = award?.years.replace(" & ", " and ");
// " 2020 and 2026 Consumer Choice Award winner for Lawn Maintenance." or "" when there is no award.
const awardLine = award ? ` ${awardYears} ${award.name} winner for ${award.category}.` : "";

// SEO title + description per page (service pages have theirs in serviceDetails below).
export const pageMeta = {
  home: { title: `Property Maintenance ${city} | Lawn Care & Snow Removal | ${name}`, description: site.description },
  services: {
    title: `Landscaping & Property Maintenance Services ${city} | ${name}`,
    description: `Lawn maintenance, grass cutting, clean-ups, eavestrough cleaning, aeration, snow plowing, snow removal and salting in ${city}. Residential and commercial. Free estimates.`,
  },
  about: {
    title: `About Us | ${city} Property Maintenance Since ${founded} | ${name}`,
    description: `${name} has served ${city} since ${founded} with year-round lawn care, landscaping and snow removal.${awardLine}`,
  },
  contact: {
    title: `Contact Us | Free Quote | ${name} ${city}`,
    description: `Request a free estimate for lawn care, clean-ups or snow removal in ${city}. Call ${phone} or send us a message.`,
  },
};

export const heroSlides = [
  { image: "/images/lawn-residential.webp", label: "Lawn & Garden Care", alt: `Freshly striped lawn in front of a ${city} home` },
  { image: "/images/plow-trucks-commercial.webp", label: "Snow Plowing & Removal", alt: `${name} plow trucks in a cleared commercial lot at night` },
];

export const nav = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/snow-removal-barrie", label: "Snow Plowing & Removal" },
      { href: "/services/lawn-care-barrie", label: "Lawn Care & Grass Cutting" },
      { href: "/services/spring-fall-cleanup-barrie", label: "Spring & Fall Clean-Ups" },
      { href: "/services", label: "All Services" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const quoteServices = [
  "Snow plowing & removal",
  "Salting & ice control",
  "Lawn maintenance & grass cutting",
  "Spring & fall clean-up",
  "Landscaping & gardens",
  "Other",
] as const;

export type ServiceCard ={ title: string; text: string; image: string; href: string };

export const serviceCards: ServiceCard[] = [
  {
    title: "Snow Plowing & Removal",
    text: "Residential and commercial plowing for driveways, parking lots and sidewalks, on monthly to annual contracts.",
    image: "/images/plow-trucks-commercial.webp",
    href: "/services/snow-removal-barrie",
  },
  {
    title: "Salting & Ice Control",
    text: "Salting once the snow is cleared, so ice doesn't build up and your property stays safe for visitors and customers.",
    image: "/images/tractor-snowblower.webp",
    href: "/services/snow-removal-barrie#salting",
  },
  {
    title: "Lawn Maintenance & Grass Cutting",
    text: "Regular grass cutting and lawn care for homes and businesses, with every clipping picked up before we leave.",
    image: "/images/lawn-residential.webp",
    href: "/services/lawn-care-barrie",
  },
  {
    title: "Spring & Fall Clean-Ups",
    text: "Leaves, sticks, debris and yard waste cleared away each season, including large-quantity leaf removal.",
    image: "/images/lawn-crew.webp",
    href: "/services/spring-fall-cleanup-barrie",
  },
];

export const seasonal = {
  warm: [
    "Lawn maintenance",
    "Grass cutting",
    "Landscaping",
    "Fertilizing",
    "Garden creation and care",
    "Spring and fall clean-ups",
    "Eavestrough cleaning",
    "Planting",
    "Thatching",
    "Debris removal",
    "Large-quantity leaf removal",
    "Aeration",
    "Overseeding",
    "Yard waste pickup",
  ],
  winter: ["Snow plowing", "Snow removal", "Salting and ice control", "Residential and commercial properties"],
};

export const faqs = [
  {
    q: "Do you service commercial lots?",
    a: "Yes. We plow and clear parking lots, driveways and sidewalks for commercial properties, and we cut grass and maintain grounds for businesses as well as homes.",
  },
  {
    q: "What contract types do you offer?",
    a: "Annual, seasonal, monthly and one-time contracts are all available, so you can book a single clean-up or hand us the whole year.",
  },
  {
    q: "Do you salt after plowing?",
    a: "Yes. We offer salting once snow removal is finished to stop ice from building up, keeping your property safe for visitors and customers.",
  },
  {
    q: "Which areas do you serve?",
    a: `We serve ${city} and the surrounding area. Give us a call and we'll confirm we cover your property.`,
  },
  {
    q: "Are estimates free?",
    a: `Yes, every estimate is free. Call ${phone} or send us a message and we'll get back to you with a quote.`,
  },
];

export type ServiceDetail = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  gallery: string[];
  intro: string[];
  includesTitle: string;
  includes: string[];
  note: { id?: string; title: string; text: string };
  hours: string;
  snow?: boolean; // falling-snow effect on the page header
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "snow-removal-barrie",
    title: `Snow Plowing & Removal in ${city}`,
    metaTitle: `Snow Removal ${city} | Plowing & Salting | J.T. Property Maintenance`,
    metaDescription:
      `Residential and commercial snow plowing, snow removal and salting in ${city}. Monthly, seasonal and annual contracts, available 24/7 all winter. Free estimates: ${phone}.`,
    image: "/images/plow-trucks-commercial.webp",
    gallery: ["/images/tractor-snowblower.webp", "/images/jt-truck.webp"],
    intro: [
      `Winter is coming, so make sure you're prepared. The last thing you want in your morning routine is time spent shovelling your driveway. J.T. Property Maintenance provides residential and commercial snow plowing in ${city} so you never have to worry about being snowed in.`,
      "Our team has the equipment for quick, effective plowing and snow removal from parking lots, driveways, sidewalks and more. We work on monthly, seasonal or annual contracts, and one-time visits are available too.",
    ],
    includesTitle: "Winter services",
    includes: [
      "Snow plowing for driveways and parking lots",
      "Snow removal from sidewalks and walkways",
      "Salting and ice control",
      "Residential and commercial properties",
      "Monthly, seasonal, annual or one-time contracts",
    ],
    note: {
      id: "salting",
      title: "Salting & ice control",
      text: "Once the snow is cleared, we salt to prevent ice from building up, so your property stays safe for visitors and customers.",
    },
    hours: "Winter hours (November–March): available 24/7",
    snow: true,
  },
  {
    slug: "lawn-care-barrie",
    title: `Lawn Care & Grass Cutting in ${city}`,
    metaTitle: `Lawn Care ${city} | Grass Cutting & Lawn Maintenance | J.T. Property Maintenance`,
    metaDescription:
      `Grass cutting and lawn maintenance in ${city} for homes and businesses. Fertilizing, aeration, overseeding and thatching.${awardLine} Free estimates.`,
    image: "/images/lawn-residential.webp",
    gallery: ["/images/lawn-commercial.webp", "/images/jt-truck.webp"],
    intro: [
      "You have a busy schedule, and yard work is the last thing you want to spend your time off on. After a hectic week, let our team take care of the time-consuming lawn chores and keep your yard clean and orderly every visit.",
      `We cut grass for residential and commercial properties and pick up all clippings, leaves and other yard waste, so your yard and driveway are left in pristine condition.${award ? ` ${name} won the ${awardYears} ${award.name} in the ${award.category} category.` : ""}`,
    ],
    includesTitle: "Lawn services",
    includes: [
      "Grass cutting and lawn maintenance",
      "Fertilizing",
      "Aeration and overseeding",
      "Thatching",
      "Clippings and yard waste picked up",
      "Residential and commercial properties",
    ],
    note: {
      title: "On time, every time",
      text: "We arrive when you need us and follow your schedule. You never have to wait around for our crew to show up.",
    },
    hours: "Summer hours (April–October): Monday–Friday, 9:00 AM–5:00 PM",
  },
  {
    slug: "spring-fall-cleanup-barrie",
    title: `Spring & Fall Clean-Ups in ${city}`,
    metaTitle: `Spring & Fall Clean-Up ${city} | Leaf Removal | J.T. Property Maintenance`,
    metaDescription:
      `Spring and fall yard clean-ups in ${city}: large-quantity leaf removal, debris removal, eavestrough cleaning and yard waste pickup. One-time or seasonal contracts. Free estimates.`,
    image: "/images/lawn-crew.webp",
    gallery: ["/images/stone-walkway.webp", "/images/steps-after.webp"],
    intro: [
      "We take care of the leaves, debris, sticks and other yard clutter that builds up every season. Whether your property needs a spring refresh or a fall clear-out before the snow arrives, our crew leaves it clean and ready.",
      "No job is too big or too small for our experienced staff, and we work on your schedule. Book a one-time clean-up or add it to a seasonal contract.",
    ],
    includesTitle: "Clean-up services",
    includes: [
      "Spring and fall clean-ups",
      "Large-quantity leaf removal",
      "Debris and branch removal",
      "Eavestrough cleaning",
      "Garden bed care and planting",
      "Yard waste pickup",
    ],
    note: {
      title: "Debris hauled away",
      text: "Need debris hauled away after a renovation? Call us and we'll make sure your property meets your standards for quality and appearance.",
    },
    hours: "Summer hours (April–October): Monday–Friday, 9:00 AM–5:00 PM",
  },
];
