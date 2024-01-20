import { getTopSites } from "@/lib/site-fetchers";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const sites = await getTopSites();

  return (
    <section className="flex w-full flex-1 justify-center border-b-2 border-t-2 border-black bg-emerald-500 py-12">
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 w-3/4">
          <h2 className="text-2xl font-bold text-stone-800">Top Sites</h2>
        </div>
        {!!sites?.length && (
          <div className="flex w-3/4 justify-between gap-12 border-black">
            {sites.map((site) => {
              return (
                <div key={site.id} className="flex items-center ">
                  <div className="flex flex-col items-start justify-between gap-6">
                    {site.image && (
                      <Image
                        src={site.image as string}
                        width={250}
                        height={250}
                        alt={site.name as string}
                        className="rounded"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold uppercase">
                        {site.name}
                      </h3>
                      <p className="font-semibold text-stone-800">
                        {site.description}
                      </p>
                      <div className="flex">
                        <Link
                          href={`${
                            process.env.VERCEL_ENV === "development"
                              ? "http"
                              : "https"
                          }://${site?.subdomain}.${
                            process.env.NEXT_PUBLIC_ROOT_DOMAIN
                          }`}
                          className="my-2 flex rounded-xl border-2 border-black bg-amber-500 px-4 py-2 text-sm font-semibold text-black shadow-[5px_5px_0_0_black] transition-all hover:shadow-[0px_0px_0_0_black]"
                        >
                          Visit Site <ArrowRight className="inline-block" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
