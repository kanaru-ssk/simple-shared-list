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

type SheetListProps = {
  sheets: Sheet[];
};

export function SheetList({ sheets }: SheetListProps) {
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
              <PopoverMenu />
            </ItemActions>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  );
}

function PopoverMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <Button variant="outline" size="sm" className="w-full">
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="w-full">
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
