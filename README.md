# Sufian Home Care — Website v4 (React / Next.js)

Professional home nursing care website — 14 service pages, Urdu + English,
mobile-first design, professional typography, SEO ready (Google keywords:
home nursing services, nurse take care at home, nurse care at home).

---

## STEP 1 — VS Code mein kholna

1. Is folder ko apne Desktop par rakhein
2. VS Code kholein → **File > Open Folder** → ye folder select karein
3. Terminal kholein: **Ctrl + `** (ya menu: Terminal > New Terminal)

## STEP 2 — Install (sirf pehli dafa, 3-5 minute lagenge)

```
npm install
```

> Warning lines aayen to ghabrayein nahin — normal hai.

## STEP 3 — Laptop par test

```
npm run dev
```

Phir browser mein: **http://localhost:3000**

> Direct LIVE karne ke liye yahan tak test karna zaroori nahin — STEP 4
> se seedha deploy bhi ho sakta hai.

## STEP 4 — GitHub par code upload (backup + history)

1. github.com par **New repository** banayein (naam: `sufian-home-care`)
   - Private ya Public — jo aap chahen
2. VS Code terminal mein ek ek kar ke ye commands chalayein
   (USERNAME ki jagah apna GitHub username likhein):

```
git init
git add .
git commit -m "Sufian Home Care website v4"
git branch -M main
git remote add origin https://github.com/USERNAME/sufian-home-care.git
git push -u origin main
```

- Push ke waqt browser sign-in window khulegi → **Sign in with browser**
  → GitHub par **Authorize** kar dein.
- Bas! Code GitHub par save ho gaya.

## STEP 5 — Vercel par LIVE (2 tareeqe)

### Tareeqa A (recommended — GitHub se auto deploy)
1. vercel.com par GitHub se login karein
2. **Add New > Project** → apna repo `sufian-home-care` **Import** karein
3. Kuch change na karein → **Deploy** dabayein
4. 2-3 minute mein LIVE link: `https://sufian-home-care.vercel.app`

> Fayda: ab aap sirf GitHub par code push karenge aur Vercel khud
> website update kar dega — kuch aur nahi karna.

### Tareeqa B (terminal se)
```
npx vercel --prod
```

---

## Kya edit karein (client ke liye guide)

| Kya badalna hai | File |
|---|---|
| Phone numbers | `src/lib/site-data.ts` (PHONES) |
| Services / Reviews / FAQ | `src/lib/site-data.ts` |
| Headings / text | `src/app/page.tsx` |
| Har service ka page | `src/app/services/[slug]/page.tsx` + `site-data.ts` |
| Photos | `public/images/` (same naam se replace) |
| Client ki video | `public/video/sufian-promo.mp4` |

## Website ke features (v4)

- Professional typography — mobile-first text sizes (H1 25px mobile / 40px desktop)
- Mobile-first: sticky Call/WhatsApp bar, 48px+ tap targets, safe-area support
- 14 alag service pages (Google SEO ke liye)
- SEO: meta tags, sitemap.xml, robots.txt, JSON-LD (LocalBusiness + FAQ)
- Urdu + English bilingual
- Testimonials, Hospital-vs-Home comparison, video section
- WhatsApp booking form (koi server/database nahi chahiye)
- Back-to-top button, scroll progress bar, animated counters
