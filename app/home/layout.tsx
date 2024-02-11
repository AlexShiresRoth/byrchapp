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
  community: T;
};

const layout = ({
  nav,
  children,
  feed,
  hero,
  sites,
  categories,
  authors,
  footer,
  more_articles,
  featured,
  community,
}: Props<ReactNode>) => {
  return (
    <main className="container flex max-w-[1600px] flex-wrap">
      {nav}
      {hero}
      {categories}
      <div className="flex w-full flex-col items-center">
        <div className="flex w-11/12 flex-col gap-12 py-12 md:w-3/4 md:flex-row">
          {featured}
          {feed}
        </div>
        <div className="w-full">{sites}</div>
        <div className="flex w-11/12 flex-col md:w-3/4 md:flex-row">
          {more_articles}
          {authors}
        </div>
      </div>
      {community}
      {footer}
      {children}
    </main>
  );
};

export default layout;
