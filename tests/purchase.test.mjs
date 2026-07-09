import test from "node:test";
import assert from "node:assert/strict";
import { normalizePurchasePayload, validatePurchasePayload } from "../lib/purchase.mjs";

test("normalizes customer payload values", () => {
  const payload = normalizePurchasePayload({
    name: "  Alex  ",
    email: "  alex@email.com  ",
    phone: "  +1 555 123 4567  ",
  });

  assert.deepEqual(payload, {
    name: "Alex",
    email: "alex@email.com",
    phone: "+1 555 123 4567",
  });
});

test("rejects incomplete purchase payloads", () => {
  const result = validatePurchasePayload({ name: "", email: "", phone: "" });

  assert.equal(result.valid, false);
  assert.match(result.error, /full name/i);
});
