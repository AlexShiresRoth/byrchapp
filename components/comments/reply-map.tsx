import { checkIfSessionMatchesUser } from "@/lib/actions";
import { fetchCommentWithReplies } from "@/lib/fetchers";
import { formatDistance, subDays } from "date-fns";
import BlurImage from "../blur-image";
import { CommentWithUser } from "./comment";
import CommentActions from "./comment-actions";
import CommentReplies from "./comment-replies";
import CommentReplyWrapper from "./comment-reply-wrapper";

type Props = {
  domain: string;
  replies: CommentWithUser[];
  slug: string;
};

const ReplyMap = async ({ replies, slug, domain }: Props) => {
  // check if replies exist
  if (!replies) return null;

  return replies.map(async (reply, i, arr) => {
    if (i === arr.length - 1) {
      console.log("last reply", reply);
    }
    return (
      <Reply
        reply={reply}
        slug={slug}
        domain={domain}
        key={reply.id}
        isLast={i === arr.length - 1}
      />
    );
  });
};

type ReplyProps = {
  reply: CommentWithUser;
  slug: string;
  domain: string;
  isLast: boolean;
};

const Reply = async ({ reply, slug, domain, isLast }: ReplyProps) => {
  const { error, isMatch } = await checkIfSessionMatchesUser(
    reply.user.id as string,
  );

  let refetchedReplyWithReplies;

  // is the reply is the last retrieced, we must refetch to get it's replies
  // or just check to see if it has them
  if (isLast) {
    refetchedReplyWithReplies = await fetchCommentWithReplies(
      domain,
      slug,
      reply.id,
      0,
      5,
    );
  }

  console.log("is last", refetchedReplyWithReplies?.replies);
  // console.log("comment with replies", commentWithReplies, "reply", reply);

  const replyWithReplies =
    (refetchedReplyWithReplies as CommentWithUser) || reply;

  //WHY THE FUCK DOES THIS CAUSE AN INFINITE LOOP IF THERE'S NO FUCKING REPLIES IN THE ARRAY!!!>!!?!?>dfsadfzfdD

  return (
    <div
      key={replyWithReplies.id}
      datatype={`comment-${replyWithReplies.id}`}
      className="flex w-full flex-col items-center border-t border-stone-100"
    >
      <div className="flex w-11/12 flex-col gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {!!replyWithReplies?.user && (
              <>
                {!!replyWithReplies.user.image && (
                  <BlurImage
                    width={30}
                    height={30}
                    src={replyWithReplies.user.image as string}
                    alt={replyWithReplies.user.name as string}
                    className="rounded-full"
                  />
                )}

                <p datatype={`commenter-name-${reply.user.name}`}>
                  {replyWithReplies.user.name}
                </p>
              </>
            )}
          </div>
          <p
            datatype={`comment-date-${replyWithReplies.createdAt}`}
            className="text-xs text-stone-400"
          >
            {formatDistance(
              subDays(new Date(replyWithReplies.createdAt), 0),
              new Date(),
              {
                addSuffix: true,
              },
            )}
          </p>
        </div>

        <div datatype="comment-content-container" className="py-2">
          <p>{replyWithReplies.content}</p>
        </div>

        <CommentReplyWrapper>
          <CommentActions
            isMatch={isMatch as boolean}
            commentId={replyWithReplies.id}
            commentData={replyWithReplies}
          />
          <CommentReplies
            slug={slug}
            commentId={replyWithReplies?.id as string}
            replyToCommentUser={replyWithReplies.user.name as string}
          >
            <ReplyMap
              domain={domain}
              replies={replyWithReplies?.replies as CommentWithUser[]}
              slug={slug}
            />
          </CommentReplies>
        </CommentReplyWrapper>
      </div>
    </div>
  );
};

export default ReplyMap;
