import { ReactNode } from "react";

type Props<T> = {
  children: T;
  adjacent_posts: T;
  comments: T;
  content: T;
};

const layout = ({
  children,
  adjacent_posts,
  comments,
  content,
}: Props<ReactNode>) => {
  return (
    <>
      {children}
      {content}
      {comments} {adjacent_posts}
    </>
  );
};

export default layout;
