/** biome-ignore-all lint/suspicious/noArrayIndexKey: reactで操作しないのでignore */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ListTableProps = {
  list: string[][];
};

export function ListTable({ list }: ListTableProps) {
  const headerRow = list[0];
  const bodyRows = list.slice(1);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headerRow.map((item, i) => (
            <TableHead key={i}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodyRows.map((cols, i) => (
          <TableRow key={i}>
            {cols.map((item, j) => (
              <TableCell key={`${i}-${j}`}>{item}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
