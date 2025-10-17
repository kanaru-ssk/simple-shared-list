import { EllipsisVertical, ExternalLinkIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";
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
  async function copySharedLink() {
    await navigator.clipboard.writeText("TODO: 共有リンクをコピー");
    toast.success("Link copied", { position: "top-center" });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <Button variant="outline" onClick={copySharedLink}>
          <LinkIcon />
          Share
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLinkIcon />
            Spreadsheet
          </a>
        </Button>
        <SheetEditDialog sheet={sheet} editSheet={editSheet} />
        <SheetDeleteDialog onClick={() => deleteSheet(sheet.id)} />
      </PopoverContent>
    </Popover>
  );
}
