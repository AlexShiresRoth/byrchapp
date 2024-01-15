import { ReactNode } from "react";

type Props<T> = {
  children: T;
  nav: T;
  feed: T;
  aside: T;
  sites: T;
};

const layout = ({ children, nav, feed, aside, sites }: Props<ReactNode>) => {
  return (
    <>
      {/* {nav} */}
      <div className="flex h-screen items-center justify-center">
        {feed}
        {aside}
      </div>
      {sites}
      {children}
    </>
  );
};

export default layout;
