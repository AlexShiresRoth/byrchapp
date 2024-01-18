import { ReactNode } from "react";

type Props<T> = {
  children: T;
  nav: T;
  feed: T;
  aside: T;
  sites: T;
  categories: T;
  authors: T;
  footer: T;
};

const layout = ({
  children,
  nav,
  feed,
  aside,
  sites,
  categories,
  authors,
  footer,
}: Props<ReactNode>) => {
  return (
    <main className="container flex max-w-[1600px] flex-col">
      {/* {nav} */}
      {aside}
      {categories}
      <div className="flex w-full border-b-2 border-b-black">
        {feed}
        {sites}
      </div>
      {authors}
      {footer}
      {children}
    </main>
  );
};

export default layout;
