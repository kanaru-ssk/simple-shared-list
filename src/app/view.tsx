import Link from "next/link";
import { Button } from "@/components/ui/button";

export function View() {
  return (
    <div>
      <header className="px-5 fixed h-16 w-full flex justify-between items-center bg-white/50 backdrop-blur-sm">
        <h1 className="font-bold">Simple Shared List</h1>
      </header>

      <main className="max-w-3xl mx-auto px-5">
        <section className="text-center space-y-5 h-svh pt-20">
          <p className="font-bold text-xl text-neutral-950">
            最もシンプルな共有リストアプリ
          </p>
          <p className="text-neutral-600">
            データはGoogle Spreadsheetに保存され
            <br />
            可視化やデータ移行が簡単に行なえます。
          </p>
          <p className="text-neutral-600">
            モバイルデバイスからも快適に操作可能です。
          </p>
          <Button size="lg" asChild>
            <Link href="/sheets">Get Start for Free</Link>
          </Button>
        </section>
      </main>

      <footer className="p-5 text-center text-neutral-500 text-xs">
        <p>
          &copy;
          <a
            href="https://github.com/kanaru-ssk"
            target="_blank"
            rel="noreferrer"
            className="ml-1 hover:underline"
          >
            Kanaru
          </a>
        </p>
      </footer>
    </div>
  );
}
