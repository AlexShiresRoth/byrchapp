import { checkIfSessionMatchesUser, getCommmentReplies } from "@/lib/actions";
import { getNestedReplyLevel } from "@/lib/fetchers";
import { Comment, Like, User } from "@prisma/client";
import { formatDistance, subDays } from "date-fns";
import BlurImage from "../blur-image";
import CommentActions from "./comment-actions";
import CommentReplies from "./comment-replies";
import CommentReplyWrapper from "./comment-reply-wrapper";
import RepliesModal from "./replies-modal";
import ViewMoreRepliesButton from "./view-more-replies-button";
import UserAvatarAndName from "../user-avatar-name";

export type CommentWithUser = Comment & {
  user: User;
  likes: Like[];
  replies?: CommentWithUser[];
};

type Props = {
  domain: string;
  commentData: CommentWithUser;
  slug: string;
};

const Comment = async ({ commentData, slug, domain }: Props) => {
  const { error, isMatch } = await checkIfSessionMatchesUser(
    commentData.user.id as string,
  );
  // @NOTE This is currently causing an infinite loop, how do we break this?
  if (!commentData) return null;

  return (
    <div
      datatype={`comment-${commentData.id}`}
      className="flex w-full flex-col items-end border-t border-stone-100"
    >
      <div className="flex w-11/12 flex-col gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {!!commentData?.user && (
              <>
                {!!commentData.user.image && (
                  <UserAvatarAndName
                    image={commentData.user.image}
                    name={commentData.user.name}
                  />
                )}
              </>
            )}
          </div>
          <p
            datatype={`comment-date-${commentData.createdAt}`}
            className="text-xs text-stone-400"
          >
            {formatDistance(
              subDays(new Date(commentData.createdAt), 0),
              new Date(),
              {
                addSuffix: true,
              },
            )}
          </p>
        </div>

        <div datatype="comment-content-container" className="py-2">
          <p>{commentData.content}</p>
        </div>

        <CommentReplyWrapper>
          <CommentActions
            isMatch={isMatch as boolean}
            commentId={commentData.id}
            commentData={commentData}
          />
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
              commentData.replies.map(async (reply, index, arr) => {
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

                // will want to pass comment id to a modal to get replies in new modal
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
        </CommentReplyWrapper>
      </div>
    </div>
  );
};

export default Comment;
