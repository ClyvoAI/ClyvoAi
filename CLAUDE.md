# Clyvo AI — Project Context for Claude

## What This Project Is
A Next.js 14 (App Router) marketing website for **Clyvo AI** — a B2B AI agency that builds custom AI systems for businesses. Live at **clyvoai.in**. The site is a single-page scroll with 7 sections plus a footer, admin dashboard, and lead capture API.

---

## Tech Stack
- **Framework:** Next.js 14 App Router, TypeScript
- **Styling:** Tailwind CSS + custom CSS in `app/globals.css`
- **Animations:** Framer Motion (`motion/react`) — useScroll, useTransform, useInView, variants
- **Horizontal scroll:** GSAP + ScrollTrigger (in `transformation-scene.tsx`)
- **Database:** Supabase — `leads` table via `lib/supabase.ts`
- **Fonts:** Syne, Inter, JetBrains Mono, Playfair Display (Google Fonts via next/font)
- **Icons:** lucide-react
- **Mobile detection:** `lib/device.ts` → `useIsMobile()` hook

---

## Design System — Luxury Cream/Gold/Ink Theme

This is the **third and final theme** (dark → light blue → current luxury).

### CSS Variables (app/globals.css)
```
--cream:       #F5F0E8   ← main background
--cream-deep:  #EDE6D6   ← alternate section bg
--ink:         #1A1A1A   ← primary text
--ink-light:   #4A4A4A
--ink-muted:   #8A8A8A
--gold:        #C9A84C   ← accent colour
--gold-light:  #E2C97E
--surface:     #FFFFFF
```

### Font Variables (app/layout.tsx)
```
--font-syne      → headings, nav, UI labels
--font-inter     → body, captions, buttons
--font-playfair  → luxury serif italic headlines
--font-mono      → JetBrains Mono
```

### Key Utility Classes
| Class | What it does |
|---|---|
| `.headline-luxury` | Playfair Display italic 700 |
| `.eyebrow` | 10px Inter, uppercase, gold, 0.22em tracking |
| `.btn-primary` | Ink bg, cream text, no border-radius, fit-content width |
| `.btn-ghost` | Transparent, gold border on hover |
| `.luxury-card` | White bg, subtle shadow, hover lift |
| `.gold-rule` | 1px gradient gold horizontal divider |
| `.section-padding` | Responsive padding (4rem mobile → 11rem desktop) |
| `.hero-grid` | Subtle 80px ink grid background |

### Section Backgrounds (alternating)
```
Hero              → #F5F0E8
Problem           → #F5F0E8   (id: solutions)
Services          → #EDE6D6   (id: services)
How It Works      → #F5F0E8   (id: how-it-works)
About / Clients   → #EDE6D6   (id: about)
Pricing           → #F5F0E8   (id: pricing)
Contact           → #EDE6D6   (id: contact)
Footer            → #1A1A1A   (ink)
```

---

## File Map

### App
```
app/
  layout.tsx          ← fonts, metadata, icons, Providers + AppLoader wrapper
  page.tsx            ← assembles all scenes + Navigation + Footer
  globals.css         ← entire design system (variables, utilities, keyframes)
  icon.ico            ← favicon (Next.js App Router convention)
  admin/
    page.tsx          ← leads admin dashboard (secret-gated, client component)
  api/
    leads/
      route.ts        ← POST (create lead) + GET (admin list, x-admin-secret)
      [id]/
        route.ts      ← PATCH (status/notes update) + DELETE (admin only)
```

### Components
```
components/
  providers.tsx
  analytics.tsx       ← Google Analytics
  clyvo/
    app-loader.tsx    ← initial page loader
    navigation.tsx    ← sticky header, Solutions dropdown, mobile menu
    hero-content.tsx  ← full-viewport hero, scroll parallax, AI status card
    footer.tsx        ← ink-bg footer with link columns  ← needs 'use client' (has onMouseEnter/Leave)
    global-background.tsx  ← fixed CSS gradient orbs (no WebGL in luxury theme)
    scroll-background.tsx  ← no-op (returns null — no bg transitions needed)
    section-wipe.tsx       ← no-op (returns null — luxury theme uses direct bg colors)
    scroll-dots.tsx        ← fixed right-side section indicator dots
    cursor-glow.tsx        ← mouse-tracking gold glow (desktop only)
    contact-form.tsx       ← controlled form → POST /api/leads
    scenes/
      problem-scene.tsx         ← "The Problem" section (id: solutions)
      transformation-scene.tsx  ← services horizontal scroll (id: services)
      operating-layer-scene.tsx ← how-it-works timeline (id: how-it-works)
      command-center-scene.tsx  ← who we work with / clients (id: about)
      impact-scene.tsx          ← pricing + counters (id: pricing)
      future-scene.tsx          ← contact form section (id: contact)
```

### Lib
```
lib/
  supabase.ts   ← createClient with NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
  device.ts     ← useIsMobile() hook
```

### Public
```
public/
  logo.png
  favicon.ico, favicon-16x16.png, favicon-32x32.png
  apple-touch-icon.png
  android-chrome-192x192.png, android-chrome-512x512.png
  site.webmanifest
```

---

## API Contract

### POST /api/leads
Body: `{ name, email, company?, employees?, message?, source? }`
Returns: `{ success: true, id }` (201) or error

### GET /api/leads
Header: `x-admin-secret: <ADMIN_SECRET env var>`
Returns: all leads ordered by created_at desc

### PATCH /api/leads/[id]
Header: `x-admin-secret`
Body: `{ status? }` or `{ notes? }` (or both)
Updates lead status/notes, sets updated_at

### DELETE /api/leads/[id]
Header: `x-admin-secret`
Deletes the lead

### Lead statuses
`'new' | 'contacted' | 'qualified' | 'closed' | 'rejected'`

---

## Navigation Structure

### Desktop header (left → right)
Logo → Solutions dropdown → How It Works → Pricing → About → **Book a Discovery Call** (btn-primary inside `<nav>`)

### Mobile header (left → center → right)
Empty spacer div (w-10) → Logo centered → Hamburger button (w-10)

Mobile full-screen menu has: all Services links + How It Works / Pricing / About + **Book a Discovery Call** CTA at bottom.

---

## Known Build Rules
1. **Always run `npm run build` after changes** — zero errors is the acceptance criterion.
2. **`footer.tsx` must have `'use client'`** at the top — it uses `onMouseEnter`/`onMouseLeave` event handlers. Without it, Next.js throws "Event handlers cannot be passed to Client Component props" at build time.
3. **`app/icon.ico`** is the active favicon file (App Router convention). `app/favicon.ico` was renamed to `app/icon.ico`.
4. **Zip extraction** on this machine must use PowerShell `Expand-Archive` — Bash/WSL cannot access `C:\Users\siddi\` paths due to permissions.
5. **`lib/supabase.ts`** uses the public anon key (reads from env). Admin routes check `process.env.ADMIN_SECRET` server-side via the `x-admin-secret` header.

---

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_SECRET=...
```

---

## Work Done in This Build Session

### Theme Overhauls (3 total)
1. Dark theme (`#000000` / `#00E5FF` cyan) — original
2. Light blue theme (`#f8f8f6` / `#0066cc`) — replaced all 14 core files
3. **Luxury cream/gold/ink** (current) — replaced all 20 files + added new routes

### Features Added
- **Chrome-style scroll animations** — pinned hero, scroll-driven parallax, section counters, stagger reveals, scroll dots, cursor glow
- **Leads capture** — `ContactForm` component → `POST /api/leads` → Supabase
- **Admin dashboard** `/admin` — secret-gated, shows all leads, update status/notes, delete
- **API routes** — `/api/leads` (POST + GET) and `/api/leads/[id]` (PATCH + DELETE)
- **Horizontal service cards** — GSAP pinned horizontal scroll on desktop, stacked on mobile
- **Timeline animation** — `operating-layer-scene.tsx` has a gold progress line driven by scroll

### Navigation Changes
- Removed "Solutions" from desktop NAV_LINKS (kept in dropdown)
- Mobile header restructured: centered logo with spacer+hamburger balance
- Desktop CTA moved inside `<nav>` element

### Favicon
- `app/icon.ico` — custom favicon (Next.js App Router)
- `public/` — full favicon set (16, 32, apple-touch, android-chrome, webmanifest)
- `app/layout.tsx` icons metadata: `{ icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' }`
