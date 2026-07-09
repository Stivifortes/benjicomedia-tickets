export function normalizePurchasePayload(input) {
  if (!input || typeof input !== "object") {
    return { name: "", email: "", phone: "" };
  }

  return {
    name: typeof input.name === "string" ? input.name.trim() : "",
    email: typeof input.email === "string" ? input.email.trim() : "",
    phone: typeof input.phone === "string" ? input.phone.trim() : "",
  };
}

export function validatePurchasePayload(payload) {
  if (!payload.name) {
    return { valid: false, error: "Please provide your full name." };
  }

  if (!payload.email || !payload.email.includes("@")) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  if (!payload.phone) {
    return { valid: false, error: "Please provide your phone number." };
  }

  return { valid: true };
}
