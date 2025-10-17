import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Sheet } from "@/type/sheet";
import { SheetDeleteDialog } from "./sheet-delete-dialog";
import { SheetEditDialog } from "./sheet-edit-dialog";

type SheetListProps = {
  sheets: Sheet[];
  editSheet: (sheet: Sheet) => void;
  deleteSheet: (id: string) => void;
};

export function SheetList({ sheets, editSheet, deleteSheet }: SheetListProps) {
  return (
    <ItemGroup>
      {sheets.length === 0 && (
        <p className="text-neutral-500 text-center p-4">no item</p>
      )}
      {sheets.map((sheet, i) => (
        <Fragment key={sheet.id}>
          {i !== 0 && <ItemSeparator />}
          <Item>
            <ItemContent className="gap-1">
              <ItemTitle>
                <Button variant="link" asChild>
                  <Link
                    href={`/list?spreadsheetId=${sheet.spreadsheetId}&sheetName=${sheet.sheetName}`}
                    className="hover:bg-neutral-100"
                  >
                    {sheet.name}
                  </Link>
                </Button>
              </ItemTitle>
            </ItemContent>

            <ItemActions>
              <PopoverMenu
                sheet={sheet}
                editSheet={editSheet}
                deleteSheet={deleteSheet}
              />
            </ItemActions>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  );
}

type PopoverMenuProps = {
  sheet: Sheet;
  editSheet: (sheet: Sheet) => void;
  deleteSheet: (id: string) => void;
};

function PopoverMenu({ sheet, editSheet, deleteSheet }: PopoverMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <SheetEditDialog sheet={sheet} editSheet={editSheet} />
        <SheetDeleteDialog onClick={() => deleteSheet(sheet.id)} />
      </PopoverContent>
    </Popover>
  );
}
