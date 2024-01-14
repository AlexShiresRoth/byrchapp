import UserAvatarAndName from "@/components/user-avatar-name";
import { getPosts } from "@/lib/post-fetchers";
import { format } from "date-fns";
import Image from "next/image";

/***
 * @todo: Fix link not working with subdomain
 * @description: Nothing happens when navigating to a post from the home page
 * @description: May want to use client side router and wrap the children to keep it server
 */

const page = async () => {
  const posts = await getPosts();
  return (
    <section className="flex h-full w-full flex-[.60] flex-col items-center justify-center bg-stone-100">
      <div className="flex w-3/4 flex-col ">
        <h2 className="my-4 border-b-2 border-black text-2xl font-bold">
          Featured Articles
        </h2>
        {!!posts?.length && (
          <div className="flex flex-col gap-2">
            {posts.map((post) => {
              return (
                <a
                  href={`${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${post.slug}`}
                  key={post.id}
                  className="flex w-full items-center gap-4 p-4"
                >
                  {!!post.image && (
                    <div>
                      <Image
                        src={post.image as string}
                        width={150}
                        height={150}
                        alt={post.title as string}
                        className="rounded"
                      />
                    </div>
                  )}
                  <div>
                    <UserAvatarAndName
                      image={post.user?.image}
                      name={post.user?.name}
                    />
                    <h3 className="text-xl font-semibold text-stone-600">
                      {post.title}
                    </h3>
                    <p className="text-stone-500">{post.description}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-stone-400">
                        {format(new Date(post.createdAt), "PP")}
                      </p>
                      <span className="text-sm text-amber-400">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;