import { getPostComments } from "@/lib/fetchers";
import Image from "next/image";
import PostCommentClientWrapper from "./post-comment-client-wrapper";

type Props = {
  slug: string;
  domain: string;
};

const PostComments = async ({ domain, slug }: Props) => {
  const commentsData = await getPostComments(domain, slug);
  console.log("commentData", commentsData);

  return (
    <PostCommentClientWrapper>
      {!commentsData.length && (
        <div className="flex flex-col items-center justify-center py-20">
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
          {/* Need to create a modal to show for this  */}
          <button className="mt-1 rounded-md bg-black p-2 text-white">
            Add a comment
          </button>
        </div>
      )}
    </PostCommentClientWrapper>
  );
};

export default PostComments;
