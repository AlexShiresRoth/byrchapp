import { getTopSites } from "@/lib/site-fetchers";
import Image from "next/image";

const page = async () => {
  const sites = await getTopSites();

  console.log(sites);
  return (
    <section className="flex w-full justify-center bg-indigo-600 py-12">
      <div className="w-3/4">
        <div className="my-8">
          <h2 className="text-2xl font-bold text-stone-800">Top Sites</h2>
        </div>
        {!!sites?.length &&
          sites.map((site) => {
            return (
              <div key={site.id}>
                {site.image && (
                  <Image
                    src={site.image as string}
                    width={250}
                    height={250}
                    alt={site.name as string}
                    className="rounded"
                  />
                )}
                <h3 className="text-xl font-semibold">{site.name}</h3>
                <p>{site.description}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default page;
