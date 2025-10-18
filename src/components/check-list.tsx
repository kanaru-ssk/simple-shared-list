import { Fragment } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import type { CheckListItem as TCheckListItem } from "@/type/check-list";
import { Checkbox } from "./ui/checkbox";

type CheckListProps = {
  items: TCheckListItem[];
  onChangeCheck: (item: TCheckListItem) => void;
};

export function CheckList({ items, onChangeCheck }: CheckListProps) {
  return (
    <ItemGroup>
      {items.map((item, i) => (
        <Fragment key={item.id}>
          {i !== 0 && <ItemSeparator />}
          <CheckListItem item={item} onChangeCheck={onChangeCheck} />
        </Fragment>
      ))}
      <Item></Item>
    </ItemGroup>
  );
}

type CheckListItemProps = {
  item: TCheckListItem;
  onChangeCheck: (item: TCheckListItem) => void;
};

function CheckListItem({ item, onChangeCheck }: CheckListItemProps) {
  return (
    <Item>
      <ItemActions>
        <Checkbox checked={item.checked} onClick={() => onChangeCheck(item)} />
      </ItemActions>
      <ItemContent>
        <ItemTitle>{item.name}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
