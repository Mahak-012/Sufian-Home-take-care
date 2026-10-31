export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white px-4">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand shadow-xl shadow-brand/30">
        <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
          <path d="M32 10 L55 31 L50 31 L50 52 L14 52 L14 31 L9 31 Z" fill="#ffffff" />
          <path
            d="M32 45.5 C25.5 40.8 22 37.3 22 33.4 C22 30.4 24.4 28 27.4 28 C29.2 28 30.9 28.9 32 30.4 C33.1 28.9 34.8 28 36.6 28 C39.6 28 42 30.4 42 33.4 C42 37.3 38.5 40.8 32 45.5 Z"
            fill="#0b5da7"
          />
        </svg>
        <span className="blink-soft absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-wa" />
      </span>
      <p className="text-base font-extrabold text-brand-deep">Sufian Home Care</p>
      <p dir="rtl" className="font-urdu text-sm font-semibold text-brand">
        دن رات ہماری سروس
      </p>
    </div>
  );
}
