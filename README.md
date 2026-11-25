# J.T. Property Maintenance website

Marketing site for J.T. Property Maintenance, Barrie ON: lawn care, clean-ups and snow removal.
Live at https://jtpropertymaintenance.vercel.app (production domain: jtpropertymaintenance.ca). Next.js 16 + Tailwind 4 +
Framer Motion + Lenis, deployed on Vercel from `main`.

Built from [site-template](https://github.com/priyam0001/site-template). J.T.'s content lives in
`lib/site.ts`, `public/images/` and `TODO_CLIENT.md`. Features only J.T. needs go here; fixes every site should get go
into the template first, then come in with:

```bash
git fetch template
git merge template/main      # on conflicts in lib/site.ts or images, keep J.T.'s version
```

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
