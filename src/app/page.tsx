"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Ambulance,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Check,
  Bandage,
  BedDouble,
  Boxes,
  CircleDot,
  ClipboardList,
  Clock,
  Droplet,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Home as HomeIcon,
  Menu,
  MessageCircle,
  PersonStanding,
  Phone,
  PhoneCall,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Users,
  UtensilsCrossed,
  Wallet,
  X,
  CircleX,
  PlayCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CARE_TYPES, FAQS, PHONES, SERVICES, SITE, waLink, WA_DEFAULT_TEXT } from "@/lib/site-data";

const TESTIMONIALS = [
  {
    name: "Muhammad Asif",
    role: "Son of a post-operative patient",
    text: "The nurse who cared for my father after his operation was skilled and very kind. Alhamdulillah, we were relieved to have such care at home.",
  },
  {
    name: "Ayesha Khan",
    role: "Daughter of a bedridden patient",
    text: "We needed 24-hour care for my mother. The staff is punctual, respectful and experienced — they treat her like their own family.",
  },
  {
    name: "Bilal Ahmed",
    role: "Grandson of an elderly patient",
    text: "Hospital bed, drip stand and oxygen were all arranged at home. Charges were reasonable and the response was quick.",
  },
];

const COMPARISON = {
  hospital: [
    "Long waiting queues and rush",
    "Rotating, unfamiliar staff",
    "Visiting-hour restrictions",
    "Higher daily charges",
    "Patient stays away from family",
  ],
  home: [
    "No queues — care at your doorstep",
    "Same dedicated caregiver daily",
    "Family stays close to the patient",
    "Affordable 12 / 24-hour shifts",
    "Safe, peaceful home environment",
    "One-to-one personal attention",
  ],
};

const TRUST_BADGES = [
  { icon: HeartHandshake, ur: "اعتماد — ہماری پہچان", en: "Trust is our identity" },
  { icon: Users, ur: "مرد و خواتین اسٹاف", en: "Male & female staff" },
  { icon: Clock, ur: "24/7 دن رات سروس", en: "Day & night service" },
  { icon: HomeIcon, ur: "گھر پر نرسنگ سہولت", en: "Nursing at home" },
  { icon: HeartPulse, ur: "ہمارا مقصد — آپ کی صحت", en: "Your health, our goal" },
];

/* ---------------------------------- data ---------------------------------- */

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#care", label: "Who We Care For" },
  { href: "#why-us", label: "Why Us" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { icon: HeartPulse, to: 15, suffix: "+", label: "Home Care Services", ur: "ہوم کیئر خدمات" },
  { icon: Clock, to: 24, suffix: "/7", label: "Day & Night Service", ur: "دن رات سروس" },
  { icon: Users, to: 12, suffix: " / 24", label: "Hour Duty Shifts", ur: "ڈیوٹی شفٹس" },
  { icon: HomeIcon, to: 100, suffix: "%", label: "Care at Your Home", ur: "گھر پر خدمت" },
];

const SERVICE_ICONS = [
  Droplets,
  Syringe,
  UtensilsCrossed,
  Droplet,
  PersonStanding,
  CircleDot,
  Scissors,
  Bandage,
  Sparkles,
  Ambulance,
  Boxes,
  BedDouble,
  Stethoscope,
  HeartHandshake,
];

const WHY_US = [
  {
    icon: ShieldCheck,
    en: "Quality & Safe Services",
    ur: "معیاری اور محفوظ خدمات",
    desc: "Careful, hygienic and reliable procedures — the safety of your patient comes first.",
  },
  {
    icon: HeartHandshake,
    en: "Experienced, Kind Staff",
    ur: "تجربہ کار اور مہربان اسٹاف",
    desc: "Trained caregivers who treat your loved ones like their own family.",
  },
  {
    icon: Users,
    en: "Male & Female Staff",
    ur: "مرد و خواتین اسٹاف",
    desc: "Male and female caregivers available according to your patient's comfort.",
  },
  {
    icon: Clock,
    en: "12 & 24 Hour Shifts",
    ur: "12 اور 24 گھنٹے کی ڈیوٹی",
    desc: "Flexible duty shifts for patients who need round-the-clock attention.",
  },
  {
    icon: HomeIcon,
    en: "Nursing Comfort at Home",
    ur: "گھر پر نرسنگ سہولت",
    desc: "Hospital-level nursing in the familiar, peaceful environment of your home.",
  },
  {
    icon: Wallet,
    en: "Reasonable, Stable Fees",
    ur: "مناسب اور مستحکم فیس",
    desc: "Clear and affordable charges with no hidden costs — quality within reach.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "Call or WhatsApp Us",
    ur: "ابھی کال یا واٹس ایپ کریں",
    desc: "Tell us about your patient's needs — any time, day or night.",
  },
  {
    no: "02",
    title: "Free Guidance",
    ur: "مفت رہنمائی",
    desc: "The right care, staff and equipment — with a clear quote.",
  },
  {
    no: "03",
    title: "Care Begins at Home",
    ur: "گھر پر خدمت کا آغاز",
    desc: "Our trained staff reaches your home — 12 or 24-hour shifts.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- counter --------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------------------------- logo ---------------------------------- */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Sufian Home Patient Care — home">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand shadow-md shadow-brand/30">
        <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
          <path d="M32 10 L55 31 L50 31 L50 52 L14 52 L14 31 L9 31 Z" fill="#ffffff" />
          <path
            d="M32 45.5 C25.5 40.8 22 37.3 22 33.4 C22 30.4 24.4 28 27.4 28 C29.2 28 30.9 28.9 32 30.4 C33.1 28.9 34.8 28 36.6 28 C39.6 28 42 30.4 42 33.4 C42 37.3 38.5 40.8 32 45.5 Z"
            fill="#0b5da7"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block text-xl font-extrabold tracking-wide ${light ? "text-white" : "text-brand-deep"}`}>
          SUFIAN
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] ${light ? "text-white/70" : "text-brand"}`}>
          Home Patient Care
        </span>
      </span>
    </a>
  );
}

/* -------------------------------- section head ---------------------------- */

function SectionHead({
  chip,
  title,
  ur,
  sub,
  light = false,
}: {
  chip: string;
  title: string;
  ur: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
      <span
        className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
          light ? "bg-white/10 text-brand-sky" : "bg-brand-tint text-brand"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {chip}
      </span>
      <h2 className={`text-[1.375rem] font-extrabold leading-snug md:text-[1.75rem] ${light ? "text-white" : "text-brand-deep"}`}>
        {title}
      </h2>
      <p dir="rtl" className={`font-urdu mt-1.5 text-[15px] md:text-base ${light ? "text-white/80" : "text-brand"}`}>{ur}</p>
      {sub ? (
        <p className={`mt-2.5 text-sm leading-relaxed md:text-[15px] ${light ? "text-white/70" : "text-slate-600"}`}>{sub}</p>
      ) : null}
    </Reveal>
  );
}

/* --------------------------------- navbar --------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close drawer with Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[5] h-[3px] bg-white/10"
      >
        <div
          className="h-full bg-gradient-to-r from-brand via-brand-sky to-wa transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {/* top info bar */}
      <div className="hidden bg-brand-deep text-white sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <p className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brand-sky" />
            <span className="font-semibold">24/7 Service</span>
            <span dir="rtl" className="font-urdu text-white/80">دن رات ہماری سروس</span>
          </p>
          <div className="flex items-center gap-4">
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-1.5 font-semibold transition hover:text-brand-sky">
                <Phone className="h-3.5 w-3.5 text-brand-sky" />
                {p.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* main nav */}
      <nav
        className={`transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-brand-deep/10" : ""
        } bg-white/95 backdrop-blur-md`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Logo />
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-semibold text-slate-700 transition hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONES[0].tel}`}
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand/30 transition hover:bg-brand-deep md:inline-flex"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>


      </nav>

      {/* mobile drawer menu */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-brand-deep/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.25, ease: "easeOut" }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-slate-700 transition hover:bg-brand-tint hover:text-brand"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 text-brand/50" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-slate-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <a
                  href={`tel:${PHONES[0].tel}`}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25"
                >
                  <PhoneCall className="h-4 w-4" /> Call Now — {PHONES[0].display}
                </a>
                <a
                  href={waLink(PHONES[0].wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-wa px-5 py-3 text-sm font-bold text-white"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <p dir="rtl" className="font-urdu pt-1 text-center text-sm font-semibold text-brand">
                  دن رات ہماری سروس — اعتماد ہماری پہچان
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-brand-tint via-white to-white pt-36 sm:pt-40">
      {/* decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-8rem] h-96 w-96 rounded-full bg-brand-sky/15 blur-3xl" />
        <div className="absolute bottom-0 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 lg:grid-cols-2 lg:gap-8 lg:pb-24">
        {/* left */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 text-xs font-bold text-brand shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
            </span>
            24/7 Home Nursing Services
            <span dir="rtl" className="font-urdu text-sm font-semibold">دن رات سروس</span>
          </span>

          <h1 className="text-[1.6rem] font-extrabold leading-[1.22] tracking-tight text-brand-deep sm:text-[1.8rem] md:text-4xl md:leading-[1.2] xl:text-[2.5rem]">
            Home Nursing Services,
            <br />
            <span className="text-brand">Nurses Take Care at Your Home</span>
          </h1>

          <p dir="rtl" className="font-urdu mt-2.5 text-base text-slate-700">
            ہر مریض کے لیے گھر پر بہترین، معیاری اور محفوظ طبی خدمت
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
            <strong className="font-bold text-slate-800">Sufian Home Care</strong> — experienced male &amp; female
            nurses care for your loved ones at home, day and night.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`tel:${PHONES[0].tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              <PhoneCall className="h-[18px] w-[18px]" />
              Call Now — {PHONES[0].display}
            </a>
            <a
              href={waLink(PHONES[0].wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-6 py-3 text-[15px] font-bold text-white shadow-xl shadow-wa/30 transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              WhatsApp Us
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {["24/7 Availability", "Male & Female Nurses", "12 / 24-Hour Shifts"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* right — image */}
        <motion.div
          className="relative"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-brand/20 ring-1 ring-brand/10">
            <Image
              src="/images/hero.jpg"
              alt="Home care nurse looking after an elderly patient at home — Sufian Home Care"
              width={1344}
              height={768}
              priority
              className="h-[380px] w-full object-cover sm:h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/35 via-transparent to-transparent" />
          </div>

          {/* floating card — 24/7 */}
          <div className="absolute -left-3 top-6 rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-brand/10 backdrop-blur sm:-left-6">
            <p className="flex items-center gap-2 text-2xl font-extrabold text-brand">
              24/7
              <span className="blink-soft h-2.5 w-2.5 rounded-full bg-wa" />
            </p>
            <p dir="rtl" className="font-urdu text-sm font-semibold text-slate-700">دن رات ہماری سروس</p>
          </div>

          {/* floating card — staff */}
          <div className="absolute -bottom-5 right-4 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-brand/10 backdrop-blur sm:right-8">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brand-deep">
              <Users className="h-5 w-5 text-brand" />
              Male &amp; Female Staff
            </p>
            <p dir="rtl" className="font-urdu text-sm font-semibold text-slate-600">تجربہ کار مرد و خواتین اسٹاف</p>
          </div>
        </motion.div>
      </div>

      {/* emergency strip */}
      <div className="relative mx-auto max-w-7xl px-4 pb-12">
        <Reveal className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-emergency px-6 py-5 text-white shadow-xl shadow-emergency/25 sm:flex-row">
          <p className="flex items-center gap-3 text-center sm:text-left">
            <HeartPulse className="h-7 w-7 shrink-0" />
            <span>
              <span className="block text-[15px] font-bold">Need urgent care for a loved one?</span>
              <span dir="rtl" className="font-urdu block text-sm text-white/85">اپنے مریض کے لیے ابھی رابطہ کریں</span>
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PHONES.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-emergency shadow transition hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                {p.display}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- stats --------------------------------- */

function Stats() {
  return (
    <section className="bg-brand-deep py-12 md:py-14" aria-label="Key facts">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <s.icon className="h-6 w-6 text-brand-sky" />
            </div>
            <p className="text-2xl font-extrabold text-white md:text-[1.75rem]">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm font-semibold text-white/85">{s.label}</p>
            <p dir="rtl" className="font-urdu text-sm text-white/60">{s.ur}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- services -------------------------------- */

function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="Our Services"
          title="Complete Home Nursing & Patient Care Services"
          ur="ہماری خدمات"
          sub="Trained nurses for drips, injections, beds, oxygen and more — all at home."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[i] ?? ClipboardList;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-brand-deep">{s.en}</h3>
                  <p dir="rtl" className="font-urdu text-[15px] font-semibold text-brand">{s.ur}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </Link>
              </Reveal>
            );
          })}

          {/* and many more */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand/30 bg-brand-tint/60 p-5 text-center">
              <Sparkles className="mb-3 h-7 w-7 text-brand" />
              <h3 className="text-base font-extrabold text-brand-deep">And Many More…</h3>
              <p dir="rtl" className="font-urdu text-[15px] font-semibold text-brand">اور بھی بہت سی خدمات</p>
            </div>
          </Reveal>

          {/* CTA tile */}
          <Reveal delay={0.16}>
            <a
              href={`tel:${PHONES[0].tel}`}
              className="group flex h-full flex-col items-center justify-center rounded-2xl bg-brand p-5 text-center shadow-lg shadow-brand/25 transition hover:-translate-y-1 hover:bg-brand-deep"
            >
              <PhoneCall className="mb-3 h-7 w-7 text-white transition group-hover:scale-110" />
              <h3 className="text-base font-extrabold text-white">Not sure what you need?</h3>
              <p className="mt-1 text-sm font-semibold text-white/85">Call us — free guidance</p>
              <p dir="rtl" className="font-urdu mt-1 text-sm text-white/85">مفت رہنمائی کے لیے کال کریں</p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- care types ------------------------------ */

function CareTypes() {
  return (
    <section id="care" className="scroll-mt-28 bg-brand-tint py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="Who We Care For"
          title="Expert Home Care for Every Kind of Patient"
          ur="ہر مریض کی دیکھ بھال"
          sub="Skilled, compassionate care for every situation — right at your home."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARE_TYPES.map((c, i) => (
            <Reveal key={c.en} delay={i * 0.08} className="h-full">
              <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/15">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={c.img}
                    alt={`${c.en} — Sufian Home Care nursing staff at home`}
                    width={1152}
                    height={864}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur">
                    {c.en}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-brand-deep">{c.en}</h3>
                  <p dir="rtl" className="font-urdu text-[15px] font-semibold text-brand">{c.ur}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- why us --------------------------------- */

function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-28 bg-brand-deep py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="Why Choose Us"
          title="A Name Families Trust"
          ur="اعتماد ہماری پہچان"
          light
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w, i) => (
            <Reveal key={w.en} delay={(i % 3) * 0.08} className="h-full">
              <div className="h-full rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/10 backdrop-blur transition duration-300 hover:bg-white/[0.12]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sky/20">
                  <w.icon className="h-6 w-6 text-brand-sky" />
                </div>
                <h3 className="text-base font-extrabold text-white">{w.en}</h3>
                <p dir="rtl" className="font-urdu text-[15px] font-semibold text-brand-sky">{w.ur}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- how it works ----------------------------- */

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="How It Works"
          title="Care in 3 Simple Steps"
          ur="صرف تین مرحلے"
        />
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-brand/25 md:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.12} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white shadow-xl shadow-brand/30 ring-8 ring-brand-tint">
                {s.no}
              </div>
              <h3 className="text-base font-extrabold text-brand-deep md:text-lg">{s.title}</h3>
              <p dir="rtl" className="font-urdu text-[15px] font-semibold text-brand">{s.ur}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-brand-tint py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHead
          chip="FAQs"
          title="Questions Families Ask"
          ur="عام سوالات"
        />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm data-[state=open]:border-brand/30"
              >
                <AccordionTrigger className="py-4 text-left text-base font-bold text-brand-deep hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-sm font-semibold text-slate-600">Still have a question?</p>
          <a
            href={`tel:${PHONES[0].tel}`}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep"
          >
            <PhoneCall className="h-4 w-4" /> {PHONES[0].display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- contact -------------------------------- */

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setError("");
    const msg = [
      "Assalam-o-Alaikum! I need home patient care.",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service || "Not sure yet"}`,
      details.trim() ? `Details: ${details.trim()}` : "",
      "",
      "(Sent from Sufian website)",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(PHONES[0].wa, encodeURIComponent(msg)), "_blank", "noopener");
  };

  return (
    <section id="contact" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="Contact Us"
          title="Get Care for Your Loved One Today"
          ur="رابطہ کریں"
          sub="Available 24/7 — call, WhatsApp or send a request."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* left: direct contact */}
          <Reveal className="space-y-4">
            {PHONES.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand transition group-hover:bg-brand group-hover:text-white">
                    <Phone className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold tracking-wide text-brand-deep" dir="ltr">
                      {p.display}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">Tap to call — 24/7</span>
                  </span>
                </div>
                <PhoneCall className="h-6 w-6 text-brand transition group-hover:scale-110" />
              </a>
            ))}

            <a
              href={waLink(PHONES[0].wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-wa p-5 text-white shadow-lg shadow-wa/30 transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <MessageCircle className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold">Chat on WhatsApp</span>
                  <span dir="rtl" className="font-urdu block text-sm text-white/90">واٹس ایپ پر بات کریں</span>
                </span>
              </div>
            </a>

            <div className="rounded-2xl bg-brand-tint p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-brand-deep">
                <Clock className="h-4 w-4 text-brand" /> Available 24 hours — 7 days a week
              </p>
              <p dir="rtl" className="font-urdu mt-1 text-sm font-semibold text-brand">
                دن رات ہماری سروس — ہر مریض کے لیے
              </p>
            </div>
          </Reveal>

          {/* right: request form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-brand/10 sm:p-8"
              noValidate
            >
              <h3 className="text-lg font-extrabold text-brand-deep">Request a Call Back</h3>
              <p dir="rtl" className="font-urdu mt-1 text-sm font-semibold text-brand">
                فارم بھریں — ہم واٹس ایپ پر رابطہ کریں گے
              </p>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Your Name *</Label>
                  <Input
                    id="c-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmed Ali"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-phone">Your Phone *</Label>
                  <Input
                    id="c-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03xx-xxxxxxx"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Service Needed</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Choose a service…" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      <SelectItem value="not-sure">Not sure — need guidance</SelectItem>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.en} value={s.en}>
                          {s.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-details">Patient Condition / Details</Label>
                  <Textarea
                    id="c-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="e.g. My father is bedridden after surgery, we need a 24-hour female caregiver…"
                    className="min-h-24 rounded-xl"
                  />
                </div>

                {error ? (
                  <p className="rounded-lg bg-emergency/10 px-3 py-2 text-sm font-semibold text-emergency">{error}</p>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 text-base font-bold text-white shadow-lg shadow-wa/30 transition hover:brightness-95"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Request on WhatsApp
                </button>
                <p className="text-center text-xs leading-relaxed text-slate-400">
                  This opens WhatsApp with your details ready to send — nothing is stored on this website.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- footer -------------------------------- */

function Footer() {
  return (
    <footer className="mt-auto bg-brand-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 md:py-14">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {SITE.legalName} — trusted home nursing services with qualified male &amp; female nurses, patient care
            takers and medical equipment at your home, day and night.
          </p>
          <p dir="rtl" className="font-urdu mt-3 text-base text-brand-sky">آپ کی صحت، ہماری اولین ترجیح</p>
        </div>

        <nav aria-label="Footer quick links">
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-brand-sky">Quick Links</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-white/75 transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-brand-sky">Our Services</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-white">
                  {s.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-brand-sky">Contact</h3>
          <ul className="space-y-3 text-sm">
            {PHONES.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 font-bold text-white transition hover:text-brand-sky">
                  <Phone className="h-4 w-4 text-brand-sky" /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={waLink(PHONES[0].wa)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/75 transition hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-brand-sky" /> WhatsApp Chat
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/75">
              <Clock className="h-4 w-4 text-brand-sky" /> Open 24 hours — 7 days a week
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <HeartPulse className="h-3.5 w-3.5 text-emergency" />
            Your Health, Our First Priority
            <span dir="rtl" className="font-urdu text-sm">آپ کی صحت، ہماری اولین ترجیح</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ floating actions --------------------------- */

function FloatingActions() {
  return (
    <>
      {/* desktop WhatsApp FAB */}
      <a
        href={waLink(PHONES[0].wa)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pulse-ring fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-2xl shadow-wa/40 transition hover:scale-105 md:flex"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* mobile sticky call/WhatsApp bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a
          href={`tel:${PHONES[0].tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-white"
        >
          <PhoneCall className="h-4 w-4" /> Call Now
        </a>
        <a
          href={waLink(PHONES[0].wa)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-wa py-3.5 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}

/* --------------------------------- marquee --------------------------------- */

function ServiceTicker() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <section aria-label="Our services ticker" className="marquee-paused overflow-hidden border-y border-white/10 bg-brand py-3">
      <div className="animate-marquee flex w-max items-center gap-8">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-bold text-white">
            <span className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-brand-sky" />
              {s.en}
              <span dir="rtl" className="font-urdu text-sm font-semibold text-white/80">{s.ur}</span>
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- video section ------------------------------ */

function VideoSection() {
  return (
    <section id="video" className="scroll-mt-28 overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
            <PlayCircle className="h-4 w-4" />
            Introduction Video
          </span>
          <h2 className="text-[1.375rem] font-extrabold leading-snug text-brand-deep md:text-[1.75rem]">
            Meet Sufian Home Care
          </h2>
          <p dir="rtl" className="font-urdu mt-1.5 text-[15px] text-brand">ہمارا تعارف دیکھیں</p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 md:text-[15px]">
            A short introduction to who we are and how we care for families at home.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Experienced male & female caregivers",
              "Nursing, equipment & doctor visits — all at home",
              "12 & 24 hour duty shifts available",
              "Quick response — call anytime, day or night",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-tint">
                  <Check className="h-4 w-4 text-brand" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.ur}
                className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-tint/70 px-3.5 py-2"
                title={b.en}
              >
                <b.icon className="h-4 w-4 text-brand" />
                <span dir="rtl" className="font-urdu text-sm font-semibold text-brand-deep">{b.ur}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative mx-auto w-[280px] sm:w-[320px]">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-brand-tint via-white to-brand-sky/20" />
            <div className="relative overflow-hidden rounded-[2.6rem] border-[10px] border-slate-900 bg-black shadow-2xl shadow-brand/30">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/images/care-elderly.jpg"
                className="aspect-[9/16] w-full object-cover"
                aria-label="Sufian Home Care introduction video"
              >
                <source src="/video/sufian-promo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900"
            />
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-slate-500">
            Our official introduction — <span dir="rtl" className="font-urdu text-brand">سفیان ہوم پیٹشنٹ کیئر</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- comparison -------------------------------- */

function Comparison() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead
          chip="Hospital vs Home"
          title="Why Home Care Wins"
          ur="گھر پر دیکھ بھال کیوں بہتر ہے"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {/* hospital */}
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-500">
                <CircleX className="h-5 w-5 text-slate-400" /> Typical Hospital Stay
              </h3>
              <ul className="mt-5 space-y-3.5">
                {COMPARISON.hospital.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm font-semibold text-slate-500">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* home care */}
          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full rounded-3xl bg-brand p-7 text-white shadow-2xl shadow-brand/30">
              <span className="absolute -top-3 right-6 rounded-full bg-wa px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow">
                Recommended
              </span>
              <h3 className="flex items-center gap-2 text-lg font-extrabold">
                <BadgeCheck className="h-5 w-5 text-brand-sky" /> With Sufian Home Care
              </h3>
              <ul className="mt-5 space-y-3.5">
                {COMPARISON.home.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm font-semibold text-white/90">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-wa">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- testimonials ------------------------------- */

function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-28 bg-brand-tint py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          chip="Families Say"
          title="Trust of Families, Our Pride"
          ur="اعتماد ہماری پہچان"
        />
        <div className="testi-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="min-w-[86%] snap-center sm:min-w-[420px] md:min-w-0">
              <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
                <div className="mb-3 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400" aria-hidden="true">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-brand-deep">{t.name}</span>
                    <span className="block text-xs font-semibold text-slate-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-slate-400 md:hidden" aria-hidden="true">
          ← swipe →
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- final cta -------------------------------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep via-brand to-brand-deep py-14 md:py-16">
      {/* animated ECG line */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 80"
        className="pointer-events-none absolute inset-x-0 top-1/2 w-full -translate-y-1/2 opacity-25"
        fill="none"
      >
        <path
          className="ecg-line"
          d="M0 40 H340 L365 40 L378 12 L396 68 L408 24 L420 40 H700 L725 40 L738 12 L756 68 L768 24 L780 40 H1200"
          stroke="#7dd3fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-sky">
            <span className="blink-soft h-2 w-2 rounded-full bg-wa" />
            Available Right Now — 24/7
          </p>
          <h2 className="text-[1.375rem] font-extrabold leading-snug text-white md:text-[1.75rem]">
            Your Loved One Deserves the Best Care
          </h2>
          <p dir="rtl" className="font-urdu mt-1.5 text-base text-white/85">آپ کی صحت، ہماری اولین ترجیح — ابھی رابطہ کریں</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {PHONES.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-brand-deep shadow-xl transition hover:-translate-y-0.5"
              >
                <PhoneCall className="h-5 w-5 text-brand" />
                {p.display}
              </a>
            ))}
            <a
              href={waLink(PHONES[0].wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-wa px-6 py-3.5 text-base font-extrabold text-white shadow-xl shadow-wa/30 transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- back to top ------------------------------- */

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-20 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-tint md:bottom-6 md:left-6 md:h-12 md:w-12"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Hero />
        <ServiceTicker />
        <Stats />
        <Services />
        <CareTypes />
        <VideoSection />
        <WhyUs />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingActions />
      <BackToTop />
    </div>
  );
}
