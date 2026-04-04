# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check without emitting

# Database
npx drizzle-kit generate   # Generate migrations from schema changes
npx drizzle-kit migrate    # Apply pending migrations
npx drizzle-kit studio     # Open Drizzle Studio (DB browser)

# Stripe (requires Stripe CLI installed)
npm run stripe:listen:dev  # Forward Stripe webhooks to localhost
```

## Architecture

### Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Drizzle ORM (PostgreSQL via `pg` pool) · better-auth · Stripe · next-safe-action · Zod

### Route structure

```
src/app/
  page.tsx                        # Landing page
  authentication/                 # Login + sign-up (email & Google OAuth)
  new-subscription/               # Paywall shown when trial/plan missing
  activate-demo → /api/activate-demo/route.ts   # Google OAuth demo callback
  (protected)/                    # All authenticated pages
    layout.tsx                    # Shared sidebar, trial banners, DemoUserHandler
    dashboard/  doctors/  patients/  appointments/  subscription/
  api/
    auth/[...all]/                # better-auth handler
    auth/update-demo-status/      # Activates demo trial (POST)
    stripe/webhook/               # Stripe webhook handler
```

### Authentication & session

`src/lib/auth.ts` — better-auth with `customSession` plugin. Every `getSession` call queries `usersTable` + `usersToClinicsTable` to attach `plan`, `isDemoUser`, `demoTrialEndsAt`, and `clinic` to the session user.

**Always use `getSession` from `src/lib/get-session.ts`** (not `auth.api.getSession` directly). It wraps the call in `React.cache()` so multiple server components in the same request share one result instead of hitting the DB repeatedly.

`cookieCache` is enabled with a 5-minute TTL. After updating `isDemoUser` or `plan` in the DB, you must clear the `better-auth.session_data` cookie in the response so the next request re-reads from the DB.

### Authorization

`src/hocs/with-authentication.tsx` — server component HOC used to gate pages:

- `mustHavePlan` → redirects to `/new-subscription` if `hasValidAccess()` returns false
- `mustHaveClinic` → redirects to `/clinic-form` if user has no clinic

`hasValidAccess` (in `src/helpers/demo-trial.ts`) returns true when the user has a paid `plan` OR is a demo user with a valid `demoTrialEndsAt`.

### Server actions

`src/lib/next-safe-action.ts` exports three clients:

- `actionClient` — unauthenticated
- `protectedActionClient` — requires session, provides `ctx.user`
- `protectedWithClinicActionClient` — also requires `ctx.user.clinic.id`

All server actions live in `src/actions/`. They use these clients directly.

### Database

Schema: `src/db/schema.ts`. Single clinic per user (the `usersToClinicsTable` join exists for future multi-clinic support, but code always takes `clinics[0]`).

`src/db/index.ts` exports a single `db` drizzle instance backed by a `pg.Pool` (max 10 connections). Import `db` from `@/db`.

### Demo / trial flow

1. User lands on `/authentication?demo=true`
2. On email signup: `sign-up-form.tsx` calls `/api/auth/update-demo-status` in the `onSuccess` callback before redirecting, which sets `isDemoUser=true`, `demoTrialEndsAt=now+30d`, and clears the session cookie cache.
3. On Google signup: `callbackURL` is `/api/activate-demo`, a GET route handler that does the same then redirects to `/dashboard`.
4. `DemoUserHandler` (client component in the protected layout) handles the localStorage fallback and calls `router.refresh()` after activating so server components re-read the updated session.

### Stripe

- Checkout session created in `src/actions/create-stripe-checkout/`
- Webhook at `/api/stripe/webhook` listens for `invoice.payment_succeeded` (sets `plan: "essential"`) and `customer.subscription.deleted` (clears plan)
- Customer portal URL from `NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL`

### UI conventions

- Tailwind v4 with CSS variables defined in `src/app/globals.css` (oklch palette). **Always use design system tokens** (`bg-primary`, `text-muted-foreground`, `border`, etc.) — never hardcode Tailwind color utilities like `violet-600` or `blue-500`.
- shadcn/ui components in `src/components/ui/`
- Page layout primitives: `PageContainer`, `PageHeader`, `PageHeaderContent`, `PageTitle`, `PageDescription`, `PageActions`, `PageContent` from `src/components/ui/page-container.tsx`
- Toast notifications via `sonner`
- Font: Poppins (`--font-poppins`, mapped to `--font-sans`)

### Loading skeletons

Every page under `(protected)/` has a `loading.tsx` that mirrors the real page layout using `<Skeleton>` components with staggered `animationDelay` inline styles.
