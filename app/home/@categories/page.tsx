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
    <section className="flex w-full justify-center gap-8 border-2 border-black">
      <div className="flex w-3/4 items-center justify-between">
        <div className="bg-black p-4">
          <p className="font-semibold text-white">Categories</p>
        </div>
        {FakeCategories.map((category, index) => {
          return (
            <>
              <Link
                href={category.href}
                className="p-4 font-semibold"
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
    </section>
  );
};

export default Categories;
