import Comment, { CommentWithUser } from "./comment";

type Props = {
  domain: string;
  comment: CommentWithUser;
  slug: string;
};

const ReplyMap = ({ comment, slug, domain }: Props) => {
  return (
    !!comment?.replies?.length &&
    comment.replies.map((reply) => {
      console.log("reply", reply);
      // return <div key={reply.id}>hello</div>;
      return (
        <Comment
          domain={domain}
          key={reply.id}
          slug={slug}
          commentData={reply as CommentWithUser}
        />
      );
    })
  );
};

export default ReplyMap;
