import { ReactNode } from "react";

export default function PostLayout({
  children,
  comment,
  content,
  adjacent_posts,
}: {
  children: ReactNode;
  comment: ReactNode;
  content: ReactNode;
  adjacent_posts: ReactNode;
}) {
  return (
    <>
      {children}
      {content}
      {comment}
      {adjacent_posts}
    </>
  );
}
