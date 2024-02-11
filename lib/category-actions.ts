"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

/**
 *
 * @todo need to check if category already exists in db
 * @todo need to figure out a way to rank categories or just random?
 * @todo need to finish this function
 */
export async function createCategory(name: string, postId: string) {
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
}
