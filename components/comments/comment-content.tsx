import { CommentWithUser } from "./comment";

type Props = {
  commentData: CommentWithUser;
};

const CommentContent = ({ commentData }: Props) => {
  return (
    <div datatype="comment-content-container" className="py-2">
      <p>{commentData.content}</p>
    </div>
  );
};

export default CommentContent;
