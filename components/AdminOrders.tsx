"use client";

import { useCallback, useEffect, useState } from "react";

type Order = {
  id: number;
  url: string | null;
  status: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  assigned_at: string | null;
  created_at: string | null;
};

const POLL_INTERVAL_MS = 10000;

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) {
        throw new Error(`Falha ao carregar: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data ?? []);
      setLastUpdated(new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="px-6 py-4 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Clientes pagos</h2>
            <p className="mt-1 text-sm text-zinc-600">Atualizado automaticamente a cada 10 segundos.</p>
          </div>
          <button
            type="button"
            onClick={fetchOrders}
            className="inline-flex items-center justify-center rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar agora"}
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl bg-zinc-950 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-300">Bilhetes pagos</p>
            <p className="mt-3 text-4xl font-semibold">{orders.length}</p>
          </div>
          <div className="rounded-3xl bg-zinc-900/90 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-300">Última atualização</p>
            <p className="mt-3 text-2xl font-semibold">{lastUpdated || "Carregando..."}</p>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 overflow-x-auto">
          {orders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-sm text-zinc-600">
              Nenhum bilhete pago encontrado.
            </div>
          ) : (
            <table className="min-w-full border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-sm text-zinc-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Telefone</th>
                  <th className="px-4 py-3">Pago em</th>
                  <th className="px-4 py-3">Link</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className="bg-zinc-50 align-top text-sm text-zinc-700">
                    <td className="px-4 py-4 font-medium text-zinc-900">{index + 1}</td>
                    <td className="px-4 py-4">{order.customer_name ?? "—"}</td>
                    <td className="px-4 py-4">{order.customer_email ?? "—"}</td>
                    <td className="px-4 py-4">{order.customer_phone ?? "—"}</td>
                    <td className="px-4 py-4">{formatDate(order.assigned_at)}</td>
                    <td className="px-4 py-4">
                      {order.url ? (
                        <a href={order.url} target="_blank" rel="noreferrer" className="text-fuchsia-600 hover:underline">
                          Abrir
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
