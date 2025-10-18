import { CheckList } from "@/components/check-list";
import { CheckListItemAddDialog } from "@/components/check-list-item-add-dialog";
import type { CellValue } from "@/type/cell-value";
import type { CheckListItem } from "@/type/check-list";

type CheckListViewProps = {
  list: CellValue[][];
  addItem: (item: CellValue[]) => void;
  editItem: (item: CellValue[]) => void;
};

export function CheckListView({ list, addItem, editItem }: CheckListViewProps) {
  const items = list.slice(1).map((v) => ({
    id: v[0].toString(),
    name: v[2].toString(),
    checked: v[1].toString().toLocaleLowerCase() === "true",
  }));

  function checkHandler(item: CheckListItem) {
    editItem([item.id, !item.checked, item.name]);
  }

  return (
    <div>
      <div className="flex flex-row-reverse mb-2">
        <CheckListItemAddDialog addItem={addItem} />
      </div>
      <CheckList items={items} onChangeCheck={checkHandler} />
    </div>
  );
}
