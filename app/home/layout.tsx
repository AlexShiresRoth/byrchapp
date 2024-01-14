import { ReactNode } from "react";

type Props<T> = {
  children: T;
  nav: T;
  feed: T;
  aside: T;
};

const layout = ({ children, nav, feed, aside }: Props<ReactNode>) => {
  return (
    <>
      {nav}
      <div className="flex h-screen items-center justify-center">
        {feed}
        {aside}
      </div>
      {children}
    </>
  );
};

export default layout;
