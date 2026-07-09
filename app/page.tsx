import Link from "next/link";
import Hero from "@/components/Hero";

const details = [
  "Uma noite de comédia com um ambiente acolhedor e animado.",
  "Reserve o seu lugar e venha viver a experiência do Benji Comedy Night.",
  "Detalhes claros do evento para você se planejar com facilidade.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Hero />

        <section id="details" className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-500">Informações do evento</p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Benji Comedy Night
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Reserve o seu ingresso para 31 de julho no Ballroom Sheraton e continue para o pagamento em um só passo.
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-950 p-6 text-white">
            <ul className="space-y-3 text-sm text-zinc-300">
              {details.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/buy"
              className="mt-6 inline-flex rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400"
            >
              Comprar ingresso
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
