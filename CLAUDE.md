# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Project Overview

**Revierküche** (package name `wildbret-marktplatz`) is a German-language web
platform for a Heidelberg-Rohrbach wild game business ("Vom Revier auf den
Tisch"). It combines two distinct commerce models plus several content sections:

1. **Marktplatz** (`/marktplatz`) — a peer-to-peer marketplace where registered
   hunters (*Jäger*) list wild game (*Wildbret*) and buyers purchase it. Payments
   run through **Stripe Connect** (money goes to the seller, the platform keeps a
   10% fee).
2. **Onlineshop** (`/shop`) — the business's own delicatessen (*Feinkost*) shop.
   Products are defined statically in code, the cart lives in `localStorage`, and
   checkout is a **standard Stripe Checkout** session (money goes to the platform).
3. **Content sections** — `/feinkostladen`, `/weinbar`, `/kochschule` (cooking
   classes with booking), `/erzeuger` (producers), plus legal pages.

The UI, comments, commit messages, and domain vocabulary are **in German**. Keep
new user-facing text and code comments German to match the codebase.

> ⚠️ **Maintenance/Teaser mode is currently active.** See [Teaser Mode](#teaser-mode)
> below — the live site is gated behind an env var and most routes are replaced by
> a static teaser page until it is enabled.

## Tech Stack

- **Next.js 14.2** (App Router) + **React 18** + **TypeScript** (strict)
- **Supabase** — Postgres, Auth, Row Level Security, Storage (`@supabase/ssr`)
- **Stripe** — Connect (marketplace) and standard Checkout (shop); webhooks
- **Tailwind CSS** + `clsx` + `tailwind-merge` (via `cn()` helper)
- **react-hook-form** + **zod** (`@hookform/resolvers`) for forms
- **web-push** + a service worker (`public/sw.js`) for PWA push notifications
- **lucide-react** icons, **date-fns** dates, **react-dropzone** uploads
- Fonts: `Playfair Display` (serif headings) + `Inter` (sans body), via `next/font`

There is **no test framework** configured. Linting is via `next lint` (ESLint).

## Commands

```bash
npm run dev              # Start dev server on http://localhost:3000
npm run build            # Production build (also the main type/compile check)
npm run start            # Run the production build
npm run lint             # ESLint (eslint-config-next)
npm run generate-vapid   # Generate VAPID keys for web-push (scripts/generate-vapid.mjs)
```

There is no separate `tsc` typecheck script — rely on `npm run build` to surface
TypeScript errors. Always run `npm run build` (or at least `npm run lint`) before
committing significant changes.

## Project Structure

```
src/
  app/                       # Next.js App Router (pages + API routes)
    page.tsx                 # Homepage
    layout.tsx               # Root layout: fonts, Navbar, CartProvider, CartDrawer, footer
    globals.css              # Tailwind layers + global styles
    marktplatz/              # P2P marketplace listing browser
    inserat/[id]/, inserat/neu/   # Listing detail / create
    shop/, warenkorb/        # Feinkost shop + cart page
    feinkostladen/, weinbar/, kochschule/, erzeuger/, jaeger/[id]/   # Content
    bestellung/erfolg/       # Checkout success
    auth/login/, auth/register/
    dashboard/               # Authenticated user area:
      listings/, messages/, orders/, profile/
    agb/, datenschutz/, impressum/, widerruf/   # Legal (German)
    api/                     # Route handlers — see "API Routes" below
  components/
    layout/                  # Navbar, NotificationBell
    listings/                # Marketplace UI (cards, forms, messaging, buy, favorite)
    shop/                    # Shop UI (ProductGrid, CartDrawer, success)
    kochschule/, profile/, ratings/, legal/
  hooks/                     # useFavorite, usePushNotifications
  lib/
    supabase/client.ts       # Browser Supabase client
    supabase/server.ts       # Server Supabase client (cookie-based, RLS-respecting)
    products.ts              # STATIC shop catalog (PRODUKTE, KATEGORIEN)
    cart-context.tsx         # Shop cart React context (localStorage-backed)
    utils.ts                 # cn(), formatPreis(), TIER_ARTEN, KATEGORIEN, JAGD_METHODEN
  types/index.ts             # Shared TypeScript domain types
  middleware.ts              # Teaser/maintenance gate (SITE_LIVE)
supabase/migrations/         # SQL migrations (apply in order, see below)
scripts/generate-vapid.mjs   # VAPID key generator
public/                      # sw.js, manifest.json, images/
```

Path alias: `@/*` → `src/*` (configured in `tsconfig.json`).

## Key Conventions

- **Language:** German for all user-facing strings, domain terms, and comments.
  Domain vocabulary: *Inserat* = listing, *Jäger* = hunter/seller, *Wildbret* =
  game meat, *Anfrage* = inquiry, *Bestellung* = order, *Erzeuger* = producer,
  *Kochkurs* = cooking class, *Barzahlung* = cash payment.
- **Supabase clients:** use `lib/supabase/server.ts` in Server Components / route
  handlers (respects RLS via the user's cookies), and `lib/supabase/client.ts` in
  Client Components. For privileged operations that must bypass RLS (webhooks,
  push sending), create a **service-role** client directly with
  `SUPABASE_SERVICE_ROLE_KEY` — see `api/webhook` and `api/push/send`.
- **Money:** prices are stored/handled as numbers (EUR); convert to **cents**
  (`Math.round(x * 100)`) when talking to Stripe. Format for display with
  `formatPreis()` from `lib/utils.ts`.
- **Server-side price trust:** never trust client-supplied prices. The shop
  checkout re-derives every line item's price from `PRODUKTE` server-side
  (`api/checkout-shop`). Do the same for any new paid flow.
- **Styling:** Tailwind utility classes; merge conditional classes with `cn()`.
  Heading font is `font-playfair`, body is `font-sans` (Inter).
- **Forms:** prefer `react-hook-form` + `zod` resolvers (existing pattern).
- **The shop catalog is static code** (`lib/products.ts`), *not* a database table.
  Marketplace listings, by contrast, live in the `listings` Postgres table.

## Data Model (Supabase / Postgres)

Defined across ordered migrations in `supabase/migrations/`. Apply them in numeric
order in the Supabase SQL editor (or via the CLI). Every table uses **Row Level
Security** — keep RLS policies in mind when adding queries.

| Table | Purpose | Added in |
|-------|---------|----------|
| `profiles` | User profile, `is_jaeger`, `stripe_account_id` | 001 / 004 |
| `listings` | Marketplace game listings (enums: `tier_art`, `produkt_kategorie`, `jagd_methode`, `listing_status`), `barzahlung` | 001 / 005 |
| `inquiries` | Buyer inquiries on a listing | 001 |
| `messages` | Chat messages within an inquiry thread | 002 |
| `orders` | Marketplace orders + Stripe refs, `platform_fee_cents` | 002 / 004 |
| `ratings` | Seller ratings (stars) tied to an order | 002 |
| `favorites` | User's favorited listings | 002 |
| `notifications` | In-app notifications (enum `notification_type`) | 002 |
| `push_subscriptions` | Web-push endpoints per user | 002 |
| `kochkurse`, `kursbuchungen` | Cooking classes + bookings (enum `buchung_status`) | 003 |

Other DB behaviors: a `handle_new_user()` trigger auto-creates a `profiles` row on
signup; an `update_updated_at()` trigger maintains `listings.updated_at`; a public
Storage bucket `listing-images` holds product images. Shared TypeScript mirrors of
these tables live in `src/types/index.ts` — **update both** the migration and the
types when changing the schema.

## API Routes (`src/app/api/`)

- `checkout/route.ts` — **Marketplace** checkout. Validates the buyer, requires the
  seller to have a Stripe Connect account, creates a Checkout session with a 10%
  `application_fee_amount` and `transfer_data.destination` to the seller, and
  inserts a `pending` order.
- `checkout-shop/route.ts` — **Shop** checkout. Re-prices from `PRODUKTE`
  server-side, adds shipping (€5.90, free from €75), tags the session
  `metadata.typ = "shop"`.
- `webhook/route.ts` — Stripe webhook (service-role client). On
  `checkout.session.completed`: ignores `typ === "shop"`; otherwise marks the order
  `paid`, the listing `reserviert`, and creates buyer + seller notifications.
  Reads the **raw** request body for signature verification.
- `stripe-connect/route.ts` — `POST` creates an Express Connect account + onboarding
  link; `GET` returns the account's onboarding/charges/payouts status.
- `push/subscribe/route.ts` — store a browser's push subscription.
- `push/send/route.ts` — send a push (guarded by a `Bearer SUPABASE_SERVICE_ROLE_KEY`
  header; no-ops gracefully if VAPID keys are absent).

## Teaser Mode

`src/middleware.ts` gates the entire site:

- When `SITE_LIVE !== "true"`, all non-static page requests return a hard-coded
  static **teaser landing page** (HTTP 200) and all `/api/*` requests return HTTP
  503. Static files (paths containing a `.`) pass through.
- Set `SITE_LIVE=true` (e.g. in Vercel env vars) and redeploy to bring the full app
  online. Remove/`false` it to return to the teaser.

If you change routing or add pages, remember they are invisible until `SITE_LIVE`
is set. The matcher excludes `_next/static`, `_next/image`, and `favicon.ico`.

## Environment Variables

Copy `.env.local.example` → `.env.local`. Required for full functionality:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_CONTACT_EMAIL` (`npm run generate-vapid`)
- `NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000`)
- `SITE_LIVE` (set to `true` to disable teaser mode — not in the example file)

The Supabase clients fall back to harmless demo placeholders when env vars are
missing, so the app **builds without secrets** (pages just won't have real data).

## Deployment

Designed for **Vercel**. Set the env vars above (notably `SITE_LIVE=true` for the
real site) and add the Supabase webhook/Stripe webhook endpoints. Image domains are
restricted to `*.supabase.co` public storage in `next.config.mjs`.

## Git Workflow

- Commit messages are short and in **German**, describing the user-visible change
  (see `git log` for the established style).
- Do **not** create pull requests unless explicitly requested.
- The marketplace migration files are append-only and numbered; add a new
  `00N_*.sql` rather than editing existing migrations.
