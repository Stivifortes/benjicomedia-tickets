import BuyForm from "@/components/BuyForm";

export const metadata = {
  title: "Buy Ticket | Benji Media",
  description: "Reserve your ticket and get redirected to your payment link.",
};

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl justify-center">
        <BuyForm />
      </div>
    </main>
  );
}
