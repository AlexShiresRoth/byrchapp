"use server";

import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import prisma from "@/lib/prisma";
import { getBlurDataURL } from "@/lib/utils";
import { Post, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes("vercel.pub")) {
          return {
            error: "Cannot use vercel.pub subdomain as your custom domain",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);

          /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await prisma.site.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
        }
      } else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else {
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      console.log(
        "Updated site data! Revalidating tags: ",
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`,
      );
      await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-metadata`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  try {
    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.post.create({
    data: {
      siteId: site.id,
      userId: session.user.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

  await revalidateTag("post");

  return response;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }
  try {
    const response = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        summary: data.summary,
        content: data.content,
        category: data.category,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: Post & {
      site: Site;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (await revalidateTag(`${post.site?.customDomain}-posts`),
        await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const response = await prisma.post.delete({
      where: {
        id: post.id,
      },
      select: {
        siteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const addCommentToPost = async (data: {
  postId: string;
  content: string;
}) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  if (!data.postId) {
    return {
      error: "PostID not provided",
    };
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: data.postId,
      },
      include: {
        site: true,
      },
    });

    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }
    const response = await prisma.comment.create({
      data: {
        postId: data.postId,
        userId: session.user.id,
        content: data.content,
      },
    });
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const checkIfSessionMatchesUser = async (userId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return { error: "Not authenticated" };
  }
  if (session.user.id !== userId) {
    return { error: null, isMatch: false };
  }
  return { error: false, isMatch: true };
};

export const checkIfUserLikedComment = async (commentId: string) => {
  const session = await getSession();

  if (!session)
    return {
      error: "Not authenticated",
    };

  try {
    const doesUserLikeComment = await prisma.like.findFirst({
      where: {
        commentId,
        userId: session?.user?.id,
      },
    });

    return {
      doesUserLikeComment,
      error: null,
    };
  } catch (error) {
    return {
      error,
      doesUserLikeComment: null,
    };
  }
};

export const likeCommentMutation = async (commentId: string) => {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        likes: true,
      },
    });

    if (!comment || !comment.postId) {
      return {
        error: "Comment not found",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: comment.postId,
      },
      include: {
        site: true,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
      };
    }

    const foundLike = comment.likes.find(
      (like) => like.userId === session.user.id,
    );
    // Delete like if already liked
    if (foundLike) {
      await prisma.like.delete({
        where: {
          id: foundLike.id,
          user: {
            id: session.user.id,
          },
        },
      });
      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );
      post.site?.customDomain &&
        (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return {
        deleted: true,
      };
    }

    const response = await prisma.like.create({
      data: {
        commentId,
        userId: session.user.id,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteCommentMutation = async (commentId: string) => {
  const session = await getSession();
  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
        userId: session.user.id,
      },
      include: {
        post: true,
      },
    });

    if (!comment || !comment.postId) {
      return {
        error: "Comment not found",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: comment.postId,
      },
      include: {
        site: true,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
      };
    }

    const response = await prisma.comment.update({
      where: {
        id: commentId,
        userId: session.user.id,
      },
      data: {
        deleted: true,
        content: "[comment deleted]",
        deletedContent: comment.content,
        updatedAt: new Date(),
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error) {
    return {
      error: JSON.stringify(error),
    };
  }
};

export async function getCommmentReplies(
  slug: string,
  commentId: string,
  skip: number = 0,
  take: number = 5,
) {
  try {
    const session = await getSession();

    if (!session?.user.id || !session) {
      return {
        error: "Not authenticated",
        comment: null,
      };
    }

    // going to need to recursively get replies
    // this is just getting one level
    const response = await prisma.comment.findUnique({
      where: {
        id: commentId,
        post: {
          slug,
          published: true,
        },
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

    if (!response) {
      return {
        error: "Comment not found",
        comment: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: response?.postId as string,
      },
      include: {
        site: true,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
        comment: null,
      };
    }

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return {
      error: null,
      comment: response,
    };
  } catch (error) {
    return {
      error: JSON.stringify(error),
      comment: null,
    };
  }
}

export async function addReplyToComment(commentId: string, content: string) {
  try {
    const session = await getSession();
    if (!session?.user.id || !session) {
      return {
        error: "Not authenticated",
        comment: null,
      };
    }

    const foundComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: foundComment?.postId as string,
      },
      include: {
        site: true,
      },
    });

    if (!post) {
      return {
        error: "Post not found",
        comment: null,
      };
    }

    const response = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        replyingToCommentId: commentId,
        postId: post.id,
      },
    });

    const updatedCommentWithReply = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        replies: {
          connect: {
            id: response.id,
          },
        },
      },
      include: {
        replies: true,
        user: true,
        likes: true,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return {
      error: null,
      comment: updatedCommentWithReply,
    };
  } catch (error) {
    return {
      error: JSON.stringify(error),
      comment: null,
    };
  }
}

//@DELETE just for testing
export async function deleteAllComments(ids: string[]) {
  try {
    for await (const id of ids) {
      const comment = await prisma.comment.delete({
        where: {
          id,
        },
      });
    }

    return;
  } catch (error) {
    return {
      error: JSON.stringify(error),
    };
  }
}
