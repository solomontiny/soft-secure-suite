export const SITE = {
  name: "Naingate Insurance Brokers",
  short: "Naingate",
  tagline: "Africa's pro-active, digital-led insurance broker.",
  email: "info@naingateinsurancebrokers.com",
  whatsapp: "+2348023164341",
  phone: "+234 802 316 4341",
  addresses: [
    { city: "Lagos (Head Office)", line: "1, Olorunfunmi Street, Off Association Avenue, Ilupeju, Lagos, Nigeria." },
  ],
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/claims", label: "Claims" },
  { to: "/partners", label: "Partners" },
  { to: "/sponsorship", label: "Sponsorship" },
  { to: "/contact", label: "Contact" },
] as const;

export const PRODUCTS = [
  { slug: "motor", name: "Motor Insurance", icon: "Car",
    short: "Comprehensive cover for private and commercial vehicles.",
    full: "Compensation for accidents, vandalism, fire, theft and bodily damage. Covers private saloons, jeeps, trucks and heavy duty vehicles, with third-party liability up to ₦60m." },
  { slug: "property", name: "Property Insurance", icon: "Building2",
    short: "Fire, special perils, burglary and all-risk for valuables.",
    full: "Fire and allied perils, burglary, accidental damage, legal liability towards the public, and all-risk cover for selected valuable items." },
  { slug: "engineering", name: "Engineering Insurance", icon: "HardHat",
    short: "Protection for plant, machinery and electronic equipment.",
    full: "Plant All Risk (PAR), Contractors All Risks (CAR), Electronic Equipment and Machinery Breakdown policies for projects in extreme working conditions." },
  { slug: "special-risk", name: "Special Risk Insurance", icon: "ShieldAlert",
    short: "Marine, aviation and bond cover for complex exposures.",
    full: "Marine cargo and hull, aviation tailored to aircraft operations, and bonds for contractual and statutory obligations." },
  { slug: "agric", name: "Agric Insurance", icon: "Sprout",
    short: "Indemnity for farms, crops, livestock and equipment.",
    full: "Cover against fire, flood, windstorm, lightning, earthquake and more for farm produce, poultry, fish, livestock and farm machinery." },
  { slug: "life", name: "Life & Personal Insurance", icon: "HeartPulse",
    short: "Keyman, savings, education, mortgage and travel plans.",
    full: "Protection and savings products for individuals and businesses — Keyman, education, savings, mortgage protection and travel insurance." },
  { slug: "liability", name: "Liability Insurance", icon: "Scale",
    short: "Public, professional and occupiers liability cover.",
    full: "Occupiers liability, group personal accident, public liability and professional indemnity for organisations and professionals." },
  { slug: "pecuniary", name: "Pecuniary Insurance", icon: "Banknote",
    short: "Fidelity, money and financial loss protection.",
    full: "Mortgage protection, fidelity guarantee, money-in-transit and other pecuniary covers for businesses." },
] as const;

export const BOARD = [
  { name: "Ayo Abinna", role: "Chairman, Board of Directors" },
  { name: "Amb. Dr. Olubukola Abitoye", role: "Executive Director" },
  { name: "Kayode Adeoye", role: "Managing Director" },
  { name: "Dr. (Mrs.) Adeyinka Olumayowa", role: "Non-Executive Director" },
];

export const MANAGEMENT = [
  { name: "Olubukola Abitoye", role: "Group CEO" },
  { name: "Lawrence Sunday Ojebode", role: "Executive Director" },
  { name: "Kayode Adeoye", role: "Managing Director" },
  { name: "Gabriel Egwuatu", role: "Group COO" },
  { name: "Ifeoma Isinguzo", role: "Head, Human Resources" },
  { name: "Ezekiel Olabode", role: "Head, Risk & Control" },
  { name: "Joseph Folarin", role: "Legal Officer" },
];

export const PARTNERS = [
  "Nigerian Shippers' Council",
  "Lagos State Government",
  "Ogun State Government",
  "Keystone Bank",
  "Iron Resources",
  "Federal Ministry of Works",
  "NNPC Retail",
  "Dangote Group",
];

export const VALUES = [
  "Best combination of cover, tailored to your needs at competitive rates",
  "Insurance audit, recommendation and advice",
  "Prompt claims settlement",
  "Personalised insurance services & consultancies",
  "Underwriter selection based on strengths and weaknesses",
];

export const FAQ = [
  { q: "How quickly are claims settled?", a: "We act as your advocate with the underwriter. Most straightforward claims are settled within 14 working days of complete documentation." },
  { q: "Are you regulated?", a: "Yes — Naingate is registered with NAICOM and the Nigerian Council of Registered Insurance Brokers (NCRIB)." },
  { q: "Can I get a tailored corporate package?", a: "Absolutely. We design bespoke risk programmes for corporates, government and SMEs after a free risk audit." },
  { q: "Do you cover individuals or only businesses?", a: "Both. From motor and travel for individuals to large corporate engineering and special-risk programmes." },
];

export const SPONSORSHIP = {
  title: "Sponsorship Proposal for Live Recording",
  beneficiary: "The Living Sacrifice Choir, RCCG General Assembly",
  date: "18 July, 2026",
  letterDate: "12 April, 2026",
  vision:
    "A vision-driven project aimed at creating a spirit-filled and impactful worship experience — reaching and uplifting souls through music, in alignment with Vision 2032.",
  budget: "₦7,000,000 (Seven Million Naira only)",
  coverage: [
    "Professional audio and video recordings",
    "Studio setup",
    "Music promotion",
    "Event logistics and organisation",
  ],
  contacts: [
    { name: "Min. Damilola", phone: "+234 813 779 6415" },
    { name: "Sis. Osibanjo Olamide", role: "Choir Director" },
  ],
  account: {
    name: "Osibanjo Olamide",
    number: "0172507771",
    bank: "GT Bank",
  },
  signatories: [
    { name: "Sis. Osibanjo Olamide", role: "Choir Music Director" },
    { name: "Pst. Olatona Oluwafunmmilayo", role: "Minister in Charge / WAPICP CSR" },
  ],
  zone: "Zone 7, LP1",
};
