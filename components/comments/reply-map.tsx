import Comment, { CommentWithUser } from "./comment";

type Props = {
  comment: CommentWithUser;
  slug: string;
};

const ReplyMap = ({ comment, slug }: Props) => {
  return (
    !!comment?.replies?.length &&
    comment.replies.map((reply) => (
      <Comment
        key={reply.id}
        slug={slug}
        commentData={reply as CommentWithUser}
      />
    ))
  );
};

export default ReplyMap;
