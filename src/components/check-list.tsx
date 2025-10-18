import { EllipsisVertical } from "lucide-react";
import { Fragment } from "react";
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
import type { CheckListItem as TCheckListItem } from "@/type/check-list";
import { CheckListItemEditDialog } from "./check-list-item-edit-dialog";
import { DeleteDialog } from "./delete-dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type CheckListProps = {
  items: TCheckListItem[];
  updateItem: (item: TCheckListItem) => void;
};

export function CheckList({ items, updateItem }: CheckListProps) {
  return (
    <ItemGroup>
      {items
        .filter((item) => !item.removedAt)
        .map((item, i) => (
          <Fragment key={item.id}>
            {i !== 0 && <ItemSeparator />}
            <CheckListItem item={item} updateItem={updateItem} />
          </Fragment>
        ))}
    </ItemGroup>
  );
}

type CheckListItemProps = {
  item: TCheckListItem;
  updateItem: (item: TCheckListItem) => void;
};

function CheckListItem({ item, updateItem }: CheckListItemProps) {
  function onChangeCheck() {
    const now = new Date().toISOString();
    updateItem({ ...item, updatedAt: now, checked: !item.checked });
  }

  return (
    <Item>
      <ItemActions>
        <Checkbox checked={item.checked} onClick={onChangeCheck} />
      </ItemActions>
      <ItemContent>
        <ItemTitle>{item.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <PopoverMenu item={item} updateItem={updateItem} />
      </ItemActions>
    </Item>
  );
}

type PopoverMenuProps = {
  item: TCheckListItem;
  updateItem: (item: TCheckListItem) => void;
};

function PopoverMenu({ item, updateItem }: PopoverMenuProps) {
  function onClickDelete() {
    const now = new Date().toISOString();
    updateItem({ ...item, updatedAt: now, removedAt: now });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <CheckListItemEditDialog item={item} updateItem={updateItem} />
        <DeleteDialog
          description="The spreadsheet itself will not be deleted."
          onClick={onClickDelete}
        />
      </PopoverContent>
    </Popover>
  );
}
