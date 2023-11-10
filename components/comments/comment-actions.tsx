"use client";
import { likeCommentMutation } from "@/lib/actions";
import { Heart, MessagesSquare, Trash } from "lucide-react";
import { CommentWithUser } from "./comment";

type Props = {
  isMatch: boolean;
  commentData: CommentWithUser;
  commentId: string;
};

const CommentActions = ({ isMatch, commentData, commentId }: Props) => {
  const { likes } = commentData;

  const likeComment = async () => {
    try {
      const res = await likeCommentMutation(commentId);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={likeComment}
            title="like"
            className="rounded-full bg-amber-50 p-2 text-stone-600 transition-all hover:text-stone-800 hover:shadow-md"
          >
            <Heart size={14} />
          </button>

          {!!likes.length && (
            <span className="text-sm text-stone-600">{likes.length}</span>
          )}
        </div>
        <button
          title="reply"
          type="button"
          className="text-stone-500 hover:text-stone-600"
        >
          <MessagesSquare size={14} />
        </button>
      </div>
      {isMatch && (
        <div>
          <button className="text-stone-600" title="delete comment">
            <Trash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentActions;
