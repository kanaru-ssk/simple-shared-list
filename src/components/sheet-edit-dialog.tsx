import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { idToUrl, type Sheet, urlToId } from "@/type/sheet";

const formSchema = z.object({
  spreadsheetId: urlToId,
  sheetName: z.string().min(1, "required"),
});

type SheetEditDialogProps = {
  sheet: Sheet;
  editSheet: (sheet: Sheet) => void;
};

export function SheetEditDialog({ sheet, editSheet }: SheetEditDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spreadsheetId: idToUrl(sheet.spreadsheetId),
      sheetName: sheet.sheetName,
    },
  });

  function onSubmit({ spreadsheetId, sheetName }: z.infer<typeof formSchema>) {
    editSheet({ id: sheet.id, spreadsheetId, sheetName });
    form.reset({ spreadsheetId: idToUrl(spreadsheetId), sheetName });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2Icon />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit sheet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="spreadsheetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spreadsheet Link</FormLabel>
                  <FormControl>
                    <Input placeholder={idToUrl("xxx")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sheetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sheet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sheet1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button
                type="submit"
                disabled={!form.formState.isDirty}
                variant="outline"
                size="sm"
              >
                <Edit2Icon />
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
