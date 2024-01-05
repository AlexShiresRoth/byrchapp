import MDX from "@/components/mdx";
import { getPostData } from "@/lib/fetchers";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string; domain: string };
};

const page = async ({ params }: Props) => {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getPostData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <MDX source={data.mdxSource} />
    </div>
  );
};

export default page;
