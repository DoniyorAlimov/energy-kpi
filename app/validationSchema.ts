import { z } from "zod";

export const areaSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Should be less than 255 characters"),
});
