# 4Prep Web — front-end prototype

The 4Prep Academy web platform (public site, student and parent apps, staff/admin panels) as a clickable front end with mock data. Built from the Figma file **"4Prep — Website + Admin (UI Design)"** and the Technical Specification.

> **Prototype only.** Nothing is saved. Sign-up, signing, uploads and payments are simulated. There is no backend yet.

## Run it

Requirements: Node 20+ and pnpm 10.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm --filter web start   # production build
pnpm lint
pnpm typecheck
```

Open **`/demo`** for a map of every screen.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript
- Tailwind CSS 4. Figma tokens live in `apps/web/src/app/globals.css` under `@theme`
- Plus Jakarta Sans (self-hosted variable font), lucide-react icons
- pnpm workspace: `apps/web` now; room for `apps/api` (NestJS) and `packages/*` later

## Route map

| Area | Routes | Who |
|---|---|---|
| Public site | `/`, `/universities`, `/universities/[slug]`, `/counselor`, `/courses`, `/news`, `/partners` | Visitor |
| Auth | `/register`, `/courses/[groupId]/enrol` | Visitor |
| Plan wizard | `/plan/new/[step]` (about → goal → destination → academics → priorities), `/plan/new/building` | Free user |
| Member area | `/plan`, `/apply/[step]`, `/applicant`, `/book`, `/agreements/[id]`, `/pay/[invoiceId]`, `/pay/[invoiceId]/success` | Lead / applicant |
| Student app | `/app`, `/app/documents`, `/app/classes`, `/app/test-prep`, `/app/[section]` (placeholders) | Student |
| Parent portal | `/family`, `/family/[section]` (placeholders) | Parent |
| Staff panels | `/staff`, `/staff/users`, `/staff/products`, `/staff/catalogue`, `/staff/pipeline`, `/staff/students`, `/staff/students/[id]`, `/staff/classes/[groupId]`, `/staff/[section]` (placeholders) | Super Admin, Mentor Admin, Mentor, Teacher |

Staff roles can be switched with **"Viewing as"** in the staff sidebar.

## Folder layout

```
apps/web/src/
  app/            routes (route groups: (site) (auth) (wizard) (member) (student) (family) (staff))
  components/ui/  design-system primitives (Button, Badge, Card, Field, Progress, Choice…)
  components/     layout (nav, sidebar shell, footer) and shared blocks
  lib/mock/       all mock data — replace with API calls
tools/shoot.py    Playwright screenshot helper for visual checks
```

## Product rules built into the UI

- Free users get the AI Counselor with a limit of 10 messages a day.
- Entry gate: IELTS 6.5 (or equivalent). SAT is **recommended**, not required.
- Destinations: USA, Canada, Europe (Germany, Czechia, Latvia, Poland, Italy). Admins can toggle them in `/staff/products`.
- Payments: card through **J.P. Morgan hosted checkout** (installed at production) or bank transfer. No Payme, Click or Uzum.
- **No refunds.** Agreement text and payment screens say payments are final.
- 4Prep writes essays and opens portal accounts; the student approves.
- A teacher's "target reached" flag notifies the mentor. It never moves a student automatically.

## Differences from Figma

- The payment screen uses J.P. Morgan and bank transfer instead of local wallets.
- Agreement text has no refund clause.
- Member routes are `/applicant`, `/book`, `/agreements/…`, `/pay/…` instead of nesting them under `/app`, because those users have no student account yet.
- The My Students and Student 360 layouts are tightened for scanning.
- The funnel chart uses one hue (a single measure), not several colours.
- Icons come from Lucide and the background blobs are CSS, because Figma image assets could not be downloaded from this environment.

## Next steps

1. i18n: Uzbek, Russian and English (`next-intl`), with Uzbek as the default.
2. API wiring: replace `lib/mock/*` with the NestJS + PostgreSQL API, Better Auth sessions and role guards.
3. Real file uploads, SMS signing codes and the J.P. Morgan checkout redirect.
4. P2 screens: essays, recommendations, offers, visa, messages, staff approvals and audit log.
