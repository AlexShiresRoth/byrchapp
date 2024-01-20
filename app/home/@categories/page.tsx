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
    <section className="flex w-full gap-8 border-2 border-black">
      <div className="bg-black p-4">
        <p className="text-xl font-semibold text-white">Categories</p>
      </div>
      <div className="flex w-full items-center justify-between pr-8">
        {FakeCategories.map((category) => {
          return (
            <Link
              href={category.href}
              className="font-semibold"
              key={category.category}
            >
              {category.category}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
