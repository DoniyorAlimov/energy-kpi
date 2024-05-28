import { Asset as Base } from "@prisma/client";

export interface Asset extends Base {
  children: Asset[];
}
