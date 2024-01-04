import { getPostComments } from "@/lib/fetchers";
import { Post } from "@prisma/client";
import Image from "next/image";
import Comment, { CommentWithUser } from "./comment";
import PostCommentClientWrapper from "./post-comment-client-wrapper";

type Props = {
  slug: string;
  domain: string;
  postData: Post;
};

const PostComments = async ({ domain, slug, postData }: Props) => {
  const commentsData = await getPostComments(domain, slug);

  return (
    <PostCommentClientWrapper
      postData={postData}
      commentsCount={commentsData.length}
    >
      {!commentsData.length && (
        <div className="flex flex-col items-center justify-center py-6">
          <Image
            alt="missing post"
            src="https://illustrations.popsy.co/gray/success.svg"
            width={400}
            height={400}
            className="dark:hidden"
          />
          <Image
            alt="missing post"
            src="https://illustrations.popsy.co/white/success.svg"
            width={400}
            height={400}
            className="hidden dark:block"
          />
          <p className="font-title text-2xl text-stone-600 dark:text-stone-400">
            No comments yet.
          </p>
        </div>
      )}
      <div className="min-w-xl flex w-full  flex-col items-center">
        <div className="flex w-11/12 flex-col md:w-full">
          {commentsData.map((comment) => (
            <Comment
              slug={slug}
              key={comment.id}
              commentData={comment as CommentWithUser}
              domain={domain}
            />
          ))}
        </div>
      </div>
    </PostCommentClientWrapper>
  );
};

export default PostComments;
