import { getTopSites } from "@/lib/site-fetchers";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const sites = await getTopSites();

  return (
    <section className="flex w-full justify-center">
      <div className="flex w-full flex-col">
        <div className="my-8 px-8">
          <h2 className="text-3xl font-bold text-stone-800">Top Sites</h2>
        </div>
        {!!sites?.length && (
          <div className="flex border-b-2 border-t-2 border-black">
            {sites.map((site, index) => {
              return (
                <div
                  key={site.id}
                  className={cn(
                    "flex w-1/4 flex-col items-center justify-between gap-2 border-r-2 border-r-black p-8",
                    {
                      "border-l-2 border-l-black bg-indigo-500": index === 0,
                      "bg-emerald-500": index === 1,
                      "bg-amber-500": index === 2,
                      "bg-rose-700": index === 3,
                    },
                  )}
                >
                  <div className="flex h-[90%] w-3/4 flex-col items-start justify-between gap-4">
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
                          className="relative z-10 my-4 flex rounded-xl border-2 border-black bg-amber-500 px-4 py-2 text-white shadow-[5px_5px_0_0_black] transition-all hover:shadow-[0px_0px_0_0_black]"
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
