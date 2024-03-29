import prisma from "@/lib/prisma";
import { replaceExamples, replaceTweets } from "@/lib/remark-plugins";
import { serialize } from "next-mdx-remote/serialize";
import { unstable_cache } from "next/cache";

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        include: { user: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}

export async function getPostData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  console.log(
    "full domain",
    subdomain ? { subdomain } : { customDomain: domain },
  );
  return await unstable_cache(
    async () => {
      const data = await prisma.post.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentPosts] = await Promise.all([
        getMdxSource(data.content!),
        prisma.post.findMany({
          where: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentPosts,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}

export async function getPostComments(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.comment.findMany({
        where: {
          post: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            slug,
            published: true,
          },
          replyingToCommentId: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          likes: true,
          replies: {
            include: {
              user: true,
              likes: true,
              replies: {
                include: {
                  user: true,
                  likes: true,
                },
              },
            },
          },
        },
      });
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}

export const fetchCommentWithReplies = async (
  domain: string,
  slug: string,
  commentId: string,
  skip?: number,
  take?: number,
) => {
  return await unstable_cache(
    async () => {
      const foundComment = await prisma.comment.findUniqueOrThrow({
        where: {
          id: commentId,
        },
        include: {
          user: true,
          likes: true,
          replies: {
            skip,
            take,
            include: {
              user: true,
              likes: true,
              replies: {
                include: {
                  user: true,
                  likes: true,
                },
              },
            },
          },
        },
      });

      return foundComment;
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
};

export async function getNestedReplyLevel(commentId: string) {
  return await unstable_cache(
    async () => {
      let levels = 0;
      async function recursivelyGetComment(id: string): Promise<number> {
        const foundComment = await prisma.comment.findUniqueOrThrow({
          where: {
            id,
          },
        });

        if (foundComment?.replyingToCommentId) {
          levels++;
          return await recursivelyGetComment(foundComment.replyingToCommentId);
        }

        return levels;
      }
      return await recursivelyGetComment(commentId);
    },
    [`${commentId}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${commentId}`],
    },
  )();
}

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets, () => replaceExamples(prisma)],
    },
  });

  return mdxSource;
}
