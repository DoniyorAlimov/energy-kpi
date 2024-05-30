import { z } from "zod";
import { areaSchema } from "./validationSchema";

export type AreaFormData = z.infer<typeof areaSchema>;
