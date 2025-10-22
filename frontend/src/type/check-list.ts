import { z } from "zod";

export const checkListItemSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  removedAt: z.union([z.literal(""), z.iso.datetime()]),
  checked: z.boolean(),
  name: z.string(),
});
export const checkListSchema = z.array(checkListItemSchema);

export type CheckListItem = z.infer<typeof checkListItemSchema>;
