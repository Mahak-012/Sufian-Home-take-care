import Link from "next/link";
import { HeartPulse, PhoneCall } from "lucide-react";
import { PHONES } from "@/lib/site-data";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-tint px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand text-white shadow-xl shadow-brand/30">
        <HeartPulse className="h-10 w-10" />
      </div>
      <p className="text-sm font-extrabold uppercase tracking-widest text-brand">404 — Page not found</p>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-deep md:text-4xl">
        This page could not be found
      </h1>
      <p dir="rtl" className="font-urdu mt-3 text-lg text-slate-600">
        معذرت — یہ صفحہ موجود نہیں ہے
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-deep"
        >
          Go to Homepage
        </Link>
        <a
          href={`tel:${PHONES[0].tel}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-7 py-3.5 font-bold text-white shadow-lg shadow-wa/30 transition hover:brightness-95"
        >
          <PhoneCall className="h-5 w-5" />
          Call — {PHONES[0].display}
        </a>
      </div>
    </main>
  );
}
