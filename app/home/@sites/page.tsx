import { getTopSites } from "@/lib/site-fetchers";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const sites = await getTopSites();

  return (
    <section className="flex w-full justify-center border-l-2 border-black bg-emerald-500 py-8">
      <div className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-stone-800">Top Sites</h2>
        </div>
        {!!sites?.length && (
          <div className="flex flex-col gap-4 border-black">
            {sites.map((site) => {
              return (
                <div key={site.id} className={cn("flex items-center ")}>
                  <div className="flex items-start justify-between gap-6">
                    {site.image && (
                      <Image
                        src={site.image as string}
                        width={200}
                        height={200}
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
