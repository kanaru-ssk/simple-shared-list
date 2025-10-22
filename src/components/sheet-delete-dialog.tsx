import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SheetDeleteDialogProps = {
  onClick: () => void;
};

export function SheetDeleteDialog({ onClick }: SheetDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete?</DialogTitle>
          <DialogDescription>
            The spreadsheet itself will not be deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="text-right">
          <Button variant="destructive" size="sm" onClick={onClick}>
            <TrashIcon />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
