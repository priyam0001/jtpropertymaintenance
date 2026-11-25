# What we need from the client

Replace this checklist with the new client's open questions. Never invent anything: hide a section, or write it
conservatively, until the client confirms it.

## Blocking launch
- [ ] **GoHighLevel webhook URL** (`GHL_WEBHOOK_URL`) so contact-form leads land in GHL.
- [ ] **Resend fallback**: `RESEND_API_KEY`, `LEAD_EMAIL` (which inbox gets leads), and a verified sending domain (`LEAD_FROM`).
- [ ] Confirm the **email address** and **phone number** on the site are monitored.
- [ ] **Domain**: set `site.url` in `lib/site.ts`, and list the old site's URLs that need redirects (`next.config.ts`).

## Content
- [ ] **Reviews**: 3–6 real reviews (name and text, with permission). Leave testimonials out until then.
- [ ] **Service area**: exact towns covered, for local SEO.
- [ ] **Awards or claims**: only with a source you can cite (`award` in `lib/site.ts`, or `null`).
- [ ] **Street address** for Google Business / JSON-LD, or confirm it's a service-area business with no public address.
- [ ] Social media links, if any.

## Brand & photos
- [ ] **Logo**, ideally as a vector (SVG/AI/EPS), plus brand colours (`@theme` in `app/globals.css`).
- [ ] **Photos**: landscape shots at least 2400 px wide for the hero, plus job photos for each service.
- [ ] Permission for anything identifiable in photos (people, other businesses' signs, licence plates).
