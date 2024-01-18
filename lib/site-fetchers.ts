import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getTopSites() {
  return await unstable_cache(
    async () => {
      return await prisma.site.findMany({
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    ["top-sites"],
    {
      revalidate: 900,
      tags: ["top-sites"],
    },
  )();
}
