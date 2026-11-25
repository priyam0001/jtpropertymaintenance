import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "./lead.ts";

const services = ["Lawn care", "Other"];
const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};
const ok = { name: "Sam", phone: "(705) 555-0100", email: "sam@example.com" };

test("accepts a valid lead and trims it", () => {
  const r = validateLead(form({ ...ok, name: "  Sam  ", service: "Lawn care" }), services);
  assert.ok("lead" in r && !r.error);
  assert.equal(r.lead.name, "Sam");
  assert.equal(r.lead.service, "Lawn care");
});

test("honeypot marks spam", () => {
  assert.deepEqual(validateLead(form({ ...ok, company: "Acme" }), services), { spam: true });
});

test("rejects missing fields, bad email, short phone, and keeps what was typed", () => {
  for (const [fields, msg] of [
    [{ ...ok, name: "" }, /name/],
    [{ ...ok, email: "sam@" }, /email/],
    [{ ...ok, phone: "705-555" }, /10-digit/],
  ] as const) {
    const r = validateLead(form({ ...fields, message: "my driveway" }), services);
    assert.ok("lead" in r && r.error && msg.test(r.error), JSON.stringify(r));
    assert.equal(r.lead.message, "my driveway");
  }
});

test("unknown service becomes Other, long input is capped", () => {
  const r = validateLead(form({ ...ok, service: "<script>", message: "x".repeat(5000) }), services);
  assert.ok("lead" in r);
  assert.equal(r.lead.service, "Other");
  assert.equal(r.lead.message.length, 3000);
});
