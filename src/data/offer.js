// All offer content in one place - edit prices / text here.
// Source: FWG pricing note + Dev bhai's voice brief (Nov 2026).

export const CONTACT = {
  phone: "8866842520",
  phoneDisplay: "+91 88668 42520",
  whatsapp: "918866842520",
};

export const whatsappLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;

export const BRANCHES = [
  {
    id: "adajan",
    name: "Adajan",
    address: "Time Square, Gaurav Path Road, TP 10 Main Rd, Opp. Shree Bharti Residency, Adajan, Surat, Gujarat 394510",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Fitness+With+Gomzi+Adajan+Surat",
  },
  {
    id: "vesu",
    name: "Vesu",
    address: "M-11 & 12, 2nd Floor, Safal Square, Opp. Prime Shoppers, Vesu, Rundh, Surat, Gujarat 395007",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Safal+Square+Vesu+Surat",
  },
  {
    id: "katargam",
    name: "Katargam",
    address: "GOMZI, 2 Abhushan Bungalows, Near Alkapuri Char Rasta, Shraddha Society, Katargam, Surat, Gujarat 395004",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gomzi+Consulting+Services+Katargam+Surat",
  },
];

// Gym Membership - gym access only, full year, Adajan branch only.
export const GYM_MEMBERSHIP = {
  id: "gym-membership",
  name: "Gym Membership",
  price: 15000,
  period: "1 year",
  tagline: "Full-year gym access. Train on your own, at your own pace.",
  branchNote: "Valid only at our Adajan branch",
  includes: ["Full gym access for 1 year", "All equipment & workout floor"],
  excludes: ["Diet plan", "Personal training", "Counselling"],
};

// RTP Program - phase based.
export const RTP_PHASES = [
  {
    id: "rtp-phase-1",
    phase: "Phase 1",
    name: "RTP Phase 1",
    duration: "21 days",
    price: 12000,
  },
  {
    id: "rtp-phase-2-3m",
    phase: "Phase 2",
    name: "RTP Phase 2 – 3 Months",
    duration: "3 months",
    price: 36000,
    emi: { months: 3, amount: 12000 },
  },
  {
    id: "rtp-phase-2-6m",
    phase: "Phase 2",
    name: "RTP Phase 2 – 6 Months",
    duration: "6 months",
    price: 54000,
    emi: { months: 6, amount: 9000 },
  },
];

// ₹24,000 guided plan - gym access + one-time diet & exercise plan + trainer guidance.
export const GUIDED_PLAN = {
  id: "trainer-dietician",
  name: "Gym Plan",
  price: 24000,
  tagline: "Gym access with a plan to follow and a trainer to ask.",
  includes: [
    "Gym access",
    "One-time diet consultation + diet plan",
    "One-time exercise plan",
    "Ask any trainer whenever you need help with a set or exercise",
  ],
};

// RTP column: inclusions as listed on the offline RTP program page on fggroup.in.
// null = not specified, shown as a dash.
export const COMPARISON = [
  { feature: "Price", membership: "₹15,000 / year", guided: "₹24,000", rtp: "From ₹12,000" },
  { feature: "Gym access", membership: true, guided: true, rtp: true },
  { feature: "Diet consultation & plan", membership: false, guided: "One time", rtp: "Updated every 15–20 days" },
  { feature: "Exercise plan", membership: false, guided: "One time", rtp: "Personalised" },
  { feature: "Trainer guidance", membership: false, guided: "Whenever you need", rtp: "Certified coach" },
  { feature: "Dietitian support", membership: false, guided: "One consultation", rtp: "Dedicated" },
  { feature: "Progress tracking & body analysis", membership: false, guided: false, rtp: true },
  { feature: "Personal training", membership: false, guided: false, rtp: null },
  { feature: "No-cost EMI", membership: false, guided: false, rtp: "Phase 2" },
  { feature: "Branch", membership: "Adajan only", guided: "All branches", rtp: "All branches" },
];

// Enquiry form -> fg-api contact inquiry. Shows in the FWG admin panel under Contact Inquiry
// (admin.fggroup.in/fwg/contact-inquiry/contact). The subject must start with "FWG Gym Offer":
// the API and the panel recognise these leads by it, whatever domain this page is hosted on.
export const API_BASE = (import.meta.env.VITE_API_URL || "https://api.fggroup.in").replace(/\/+$/, "");
export const INQUIRY_SUBJECT_PREFIX = "FWG Gym Offer";

// Every plan the form offers, in the order shown in the dropdown.
export const INQUIRY_PLANS = [
  GYM_MEMBERSHIP,
  GUIDED_PLAN,
  ...RTP_PHASES,
].map((plan) => ({ id: plan.id, label: `${plan.name} (${formatPrice(plan.price)})` }));
export const NOT_SURE_PLAN = { id: "not-sure", label: "Not sure yet – help me choose" };

export const FAQS = [
  {
    q: "Does the Gym Membership include a diet plan or personal training?",
    a: "No. The ₹15,000 Gym Membership is gym access only for 1 year – no diet, no personal training and no counselling. If you want guidance, choose the Gym Plan.",
  },
  {
    q: "Which branch can I use the Gym Membership at?",
    a: "The Gym Membership is valid only at our Adajan branch. It is not available at Vesu or Katargam.",
  },
  {
    q: "What do I get in the ₹24,000 Gym Plan?",
    a: "Gym access, a one-time diet consultation with a diet plan, a one-time exercise plan, and you can ask any trainer for help whenever you need it.",
  },
  {
    q: "Is EMI available?",
    a: "Yes. RTP Phase 2 is available on no-cost EMI: 3 months at ₹12,000/month or 6 months at ₹9,000/month.",
  },
  {
    q: "How do I join?",
    a: "Tap the WhatsApp or Call button on any plan. Our team will confirm your branch, plan and payment, and get you started.",
  },
];
