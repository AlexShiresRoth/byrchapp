import UserAvatarAndName from "@/components/user-avatar-name";
import { getPost } from "@/lib/post-fetchers";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

/***
 * @todo: Fix link not working with subdomain
 * @description: Nothing happens when navigating to a post from the home page
 * @description: May want to use client side router and wrap the children to keep it server
 */

const page = async () => {
  const post = await getPost();

  if (!post) return null;

  return (
    <section className="flex w-full flex-1 flex-col bg-stone-100">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6">
          <Link
            href={`${
              process.env.VERCEL_ENV === "development" ? "http" : "https"
            }://${post.site?.subdomain}.${
              process.env.NEXT_PUBLIC_ROOT_DOMAIN
            }/${post.slug}`}
            key={post.id}
            className="flex w-full flex-col gap-4 border-2 border-black p-8"
          >
            {!!post.image && (
              <Image
                src={post.image as string}
                width={570}
                height={970}
                alt={post.title as string}
              />
            )}
            <div>
              <UserAvatarAndName
                image={post.user?.image}
                name={post.user?.name}
              />
              <h2 className="text-4xl font-bold text-black">{post.title}</h2>
              <p className="text-stone-500">{post.description}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-stone-400">
                  {format(new Date(post.createdAt), "PP")}
                </p>
                <span className="text-sm text-amber-400">{post.category}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
