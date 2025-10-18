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
  editItem: (item: TCheckListItem) => void;
  onChangeCheck: (item: TCheckListItem) => void;
};

export function CheckList({ items, editItem, onChangeCheck }: CheckListProps) {
  return (
    <ItemGroup>
      {items.map((item, i) => (
        <Fragment key={item.id}>
          {i !== 0 && <ItemSeparator />}
          <CheckListItem
            item={item}
            editItem={editItem}
            onChangeCheck={onChangeCheck}
          />
        </Fragment>
      ))}
    </ItemGroup>
  );
}

type CheckListItemProps = {
  item: TCheckListItem;
  editItem: (item: TCheckListItem) => void;
  onChangeCheck: (item: TCheckListItem) => void;
};

function CheckListItem({ item, editItem, onChangeCheck }: CheckListItemProps) {
  return (
    <Item>
      <ItemActions>
        <Checkbox checked={item.checked} onClick={() => onChangeCheck(item)} />
      </ItemActions>
      <ItemContent>
        <ItemTitle>{item.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <PopoverMenu item={item} editItem={editItem} />
      </ItemActions>
    </Item>
  );
}

type PopoverMenuProps = {
  item: TCheckListItem;
  editItem: (item: TCheckListItem) => void;
};

function PopoverMenu({ item, editItem }: PopoverMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 max-w-48">
        <CheckListItemEditDialog item={item} editItem={editItem} />
        <DeleteDialog
          description="The spreadsheet itself will not be deleted."
          onClick={() => null}
        />
      </PopoverContent>
    </Popover>
  );
}
