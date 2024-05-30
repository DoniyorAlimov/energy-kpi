"use server";

import { ServerError } from "@/entities/Error";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

const deleteArea = async (id: number) => {
  try {
    const area = await prisma.asset.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!area) {
      throw new Error("The area with the given ID was not found");
    }

    if (area.children.length) {
      throw new Error("The given area has subareas");
    }

    await prisma.asset.delete({ where: { id } });
  } catch (error) {
    const { message } = error as ServerError;
    return { error: message };
  }
  revalidatePath("/models");
};

export default deleteArea;
