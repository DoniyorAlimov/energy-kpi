"use server";

import { ServerError } from "@/entities/Error";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

const createArea = async (name: string, parentAssetId: number | null) => {
  try {
    const assetType = await prisma.assetType.findUnique({
      where: { name: "area" },
    });

    const area = await prisma.asset.findUnique({ where: { name } });
    if (area)
      throw new Error("The area with the given name is already exists.");

    await prisma.asset.create({
      data: {
        name,
        parentAssetId,
        assetTypeId: assetType!.id,
      },
    });
  } catch (error) {
    const { message } = error as ServerError;
    return { error: message };
  }
  revalidatePath("/models");
};

export default createArea;
