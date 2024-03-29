import BlurImage from "@/components/blur-image";
import { getPostData, getSiteData } from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getPostData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

// This code is causing build errors, not finding the posts
export async function generateStaticParams() {
  const allPosts = await prisma.post.findMany({
    select: {
      slug: true,
      site: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
  });

  const allPaths = allPosts
    // @ts-ignore
    .flatMap(({ site, slug }) => [
      // site?.subdomain && {
      //   domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      //   slug,
      // },
      // site?.customDomain && {
      //   domain: site.customDomain,
      //   slug,
      // },
      {
        slug,
      },
    ])
    .filter(Boolean);
  return allPaths;
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getPostData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative m-auto mb-10 h-60 w-full overflow-hidden md:mb-10 md:h-96 md:w-5/6 md:rounded-2xl lg:w-7/12">
          <BlurImage
            alt={data.title ?? "Post image"}
            width={1200}
            height={630}
            className="h-full w-full object-cover"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            src={data.image ?? "/placeholder.png"}
          />
          <div className="absolute bottom-0 left-12 z-10 rounded-t-lg bg-white p-2 px-4">
            <p className="text-sm font-semibold text-amber-500">
              {data.category}
            </p>
          </div>
        </div>
        <div className="m-auto w-11/12 md:w-6/12">
          <p className="m-auto my-5 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
            {toDateString(data.createdAt)}
          </p>
          <h1 className="mb-6 font-title text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
            {data.title}
          </h1>
          <p className="text-md m-auto mb-6 text-stone-600 dark:text-stone-400 md:text-lg">
            {data.description}
          </p>
          {!!data?.summary && (
            <p className="rounded bg-amber-400 p-4">
              <span className="text-xl font-bold">TL;DR</span>
              {` `}
              {data.summary}
            </p>
          )}
        </div>
        <div className="w-11/12 md:w-6/12">
          <a
            // if you are using Github OAuth, you can get rid of the Twitter option
            href={
              data.site?.user?.username
                ? `https://twitter.com/${data.site.user.username}`
                : `https://github.com/${data.site?.user?.gh_username}`
            }
            rel="noreferrer"
            target="_blank"
          >
            <div className="my-8">
              <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-12 md:w-12">
                {data.site?.user?.image ? (
                  <BlurImage
                    alt={data.site?.user?.name ?? "User Avatar"}
                    height={80}
                    src={data.site.user.image}
                    width={80}
                  />
                ) : (
                  <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                    ?
                  </div>
                )}
              </div>
              <div className="text-md ml-3 inline-block align-middle dark:text-white md:text-lg">
                by{" "}
                <span className="font-semibold">{data.site?.user?.name}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
