import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FAQS, PHONES, SITE } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Home Nursing Services at Home | Nurse on Call 24/7 — Sufian Home Care",
    template: "%s | Sufian Home Care",
  },
  description: SITE.desc,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Health",
  openGraph: {
    title: "Home Nursing Services at Home | Nurse on Call 24/7 — Sufian Home Care",
    description: SITE.desc,
    siteName: SITE.name,
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1344,
        height: 768,
        alt: "Home care nurse looking after an elderly patient at home — Sufian Home Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Nursing Services at Home | Nurse on Call 24/7 — Sufian Home Care",
    description: SITE.desc,
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b5da7",
  width: "device-width",
  initialScale: 1,
};

// Google structured data: LocalBusiness + FAQ (helps Google rank & show rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${SITE.url}/#business`,
      name: SITE.legalName,
      alternateName: SITE.name,
      description: SITE.desc,
      url: SITE.url,
      telephone: PHONES.map((p) => p.tel),
      image: `${SITE.url}/images/hero.jpg`,
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: { "@type": "Country", name: "Pakistan" },
      address: { "@type": "PostalAddress", addressCountry: "PK" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} ${urdu.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
