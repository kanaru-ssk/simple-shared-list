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
    createdAt: v[1].toString(),
    updatedAt: v[2].toString(),
    removedAt: v[3].toString(),
    checked: v[4].toString().toLocaleLowerCase() === "true",
    name: v[5].toString(),
  }));

  function addCheckListItem(item: Omit<CheckListItem, "id">) {
    addItem([
      item.createdAt,
      item.updatedAt,
      item.removedAt,
      item.checked,
      item.name,
    ]);
  }

  function updateCheckListItem(item: CheckListItem) {
    editItem([
      item.id,
      item.createdAt,
      item.updatedAt,
      item.removedAt,
      item.checked,
      item.name,
    ]);
  }

  return (
    <div>
      <div className="flex flex-row-reverse mb-2">
        <CheckListItemAddDialog addItem={addCheckListItem} />
      </div>
      <CheckList items={items} updateItem={updateCheckListItem} />
    </div>
  );
}
