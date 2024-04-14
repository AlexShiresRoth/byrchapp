"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function createCategory(name: string | null, postId: string) {
  try {
    if (!name) return console.error("[CATEGORY]: No category name provided.");

    // find the category
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (category) {
      console.log(
        "[CATEGORY]: Did not create new category, category already exists in db.",
      );
      return;
    }

    const res = await prisma.category.create({
      data: {
        name,
        posts: {
          connect: {
            id: postId,
          },
        },
      },
    });

    revalidateTag("category");

    return res;
  } catch (error) {
    console.error("[CATEGORY]: Error creating category", error);
  }
}
