import Link from "next/link";
import { Button } from "@/components/ui/button";

export function View() {
  return (
    <div>
      <header className="px-5 h-16 flex justify-between items-center">
        <h1 className="font-bold">Simple Shared List</h1>
      </header>

      <main className="max-w-3xl mx-auto p-5">
        <section className="text-center">
          <Button size="lg" asChild>
            <Link href="/sheets">Get Start for Free</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
