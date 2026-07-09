import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { normalizePurchasePayload, validatePurchasePayload } from "@/lib/purchase.mjs";

export async function POST(request: Request) {
  const rawBody = await request.json().catch(() => null);
  const payload = normalizePurchasePayload(rawBody);

  const validation = validatePurchasePayload(payload);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("payment_links")
    .select("id, url")
    .eq("status", "available")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Unable to reserve a payment link right now." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "No payment links are available right now." }, { status: 409 });
  }

  const { data: assignedLink, error: updateError } = await supabase
    .from("payment_links")
    .update({
      status: "assigned",
      customer_name: payload.name,
      customer_email: payload.email,
      customer_phone: payload.phone,
      assigned_at: new Date().toISOString(),
    })
    .eq("id", data.id)
    .select("id, url")
    .single();

  if (updateError || !assignedLink) {
    return NextResponse.json({ error: "The reservation could not be completed." }, { status: 500 });
  }

  return NextResponse.json({ url: assignedLink.url, id: assignedLink.id });
}
