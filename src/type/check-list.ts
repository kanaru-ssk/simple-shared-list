import { z } from "zod";

export const checkListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  checked: z.boolean(),
});
export const checkListSchema = z.array(checkListItemSchema);

export type CheckListItem = z.infer<typeof checkListItemSchema>;
