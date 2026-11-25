# Property-services site template

A fast, SEO-ready marketing site for local service businesses (lawn care, snow removal, landscaping, cleaning, trades).
Next.js 16 + Tailwind 4 + Framer Motion + Lenis smooth scroll, deployed on Vercel. The contact form sends leads to a
GoHighLevel webhook, with a Resend email as backup.

Live example built from it: [J.T. Property Maintenance](https://jtpropertymaintenance.vercel.app), Barrie ON.
This repo ships with placeholder content ("Your Company Name", 555 phone number, generated images) so nothing from a real client leaks into a new site.

## Start a client site

Each client gets its own repo and Vercel project. This repo stays generic: fixes and features every site should get
go here first; anything only one client needs goes in that client's repo.

```bash
git clone https://github.com/priyam0001/property-site-template.git acme-lawn-care
cd acme-lawn-care
git remote rename origin template          # keep a link back to the template
git remote add origin https://github.com/priyam0001/acme-lawn-care.git   # create this empty repo on GitHub first
git push -u origin main
```

Then import the new repo in Vercel (Add New → Project) and set the environment variables below.

Cloning keeps the template's history, so later template fixes merge cleanly into the client site:

```bash
git fetch template
git merge template/main      # conflicts are usually only in lib/site.ts or images; keep the client's version
```

GitHub's "Use this template" button and the Vercel button below also work, but they start a fresh history, so later
template fixes have to be copied by hand.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpriyam0001%2Fproperty-site-template&project-name=client-site&repository-name=client-site&env=GHL_WEBHOOK_URL&envDescription=GoHighLevel%20inbound%20webhook%20URL%20for%20form%20leads%20(type%20none%20to%20set%20it%20up%20later)&envLink=https%3A%2F%2Fgithub.com%2Fpriyam0001%2Fproperty-site-template%2Fblob%2Fmain%2F.env.example)

## Make it the client's

The site shows placeholder content until you edit it:

1. **`lib/site.ts`**: the client. Name, phone, email, city, domain, founding year, hours, hero slides, award (or `null`),
   service cards, service pages, FAQs, SEO titles. Every page reads from here. Never invent reviews, stats or awards.
2. **`public/images/`**: replace the placeholder images, keeping the file names or updating them in `lib/site.ts` and the pages (`public/images/CREDITS.md` lists what each one is for). Also replace
   `public/images/og.jpg` (1200×630 share image), `app/icon.png` and `app/apple-icon.png`.
3. **Brand colours**: `@theme` in `app/globals.css` (`--color-primary`, `--color-lime`…), and `themeColor` in `app/layout.tsx`.
4. **Service URLs**: each entry in `serviceDetails` becomes `/services/<slug>`. Old-site URLs get a 301 in `next.config.ts` → `redirects()`.
5. Push to `main`. Vercel redeploys automatically.

Work through `TODO_CLIENT.md` with the client and keep it as their list of open questions.

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

## Modern web guidance

When you use this template for a new client, go through Chrome's [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) before you add or change a feature (menus, carousels, accordions, forms, images, animations). Each guide gives the native, standards-based pattern and the fallbacks it needs. Search and read guides from the terminal:

```bash
npx -y modern-web-guidance@latest search "mobile navigation drawer"
npx -y modern-web-guidance@latest retrieve "navigation-drawer"
```

On Windows use `npx.cmd`. Claude Code users can install the plugin instead: `claude plugin marketplace add GoogleChrome/modern-web-guidance`, then `claude plugin install modern-web-guidance@googlechrome`.

## Libraries & references

| Link | Status here |
|---|---|
| [Lenis](https://github.com/darkroomengineering/lenis) | **Used.** Smooth scroll (`SmoothScroll` in `components/motion.tsx`). Carousels use `data-lenis-prevent-horizontal` so touch swipes work. |
| [Vanta](https://github.com/tengbao/vanta) | Looked at, not used. Needs three.js (~150 KB), not updated since 2024, heavy on phone batteries. |
| [React Bits](https://github.com/DavidHDev/react-bits) | Ideas only. Licence is MIT + Commons Clause, which forbids redistributing its components in a template, so no code is copied into this repo. `components/Snow.tsx` is our own code, inspired by its PixelSnow. |
| [Hallmark](https://github.com/Nutlope/hallmark) | Saved for later. Not evaluated yet. |
