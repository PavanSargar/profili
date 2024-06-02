import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const LinkSchema = z
  .object({
    title: z.string().min(1, "Title cannot be empty"),
    url: z.string().url("Please enter a valid URL"),
    clicks: z.number().optional(),
    pin: z.boolean().optional(),
    thumbnail: z.string().url("Please enter a valid URL").optional(),
    order: z.number(),
    active: z.boolean().optional(),
    // user: z.string(),
    // _id: z.string().optional()
  })
  // .refine((schema) => isValidObjectId(schema.user), {
  //   message: "Invalid Mongo ID",
  //   path: ["user"],
  // });

export type LinkType = z.infer<typeof LinkSchema>;
export interface LinkEntity extends LinkType {
  _id: string;
}
