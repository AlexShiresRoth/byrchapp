import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getUsers() {
  return await unstable_cache(async () => {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        image: true,
        name: true,
      },
    });
  });
}
