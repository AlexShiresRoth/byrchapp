import prisma from "@/lib/prisma";
import Link from "next/link";

async function getCategories() {
  const res = await prisma.category.findMany();

  return res.slice(0, 6);
}

const Categories = async () => {
  const categories = await getCategories();
  return (
    <section
      data-type="of-container"
      className="container-snap flex w-full max-w-[100vw] justify-center border-2 border-black"
    >
      <div className="flex min-w-full items-center justify-between overflow-x-scroll md:overflow-x-hidden">
        <div className="bg-black p-2 md:p-4">
          <p className="font-semibold text-white">Categories</p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 px-4">
          {categories.map((category, index) => {
            return (
              <>
                <Link
                  href={`/category/${category.name}`}
                  className="whitespace-nowrap p-2 text-sm font-semibold md:p-4 md:text-base"
                  key={category.id}
                >
                  {category.name}
                </Link>
                {index !== categories.length - 1 && (
                  <span className="text-lg font-semibold">/</span>
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
