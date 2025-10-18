"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ListTable } from "@/components/list-table";
import { useList } from "./use-list";

export function View() {
  const searchParams = useSearchParams();
  const sheetName = searchParams.get("sheetName");
  const { list } = useList();

  if (!list) return;

  return (
    <div>
      <header className="px-5 h-16 flex justify-between items-center">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <span className="font-bold">{sheetName}</span>
        <span />
      </header>

      <main className="max-w-3xl mx-auto p-5">
        <ListTable list={list} />
      </main>
    </div>
  );
}
