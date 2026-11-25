"use client";

import { useActionState } from "react";
import { quoteServices } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { submitLead, type LeadState } from "./actions";

const field = "w-full rounded-[10px] border border-line bg-white px-5 py-4 text-[16px] text-dark placeholder:text-body/70 focus:border-primary focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, null);
  const v = state?.values;

  if (state?.ok) {
    return (
      <div role="status" className="rounded-[12px] bg-primary p-10 text-center text-white">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-lime text-dark"><Icon name="check" className="size-7" strokeWidth={3} /></span>
        <p className="mt-5 text-[22px] font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" name="name" autoComplete="name" required value={v?.name} />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" required minLength={10} value={v?.phone} />
      <Field label="Email" name="email" type="email" autoComplete="email" required value={v?.email} />
      <Field label="Address" name="address" autoComplete="street-address" value={v?.address} />
      <label className="sm:col-span-2">
        <span className="mb-2 block text-[15px] font-medium text-dark">Service</span>
        <select name="service" className={field} defaultValue={v?.service ?? ""} key={v?.service}>
          <option value="" disabled>Choose a service</option>
          {quoteServices.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="mb-2 block text-[15px] font-medium text-dark">Message</span>
        <textarea name="message" rows={5} className={field} defaultValue={v?.message} placeholder="Tell us about your property and what you need" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state && !state.ok && <p role="alert" className="text-[15px] font-medium text-red-700 sm:col-span-2">{state.message}</p>}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-4 rounded-[10px] bg-lime py-[11px] pr-[12px] pl-[26px] text-[17px] font-medium text-dark transition-colors hover:bg-primary hover:text-white disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Request"}
          <span className="grid size-[30px] place-items-center rounded-[6px] bg-primary text-lime group-hover:bg-lime group-hover:text-dark">
            <Icon name="arrowUpRight" className="size-4" />
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required = false, autoComplete, minLength, value }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string; minLength?: number; value?: string }) {
  return (
    <label>
      <span className="mb-2 block text-[15px] font-medium text-dark">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} minLength={minLength} defaultValue={value} className={field} />
    </label>
  );
}
