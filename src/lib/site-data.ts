// Central data for the Sufian Home Care website.
// All facts (services, phone numbers, shifts, staff) come from the client's
// own flyer / promo video. SEO keywords are naturally woven into the copy.

export const SITE = {
  name: "Sufian Home Care",
  legalName: "Sufian Home Patient Care Services Center",
  tagline: "Home Nursing Services — Care Right at Your Home",
  url: "https://sufian-home-care.vercel.app", // change after custom domain
  desc: "Sufian Home Care provides trusted home nursing services in Pakistan — qualified male & female nurses take care of patients at home, 24/7. Nurse care at home: IV drips, injections, elderly care, post-surgery care, hospital bed rent, oxygen and doctor home visits.",
  keywords: [
    "home nursing services",
    "nurse take care of patient at home",
    "nurse take care at home",
    "nurse care at home",
    "nurse at home",
    "home care nurse",
    "home nursing services in Pakistan",
    "nursing care at home",
    "private nurse at home",
    "hire nurse for home",
    "patient care taker at home",
    "caretaker for patient at home",
    "home patient care services",
    "elderly care at home",
    "post surgery care at home",
    "attendant for patient at home",
    "male female nursing staff",
    "hospital bed on rent",
    "oxygen supply at home",
    "doctor home visit",
    "ghar par nurse",
    "ghar par nursing",
    "nurse on call",
    "24/7 home nursing",
    "nurse for elderly care at home",
    "Sufian Home Care",
    "Sufian Home Patient Care Services Center",
  ],
  hours: "Mo-Su 00:00-23:59",
};

export const PHONES = [
  { display: "0301-6085403", tel: "+923016085403", wa: "923016085403" },
  { display: "0304-6303602", tel: "+923046303602", wa: "923046303602" },
];

export const WA_DEFAULT_TEXT = encodeURIComponent(
  "Assalam-o-Alaikum! Mujhe Sufian Home Care ki home nursing services ke bare mein maloomat chahiye."
);

export const waLink = (phone: string, text: string = WA_DEFAULT_TEXT) =>
  `https://wa.me/${phone}?text=${text}`;

export type ServiceItem = {
  slug: string;
  en: string;
  ur: string;
  desc: string;
  long: string;
  points: string[];
};

// 14 real services from the flyer — each with its own SEO page
export const SERVICES: ServiceItem[] = [
  {
    slug: "iv-drip-at-home",
    en: "IV Drip at Home",
    ur: "ڈرپ لگانا",
    desc: "IV drips and infusions administered safely at home by trained nursing staff.",
    long: "Our home nursing service provides safe IV drip and infusion administration at your home. A trained home care nurse prepares and monitors the drip, checks the vein site regularly and keeps everything sterile — so the patient can receive hospital-level treatment without leaving home.",
    points: ["Sterile, safe IV cannulation", "Drip monitoring by trained nurse", "Available in 12 & 24-hour shifts"],
  },
  {
    slug: "injections-at-home",
    en: "Injections at Home",
    ur: "انجکشن لگانا",
    desc: "All routine injections given at home by experienced male & female nursing staff.",
    long: "Need a nurse at home for daily or one-time injections? Our experienced staff gives all routine injections — IM, IV, SC — with correct technique and safe disposal. Ideal for patients on regular medication courses who cannot travel to a clinic.",
    points: ["IM, IV & SC injections", "Male & female nurses available", "Safe syringe disposal"],
  },
  {
    slug: "feeding-tube-care",
    en: "Feeding Tube (NG) Care",
    ur: "نوزل کی نالی",
    desc: "NG tube feeding and care at home for patients who cannot eat by mouth.",
    long: "Our caretakers and nurses are trained in NG (nose feeding) tube feeding and daily tube care at home — feeding on schedule, checking tube position and keeping the patient comfortable and hygienic throughout the day.",
    points: ["NG tube feeding on schedule", "Tube position & skin care", "Hygienic, gentle handling"],
  },
  {
    slug: "urinary-catheter-care",
    en: "Urinary Catheter Care",
    ur: "پیشاب کی نالی",
    desc: "Catheter insertion and hygienic catheter management at home.",
    long: "Urinary catheter insertion and daily catheter care at home, performed with full hygiene to prevent infection. Our home care nurses also manage urine bags, monitor output and keep bedridden patients clean and comfortable.",
    points: ["Sterile catheterisation", "Infection-prevention hygiene", "Bag change & monitoring"],
  },
  {
    slug: "physiotherapy-at-home",
    en: "Physiotherapy at Home",
    ur: "فزیوتھراپی",
    desc: "Physical therapy sessions at home to restore movement and strength.",
    long: "Regular physiotherapy sessions at home help patients recover movement after surgery, stroke or long bed rest. A caretaker or therapist visits your home on schedule and follows the exercise plan step by step with the patient.",
    points: ["Post-surgery & stroke rehab", "Scheduled home sessions", "Mobility & strength exercises"],
  },
  {
    slug: "hajama-cupping-therapy",
    en: "Hajama (Cupping) Therapy",
    ur: "حجامہ (کپنگ تھراپی)",
    desc: "Traditional hijama / cupping therapy performed carefully at home.",
    long: "Hajama (cupping therapy) is performed at your home with clean, disposable cups and a careful, sunnah-based method. Our trained staff maintains full hygiene from start to safe dressing afterwards.",
    points: ["Clean disposable cups", "Sunnah method, careful technique", "Post-hajama dressing included"],
  },
  {
    slug: "stitch-removal-at-home",
    en: "Stitch Removal at Home",
    ur: "ٹانکے کھولنا",
    desc: "Post-surgery stitch removal at home by qualified nursing staff.",
    long: "After surgery there is no need to travel for stitch removal — a qualified home care nurse removes stitches at your home, checks the wound healing and dresses the area properly.",
    points: ["Qualified nurse for the procedure", "Wound check included", "Fresh dressing afterwards"],
  },
  {
    slug: "wound-dressing-at-home",
    en: "Wound Dressing at Home",
    ur: "زخم کی ڈریسنگ",
    desc: "Regular wound and bedsore dressing and care at home.",
    long: "Our home nursing service covers regular wound dressing and bedsore care at home — cleaning, medicated dressings and position-change guidance to help wounds heal faster and prevent new pressure sores in bedridden patients.",
    points: ["Daily / scheduled dressing", "Bedsore prevention & care", "Healing progress monitoring"],
  },
  {
    slug: "oxygen-supply-at-home",
    en: "Oxygen Supply at Home",
    ur: "آکسیجن کی فراہمی",
    desc: "Oxygen supply and concentrator support at home for patients who need it.",
    long: "For patients who need oxygen at home, we arrange oxygen supply and concentrator support with proper setup and guidance for the family. Our nursing staff can also monitor the patient around the clock in 12 or 24-hour shifts.",
    points: ["Concentrator setup & support", "24/7 monitored shifts available", "Family usage guidance"],
  },
  {
    slug: "ambulance-service",
    en: "Ambulance Service",
    ur: "ایمبولینس سروس",
    desc: "Ambulance available for safe and quick patient transport.",
    long: "An ambulance is available for safe patient transport — hospital admissions, check-ups or shifting between hospitals. Call our 24/7 number and we will arrange transport with care for the patient's condition.",
    points: ["24/7 availability", "Safe patient shifting", "Hospital admission support"],
  },
  {
    slug: "medical-equipment-at-home",
    en: "Medical Equipment at Home",
    ur: "میڈیکل آلات",
    desc: "Medical equipment provided for home use on easy terms.",
    long: "We provide medical equipment for home use — from BP machines and glucometers to oxygen support — so the patient's care setup at home is complete. Staff explains how to use everything before leaving.",
    points: ["Complete home care setup", "Usage guidance included", "Affordable terms"],
  },
  {
    slug: "hospital-bed-on-rent",
    en: "Hospital Bed & Drip Stand on Rent",
    ur: "ہسپتال بیڈ و ڈرپ اسٹینڈ",
    desc: "Hospital beds and drip stands on easy rent for home care.",
    long: "Hospital beds and drip stands are available on easy rent for home patient care — adjustable beds make bedridden and post-surgery patients far more comfortable, and drip stands keep treatment organised at home.",
    points: ["Adjustable hospital beds", "Drip stands included", "Easy rent, quick delivery"],
  },
  {
    slug: "doctor-home-visit",
    en: "Doctor Home Visit",
    ur: "ڈاکٹر کی ہوم وزٹ",
    desc: "Doctor visits your home for check-ups and treatment planning.",
    long: "A doctor home visit is available for check-ups, follow-ups and treatment planning at your home. Combined with our home nursing services, this gives the patient complete medical care without leaving the house.",
    points: ["Scheduled home check-ups", "Follow-up & treatment plan", "Works with home nursing care"],
  },
  {
    slug: "elderly-caretaker-at-home",
    en: "Elderly & Bedridden Care at Home",
    ur: "بوڑھوں اور بستری مریضوں کی دیکھ بھال",
    desc: "Long-term elderly care and bedridden patient care takers at home.",
    long: "Long-term elderly care at home by kind, experienced caretakers — bathing, feeding, medicines on time, mobility support and companionship for elderly and bedridden patients. Available as 12-hour and 24-hour live-in style shifts.",
    points: ["Male & female care takers", "Bathing, feeding, medicines", "12 & 24-hour shifts"],
  },
];

export const CARE_TYPES = [
  {
    en: "Bedridden Patients",
    ur: "بستری مریض",
    desc: "Complete daily care, hygiene, dressing and comfort for patients confined to bed.",
    img: "/images/care-bedridden.jpg",
  },
  {
    en: "Elderly Care at Home",
    ur: "بوڑھے مریض",
    desc: "Kind caretakers for elderly family members — medicines on time and daily help at home.",
    img: "/images/care-elderly.jpg",
  },
  {
    en: "Post-Surgery Care",
    ur: "آپریشن کے بعد کے مریض",
    desc: "Careful recovery care after surgery — dressing, medicines and monitoring at home.",
    img: "/images/care-postop.jpg",
  },
  {
    en: "Critical Care at Home",
    ur: "شدید حالت کے مریض",
    desc: "Attentive monitoring and support for seriously ill patients at home.",
    img: "/images/care-critical.jpg",
  },
];

export const FAQS = [
  {
    q: "Do you have both male and female nursing staff?",
    a: "Yes — experienced male and female caregivers, home care nurses and patient care takers are available, and they can serve at your home 24 hours a day.",
  },
  {
    q: "Do you offer 12-hour and 24-hour duty shifts?",
    a: "Yes. For patients who need continuous home nursing care we provide both 12-hour and 24-hour duty shifts.",
  },
  {
    q: "Can I rent a hospital bed, drip stand or oxygen equipment?",
    a: "Yes — hospital beds, drip stands, oxygen supply and other medical equipment are available on easy rent for use at your home.",
  },
  {
    q: "Can a doctor come to our home?",
    a: "Yes, doctor home visits are part of our home care services. Call us to schedule a visit for your patient.",
  },
  {
    q: "How soon can a nurse or caretaker start at our home?",
    a: "It depends on your location and staff availability. Call or WhatsApp us and we will arrange a nurse or caretaker as quickly as possible.",
  },
  {
    q: "What are the charges for home nursing services?",
    a: "Fees depend on the type of care and the shift duration (12 or 24 hours). Our charges are reasonable and stable — call us for a clear quote with no hidden charges.",
  },
];
