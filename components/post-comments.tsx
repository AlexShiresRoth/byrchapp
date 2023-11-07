import { getPostComments } from "@/lib/fetchers";
import { Post } from "@prisma/client";
import Image from "next/image";
import PostCommentClientWrapper from "./post-comment-client-wrapper";

type Props = {
  slug: string;
  domain: string;
  postData: Post;
};

const PostComments = async ({ domain, slug, postData }: Props) => {
  const commentsData = await getPostComments(domain, slug);
  console.log("commentData", commentsData);
  // @TODO need to finish up comment, we got creation working, now we need to get the comments to show up
  return (
    <PostCommentClientWrapper postData={postData}>
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
      <div className="flex flex-col">
        {commentsData.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </div>
    </PostCommentClientWrapper>
  );
};

export default PostComments;
