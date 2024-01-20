import { ReactNode } from "react";

type Props<T> = {
  children: T;
  nav: T;
  feed: T;
  hero: T;
  sites: T;
  categories: T;
  authors: T;
  footer: T;
  more_articles: T;
  featured: T;
};

const layout = ({
  children,
  feed,
  hero,
  sites,
  categories,
  authors,
  footer,
  more_articles,
  featured,
}: Props<ReactNode>) => {
  return (
    <main className="container flex max-w-[1600px] flex-wrap">
      {hero}
      {categories}
      <div className="flex w-full flex-col items-center">
        <div className="flex w-3/4 gap-12 py-12">
          {featured}
          {feed}
        </div>
        <div className="w-full">{sites}</div>
        <div className="flex w-3/4">
          {more_articles}
          {authors}
        </div>
      </div>
      {footer}
      {children}
    </main>
  );
};

export default layout;
