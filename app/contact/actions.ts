"use server";

import { quoteServices } from "@/lib/site";

export type LeadState = { ok: boolean; message: string } | null;

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

// Public form → validate here (trust boundary) → GoHighLevel webhook, Resend email as fallback.
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  if (clean(formData.get("company"), 100)) return { ok: true, message: "Thanks! We'll be in touch shortly." }; // honeypot

  const lead = {
    name: clean(formData.get("name"), 120),
    phone: clean(formData.get("phone"), 40),
    email: clean(formData.get("email"), 160),
    address: clean(formData.get("address"), 200),
    service: clean(formData.get("service"), 80),
    message: clean(formData.get("message"), 3000),
    source: "jtpropertymaintenance.ca contact form",
  };

  if (!lead.name || !lead.phone || !lead.email) return { ok: false, message: "Please add your name, phone number and email." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { ok: false, message: "Please check your email address." };
  if (lead.phone.replace(/\D/g, "").length < 10) return { ok: false, message: "Please enter a 10-digit phone number." };
  if (lead.service && !(quoteServices as readonly string[]).includes(lead.service)) lead.service = "Other";

  if (await sendToGhl(lead)) return { ok: true, message: "Thanks! Your request is in. We'll call you back shortly." };
  if (await sendEmail(lead)) return { ok: true, message: "Thanks! Your request is in. We'll call you back shortly." };

  console.error("Lead delivery failed: no GHL_WEBHOOK_URL/RESEND_API_KEY configured or both requests failed");
  return { ok: false, message: "Sorry, we couldn't send your message. Please call us at 705-721-9335." };
}

type Lead = Record<string, string>;

async function sendToGhl(lead: Lead) {
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

async function sendEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  if (!key || !to) return false;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const rows = Object.entries(lead).map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM ?? "JT Website <onboarding@resend.dev>",
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
