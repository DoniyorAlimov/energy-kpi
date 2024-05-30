"use server";

import { ServerError } from "@/entities/Error";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

const updateArea = async (id: number, name: string) => {
  try {
    await prisma.asset.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    const { message } = error as ServerError;
    return { error: message };
  }
  revalidatePath("/models");
};

export default updateArea;
