"use client";

import { ListTable } from "@/components/list-table";
import { useList } from "./use-list";

export function View() {
  const { list } = useList();

  if (!list) return;

  return (
    <div>
      <ListTable list={list} />
    </div>
  );
}
