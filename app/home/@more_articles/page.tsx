import ArticleCard, { PostWithSite } from "@/components/article-card";
import { getPosts } from "@/lib/post-fetchers";

/***
 * @todo: Fix link not working with subdomain
 * @description: Nothing happens when navigating to a post from the home page
 * @description: May want to use client side router and wrap the children to keep it server
 */

const page = async () => {
  const posts = await getPosts({ take: 3 });

  if (!posts) return null;

  /***
   * @todo: This is temp data until we have more posts
   * @description: This is temp data until we have more posts
   ***/
  const repeatedPosts = [...posts, ...posts, ...posts, ...posts];

  return (
    <section className="flex w-2/3 flex-col items-center justify-center bg-stone-100 py-12">
      <div className="mb-4 flex w-full">
        <h2 className="text-2xl font-bold">Recommended</h2>
      </div>
      <div className="flex w-full flex-col">
        {!!posts?.length && (
          <div className="flex flex-col gap-12">
            {repeatedPosts.map((post) => {
              return <ArticleCard data={post as PostWithSite} key={post.id} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
