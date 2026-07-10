import Link from "next/link";

const highlights = [
  "Entrada para Benji Comedy Night",
  "Acesso reservado no Ballroom Sheraton",
  "Checkout rápido e confirmação imediata",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-950 via-zinc-900 to-fuchsia-950 px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.35),_transparent_45%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-fuchsia-100">
            Dia 31 de julho
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Benji Comedy Night
            </h1>
            <p className="max-w-2xl text-lg text-zinc-200">
              Ballroom Sheraton. Uma forma simples e direta de reservar o seu lugar para o evento.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/buy"
              className="rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400"
            >
              Comprar bilhete
            </Link>
            <a
              href="#details"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver detalhes do evento
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200">Detalhes do evento</p>
          <div className="mt-4 space-y-4 text-sm text-zinc-100">
            <div>
              <p className="text-zinc-400">Data</p>
              <p className="mt-1 text-base font-semibold">31 de julho</p>
            </div>
            <div>
              <p className="text-zinc-400">Local</p>
              <p className="mt-1 text-base font-semibold">Ballroom Sheraton</p>
            </div>
            <div>
              <p className="text-zinc-400">Includes</p>
              <ul className="mt-2 space-y-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
