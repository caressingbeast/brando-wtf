import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          404<span className="text-rose-500">.wtf</span>
        </h1>
        <p className="text-zinc-400 text-lg">This shortened URL doesn&apos;t exist or has expired.</p>
        <Button asChild className="bg-rose-500 hover:bg-rose-600">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </main>
  )
}
