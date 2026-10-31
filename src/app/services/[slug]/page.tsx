import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Ambulance,
  ArrowRight,
  Bandage,
  BedDouble,
  Boxes,
  Check,
  ClipboardList,
  Clock,
  Droplet,
  Droplets,
  HeartPulse,
  Home as HomeIcon,
  MessageCircle,
  Phone,
  PhoneCall,
  Scissors,
  Stethoscope,
  Syringe,
  PersonStanding,
  UtensilsCrossed,
} from "lucide-react";
import { FAQS, PHONES, SERVICES, SITE, waLink } from "@/lib/site-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "iv-drip-at-home": Droplets,
  "injections-at-home": Syringe,
  "feeding-tube-care": UtensilsCrossed,
  "urinary-catheter-care": Droplet,
  "physiotherapy-at-home": PersonStanding,
  "hajama-cupping-therapy": ClipboardList,
  "stitch-removal-at-home": Scissors,
  "wound-dressing-at-home": Bandage,
  "oxygen-supply-at-home": HeartPulse,
  "ambulance-service": Ambulance,
  "medical-equipment-at-home": Boxes,
  "hospital-bed-on-rent": BedDouble,
  "doctor-home-visit": Stethoscope,
  "elderly-caretaker-at-home": HomeIcon,
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.en} — 24/7 Home Service`,
    description: `${service.desc} Sufian Home Care provides trusted home nursing services with experienced male & female staff on 12 & 24-hour shifts. Call ${PHONES[0].display}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.en} — Sufian Home Care`,
      description: service.desc,
      images: ["/images/hero.jpg"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICONS[service.slug] ?? ClipboardList;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);
  const serviceWa = waLink(
    PHONES[0].wa,
    encodeURIComponent(
      `Assalam-o-Alaikum! Mujhe "${service.en}" ki service ghar par chahiye. Baraye meharbani maloomat dein.`
    )
  );

  return (
    <main className="min-h-screen bg-white">
      {/* top info bar */}
      <div className="bg-brand-deep text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs font-semibold sm:text-sm">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-sky" /> 24/7 Service
            <span dir="rtl" className="font-urdu text-sm">دن رات ہماری سروس</span>
          </span>
          <span className="flex items-center gap-4">
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-1.5 transition hover:text-brand-sky">
                <Phone className="h-3.5 w-3.5" /> {p.display}
              </a>
            ))}
          </span>
        </div>
      </div>

      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight text-brand-deep">SUFIAN</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                Home Patient Care
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-bold text-slate-600 transition hover:text-brand sm:block"
            >
              ← Back to Home
            </Link>
            <a
              href={`tel:${PHONES[0].tel}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep"
            >
              <PhoneCall className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="bg-brand-tint">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-brand">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="transition hover:text-brand">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-deep">{service.en}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/25">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="text-[1.375rem] font-extrabold leading-snug text-brand-deep md:text-[1.75rem]">
                {service.en}
              </h1>
              <p dir="rtl" className="font-urdu mt-1.5 text-base font-semibold text-brand md:text-lg">
                {service.ur}
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 md:text-base">
                {service.long}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${PHONES[0].tel}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  <PhoneCall className="h-5 w-5" /> Call Now — {PHONES[0].display}
                </a>
                <a
                  href={serviceWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-wa px-7 py-3.5 font-bold text-white shadow-xl shadow-wa/30 transition hover:brightness-95"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* what's included */}
            <div className="rounded-3xl border border-brand/10 bg-white p-7 shadow-xl shadow-brand/10">
              <h2 className="text-base font-extrabold text-brand-deep md:text-lg">What&apos;s included</h2>
              <p dir="rtl" className="font-urdu mt-1 text-[15px] text-brand">کیا شامل ہے؟</p>
              <ul className="mt-5 space-y-4">
                {service.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-wa/15 text-wa">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold leading-relaxed text-slate-700">{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-brand-tint p-4 text-sm font-semibold text-brand-deep">
                Male &amp; female staff · 12 &amp; 24-hour shifts · 7 days a week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* other services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-[1.375rem] font-extrabold text-brand-deep md:text-[1.75rem]">Other Home Care Services</h2>
          <p dir="rtl" className="font-urdu mt-1 text-[15px] text-brand">ہماری دیگر خدمات</p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const OIcon = ICONS[o.slug] ?? ClipboardList;
              return (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-tint text-brand transition group-hover:bg-brand group-hover:text-white">
                    <OIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold text-brand-deep">{o.en}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-brand opacity-0 transition group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
          <Link
            href="/#services"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-deep"
          >
            View all 14 services on the homepage <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* common questions (matches FAQ schema below) */}
      <section className="bg-brand-tint py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[1.375rem] font-extrabold text-brand-deep md:text-[1.75rem]">Common Questions</h2>
          <p dir="rtl" className="font-urdu mt-1 text-[15px] text-brand">عام سوالات</p>
          <div className="mt-6 space-y-3">
            {FAQS.slice(0, 3).map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm open:border-brand/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold text-brand-deep [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-tint text-lg font-extrabold text-brand transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-brand-deep text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row">
          <p className="text-white/70">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
          <p className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-emergency" />
            Your Health, Our First Priority
            <span dir="rtl" className="font-urdu text-base">آپ کی صحت، ہماری اولین ترجیح</span>
          </p>
        </div>
      </footer>

      {/* mobile sticky call/WhatsApp bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a
          href={`tel:${PHONES[0].tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-white"
        >
          <PhoneCall className="h-4 w-4" /> Call Now
        </a>
        <a
          href={serviceWa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-wa py-3.5 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />

      {/* structured data: breadcrumbs + FAQs for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                  { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/#services` },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: service.en,
                    item: `${SITE.url}/services/${service.slug}`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQS.slice(0, 3).map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
