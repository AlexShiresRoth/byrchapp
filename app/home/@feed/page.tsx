import ArticleCard, { PostWithSite } from "@/components/article-card";
import { getPosts } from "@/lib/post-fetchers";

/***
 * @todo: Fix link not working with subdomain
 * @description: Nothing happens when navigating to a post from the home page
 * @description: May want to use client side router and wrap the children to keep it server
 */

const page = async () => {
  const posts = await getPosts({ take: 4 });

  if (!posts) return null;

  return (
    <section className="flex w-full flex-1 flex-col items-center  bg-stone-100">
      <div className="flex  flex-col">
        {!!posts?.length && (
          <div className="flex flex-col gap-12">
            {posts.map((post) => {
              return <ArticleCard data={post as PostWithSite} key={post.id} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
