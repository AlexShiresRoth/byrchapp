import { unstable_cache } from "next/cache";

export async function getPosts() {
  return await unstable_cache(
    async () => {
      return await prisma?.post.findMany({
        where: {
          published: true,
        },
        take: 10,
        select: {
          site: {
            select: {
              subdomain: true,
            },
          },
          id: true,
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          category: true,
          user: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },

        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    ["posts"],
    { revalidate: 900, tags: ["post"] },
  )();
}
