import { unstable_cache } from "next/cache";

type Params<T> = {
  take: T;
};

export async function getPost() {
  return await unstable_cache(
    async () => {
      return await prisma?.post.findFirst({
        where: {
          published: true,
        },
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
    ["post"],
    { revalidate: 900, tags: ["post"] },
  )();
}

export async function getPosts(params: Params<number>) {
  return await unstable_cache(
    async () => {
      return await prisma?.post.findMany({
        where: {
          published: true,
        },
        take: params.take,
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
    ["post"],
    { revalidate: 900, tags: ["post"] },
  )();
}
