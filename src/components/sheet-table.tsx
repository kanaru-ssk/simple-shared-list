import {
  ChevronRight,
  DeleteIcon,
  Edit2Icon,
  ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Sheet } from "@/type/sheet";

type SheetTableProps = {
  sheets: Sheet[];
  deleteSheet: (spreadsheetId: string, sheetName: string) => void;
};

export function SheetTable({ sheets, deleteSheet }: SheetTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Spreadsheet ID</TableHead>
          <TableHead>Sheet Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sheets.map((sheet) => (
          <TableRow key={`${sheet.spreadsheetId}-${sheet.sheetName}`}>
            <TableCell>
              <Button variant="link" asChild>
                <Link
                  href={`/list?spreadsheetId=${sheet.spreadsheetId}&sheetName=${sheet.sheetName}`}
                >
                  {sheet.name}
                  <ChevronRight />
                </Link>
              </Button>
            </TableCell>
            <TableCell>
              <span>{sheet.spreadsheetId}</span>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}/edit?usp=sharing`}
                  className="translate-y-0.5"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLinkIcon className="text-blue-500" />
                </a>
              </Button>
            </TableCell>
            <TableCell>{sheet.sheetName}</TableCell>
            <TableCell className="space-x-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() =>
                  deleteSheet(sheet.spreadsheetId, sheet.sheetName)
                }
              >
                <DeleteIcon />
              </Button>
              <Button variant="outline" size="icon">
                <Edit2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
