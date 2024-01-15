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
    <>
      {/* {nav} */}
      <div className="flex h-[90vh] items-center justify-center">
        {feed}
        {aside}
      </div>
      {categories}
      {sites}
      {authors}
      {footer}
      {children}
    </>
  );
};

export default layout;
