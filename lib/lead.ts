// Pure lead validation (the form's trust boundary). No imports, so `node --test` can run it directly.

export type Lead = { name: string; phone: string; email: string; address: string; service: string; message: string };
export type LeadCheck = { spam: true } | { lead: Lead; error?: string };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export function validateLead(formData: FormData, services: readonly string[]): LeadCheck {
  if (clean(formData.get("company"), 100)) return { spam: true }; // honeypot: humans never see this field

  const lead: Lead = {
    name: clean(formData.get("name"), 120),
    phone: clean(formData.get("phone"), 40),
    email: clean(formData.get("email"), 160),
    address: clean(formData.get("address"), 200),
    service: clean(formData.get("service"), 80),
    message: clean(formData.get("message"), 3000),
  };
  if (lead.service && !services.includes(lead.service)) lead.service = "Other";

  if (!lead.name || !lead.phone || !lead.email) return { lead, error: "Please add your name, phone number and email." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { lead, error: "Please check your email address." };
  if (lead.phone.replace(/\D/g, "").length < 10) return { lead, error: "Please enter a 10-digit phone number." };
  return { lead };
}
