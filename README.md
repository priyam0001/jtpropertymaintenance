# Property-services site template

A fast, SEO-ready marketing site for local service businesses (lawn care, snow removal, landscaping, cleaning, trades).
Next.js 16 + Tailwind 4 + Framer Motion + Lenis smooth scroll, deployed on Vercel. The contact form sends leads to a
GoHighLevel webhook, with a Resend email as backup.

Live example: J.T. Property Maintenance, Barrie ON.

## New client in one tap

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpriyam0001%2FJTPropertyMaintenance&project-name=client-site&repository-name=client-site&env=GHL_WEBHOOK_URL&envDescription=GoHighLevel%20inbound%20webhook%20URL%20for%20form%20leads%20(type%20none%20to%20set%20it%20up%20later)&envLink=https%3A%2F%2Fgithub.com%2Fpriyam0001%2FJTPropertyMaintenance%2Fblob%2Fmain%2F.env.example)

The button copies this repo into a new GitHub repo, asks for the GHL webhook, and deploys it. The new site shows this
client's content until you edit it. Then:

1. **`lib/site.ts`**: the client. Name, phone, email, city, domain, founding year, hours, hero slides, award (or `null`),
   service cards, service pages, FAQs, SEO titles. Every page reads from here. Never invent reviews, stats or awards.
2. **`public/images/`**: replace the photos, keeping the file names or updating them in `lib/site.ts`. Also replace
   `public/images/og.jpg` (1200×630 share image), `app/icon.png` and `app/apple-icon.png`.
3. **Brand colours**: `@theme` in `app/globals.css` (`--color-primary`, `--color-lime`…), and `themeColor` in `app/layout.tsx`.
4. **Service URLs**: each entry in `serviceDetails` becomes `/services/<slug>`. Old-site URLs get a 301 in `next.config.ts` → `redirects()`.
5. Push to `main`. Vercel redeploys automatically.

Delete `TODO_CLIENT.md` and write the new client's open questions there instead.

## Lead form

Set these in Vercel → Project → Settings → Environment Variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `GHL_WEBHOOK_URL` | GoHighLevel inbound webhook. Leads go here first. |
| `RESEND_API_KEY`, `LEAD_EMAIL`, `LEAD_FROM` | Email fallback. All three are required; `LEAD_FROM` must use a domain verified in Resend. |

With neither route configured, the form shows "please call us" with the client's phone number, so no lead disappears silently.
Add a Vercel Firewall rate-limit rule on `POST /contact` (e.g. 5/min per IP) to keep spam out of the CRM.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # lead validation tests (node --test)
npm run lint
npm run build
```

Server region is Montréal (`yul1`, `vercel.json`). Change it for clients outside Canada/US-east.

## Libraries & references

| Link | Status here |
|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) | **Used.** Smooth scroll (`components/SmoothScroll.tsx`). Carousels use `data-lenis-prevent-horizontal` so touch swipes work. |
| [Vanta](https://github.com/tengbao/vanta) | Looked at, not used. Needs three.js (~150 KB), not updated since 2024, heavy on phone batteries. |
| [React Bits](https://github.com/DavidHDev/react-bits) | Ideas only. Licence is MIT + Commons Clause, which forbids redistributing its components in a template, so no code is copied into this repo. `components/Snow.tsx` is our own code, inspired by its PixelSnow. |
| [Hallmark](https://github.com/Nutlope/hallmark) | Saved for later. Not evaluated yet. |
