import { Metadata } from "next";

import { ShortenUrlForm } from "@/components/ShortenUrlForm";

export const metadata: Metadata = {
  title: "brando.wtf | Shorten your link. Question your life choices.",
  description: "brando.wtf is a hobby URL shortener, built with love and Next.js.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            brando<span className="text-rose-500">.wtf</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl">Shorten your link. Question your life choices.</p>
        </div>
        <ShortenUrlForm />
      </div>
      <footer className="mt-auto pt-8 pb-4 text-center">
        <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} brando.wtf. All rights reserved.</p>
      </footer>
    </main>
  );
}
