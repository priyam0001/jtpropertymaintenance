"use server";

import { validateLead, type Lead } from "@/lib/lead";
import { quoteServices, site } from "@/lib/site";

// values: what the visitor typed, sent back on error so the form can refill itself (React 19 resets forms after an action).
export type LeadState = { ok: boolean; message: string; values?: Lead } | null;

// Public form → validate (trust boundary) → GoHighLevel webhook, Resend email as fallback.
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const thanks = "Thanks! Your request is in. We'll call you back shortly.";
  const check = validateLead(formData, quoteServices);
  if ("spam" in check) return { ok: true, message: thanks };
  if (check.error) return { ok: false, message: check.error, values: check.lead };

  const lead = { ...check.lead, source: `${new URL(site.url).hostname} contact form` };
  if ((await sendToGhl(lead)) || (await sendEmail(lead))) return { ok: true, message: thanks };

  console.error("Lead delivery failed: GHL_WEBHOOK_URL / RESEND_API_KEY+LEAD_EMAIL+LEAD_FROM not configured, or both requests failed");
  return { ok: false, message: `Sorry, we couldn't send your message. Please call us at ${site.phone}.`, values: check.lead };
}

async function sendToGhl(lead: Record<string, string>) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(8000) });
    if (!res.ok) console.error("GHL webhook responded", res.status);
    return res.ok;
  } catch (e) {
    console.error("GHL webhook error", e);
    return false;
  }
}

async function sendEmail(lead: Record<string, string>) {
  const { RESEND_API_KEY: key, LEAD_EMAIL: to, LEAD_FROM: from } = process.env;
  // No LEAD_FROM = not configured: Resend's onboarding@resend.dev sender only delivers to the Resend account owner.
  if (!key || !to || !from) return false;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const rows = Object.entries(lead).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New quote request: ${lead.name}${lead.service ? ` (${lead.service})` : ""}`,
        html: `<table cellpadding="6">${rows}</table>`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("Resend responded", res.status);
    return res.ok;
  } catch (e) {
    console.error("Resend error", e);
    return false;
  }
}
