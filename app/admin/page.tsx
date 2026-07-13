import { getSupabaseAdmin, type Database } from "@/lib/supabase";

type PaidOrder = Database["public"]["Tables"]["payment_links"]["Row"];

export const metadata = {
  title: "Admin | Pagamentos",
  description: "Dashboard para controlar quem já pagou e quantos bilhetes foram comprados.",
};

async function getOrders() {
  const supabase = getSupabaseAdmin();
  const { data, count, error } = await supabase
    .from("payment_links")
    .select("id, url, status, customer_name, customer_email, customer_phone, assigned_at, created_at", {
      count: "exact",
    })
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Não foi possível carregar as encomendas: " + error.message);
  }

  return {
    orders: (data ?? []) as PaidOrder[],
    totalPaid: count ?? 0,
  };
}

export default async function AdminPage() {
  const { orders, totalPaid } = await getOrders();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500">Admin</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Dashboard de pagamentos</h1>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Controle quem já pagou e quantos bilhetes foram comprados para o evento.
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-950 px-5 py-4 text-right text-white sm:px-6">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-300">Bilhetes comprados</p>
              <p className="mt-3 text-4xl font-semibold">{totalPaid}</p>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="px-6 py-4 sm:px-8">
            <h2 className="text-lg font-semibold text-zinc-900">Clientes pagos</h2>
            <p className="mt-1 text-sm text-zinc-600">Lista de clientes com status pago mais recente.</p>
          </div>

          <div className="overflow-x-auto px-6 pb-6 sm:px-8">
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
                      <td className="px-4 py-4">
                        {order.assigned_at ? new Date(order.assigned_at).toLocaleString("pt-BR") : "—"}
                      </td>
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
        </section>
      </div>
    </main>
  );
}
