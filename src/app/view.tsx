"use client";

import { SheetAddDialog } from "@/components/sheet-add-dialog";
import { SheetList } from "@/components/sheet-list";
import { useSheet } from "./use-sheet";

export function View() {
  const { sheets, addSheet, editSheet, deleteSheet } = useSheet();

  return (
    <main>
      <div className="flex flex-row-reverse mb-2">
        <SheetAddDialog addSheet={addSheet} />
      </div>
      <SheetList
        sheets={sheets}
        editSheet={editSheet}
        deleteSheet={deleteSheet}
      />
    </main>
  );
}
