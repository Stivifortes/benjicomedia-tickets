import AdminOrders from "@/components/AdminOrders";

export const metadata = {
  title: "Admin | Pagamentos",
  description: "Dashboard para controlar quem já pagou e quantos bilhetes foram comprados.",
};

export default function AdminPage() {
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
          </div>
        </header>

        <AdminOrders />
      </div>
    </main>
  );
}
