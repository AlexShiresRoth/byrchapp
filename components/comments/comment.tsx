import { checkIfSessionMatchesUser, getCommmentReplies } from "@/lib/actions";
import { getNestedReplyLevel } from "@/lib/fetchers";
import { Comment, Like, User } from "@prisma/client";
import CommentActions from "./comment-actions";
import CommentContent from "./comment-content";
import CommentReplies from "./comment-replies";
import CommentReplyWrapper from "./comment-reply-wrapper";
import CommentUser from "./comment-user";
import RepliesModal from "./replies-modal";
import ViewMoreRepliesButton from "./view-more-replies-button";

export type CommentWithUser = Comment & {
  user: User;
  likes: Like[];
  replies?: CommentWithUser[];
};

type Props = {
  domain: string;
  commentData: CommentWithUser;
  slug: string;
  isRecursive?: boolean;
};

const Comment = async ({
  commentData,
  slug,
  domain,
  isRecursive = true,
}: Props) => {
  const { error, isMatch } = await checkIfSessionMatchesUser(
    commentData.user.id as string,
  );

  if (!commentData) return null;

  return (
    <div
      datatype={`comment-${commentData.id}`}
      className="flex w-full flex-col items-end border-t border-stone-100"
    >
      <div className="my-4 flex w-full flex-col gap-2 pl-4">
        <CommentUser commentData={commentData} />
        <CommentContent commentData={commentData} />
        <CommentReplyWrapper>
          <CommentActions
            isMatch={isMatch as boolean}
            commentId={commentData.id}
            commentData={commentData}
          />
          {isRecursive && (
            <CommentReplies
              slug={slug}
              commentId={commentData?.id as string}
              replyToCommentUser={commentData.user.name as string}
            >
              <RepliesModal
                reply={commentData as CommentWithUser}
                slug={slug}
                domain={domain}
              />
              {!!commentData?.replies?.length &&
                commentData.replies.map(async (reply, index) => {
                  const checkIfReplyHasReplies = async () => {
                    if (!Object.hasOwn(reply, "replies")) {
                      const { comment } = await getCommmentReplies(
                        slug,
                        reply.id,
                      );
                      return comment;
                    }
                  };

                  const updatedOrExistingReply =
                    (await checkIfReplyHasReplies()) || reply;

                  const nestedLevel = await getNestedReplyLevel(reply.id);

                  if (nestedLevel > 2) {
                    if (index !== 0) return null;
                    return (
                      <>
                        <ViewMoreRepliesButton
                          replyId={reply.id}
                          key={reply.id}
                        />
                      </>
                    );
                  }
                  return (
                    <>
                      <Comment
                        commentData={updatedOrExistingReply as CommentWithUser}
                        slug={slug}
                        domain={domain}
                        key={updatedOrExistingReply.id}
                      />
                    </>
                  );
                })}
            </CommentReplies>
          )}
        </CommentReplyWrapper>
      </div>
    </div>
  );
};

export default Comment;
