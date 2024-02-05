import Link from "next/link";

type CategoryType<T> = {
  category: T;
  href: T;
};

const FakeCategories: CategoryType<string>[] = [
  {
    category: "Technology",
    href: "/categories/technology",
  },
  { category: "Video Games", href: "/categories/video-games" },
  { category: "Music", href: "/categories/music" },
  { category: "Art", href: "/categories/art" },
  { category: "Science", href: "/categories/science" },
  { category: "Sports", href: "/categories/sports" },
];

const Categories = () => {
  return (
    <section
      data-type="of-container"
      className="container-snap flex w-full max-w-[100vw] justify-center border-2 border-black "
    >
      <div className="flex min-w-full items-center justify-between overflow-x-scroll md:overflow-x-hidden">
        <div className="bg-black p-2 md:p-4">
          <p className="font-semibold text-white">Categories</p>
        </div>
        <div className="flex min-w-full items-center gap-2">
          {FakeCategories.map((category, index) => {
            return (
              <>
                <Link
                  href={category.href}
                  className="whitespace-nowrap p-2 text-sm font-semibold md:p-4 md:text-base"
                  key={category.category}
                >
                  {category.category}
                </Link>
                {index !== FakeCategories.length - 1 && (
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
