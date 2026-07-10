"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
};

export default function BuyForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/buy", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const payload = await response.json().catch(() => ({ error: "Something went wrong." }));

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error ?? "Erro ao reservar o seu bilhete. Tente novamente mais tarde. Ou compre no RESTAURANTE CARAVELA");
      return;
    }

    window.location.assign(payload.url);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500">Dados do cliente</p>
        <h2 className="text-2xl font-semibold text-zinc-900">Compre o seu bilhete</h2>
        <p className="text-sm text-zinc-600">
          Vamos atribuir o próximo EasyLink disponível automaticamente e redirecionar você para concluir o pagamento.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-zinc-700">
          Nome completo
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-fuchsia-500"
            placeholder="Alex Morgan"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Endereço de email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-fuchsia-500"
            placeholder="alex@email.com"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Número de telefone
          <input
            required
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-fuchsia-500"
            placeholder="+1 555 123 4567"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Atribuindo o seu link..." : "Continuar para o pagamento"}
      </button>

      {message ? (
        <p className={`rounded-2xl border px-4 py-3 text-sm ${status === "error" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
