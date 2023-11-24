import Comment, { CommentWithUser } from "./comment";

type Props = {
  domain: string;
  replies: CommentWithUser[];
  slug: string;
};

const ReplyMap = async ({ replies, slug, domain }: Props) => {
  // check if replies exist
  if (!replies || replies.length === 0) return null;

  return replies.map(async (reply) => {
    return <Reply reply={reply} slug={slug} domain={domain} key={reply.id} />;
  });
};

type ReplyProps = {
  reply: CommentWithUser;
  slug: string;
  domain: string;
};

const Reply = async ({ reply, slug, domain }: ReplyProps) => {
  // const checkIfReplyHasReplies = async (reply: CommentWithUser) => {
  //   if (Object.hasOwn(reply, "replies")) {
  //     return await getPostComments(domain, slug);
  //   }
  // }

  // console.log("checkIfReplyHasReplies", await checkIfReplyHasReplies(reply));

  return <Comment commentData={reply} slug={slug} domain={domain} />;
};

export default ReplyMap;
