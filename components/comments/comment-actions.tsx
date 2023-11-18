"use client";
import {
  checkIfUserLikedComment,
  deleteCommentMutation,
  likeCommentMutation,
} from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Heart, MessagesSquare, Trash } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CommentWithUser } from "./comment";
import { CommentContext } from "./comment-reply-wrapper";

type Props = {
  isMatch: boolean;
  commentData: CommentWithUser;
  commentId: string;
};

const CommentActions = ({ isMatch, commentData, commentId }: Props) => {
  const { setShowReplies, showReplies } = useContext(CommentContext);

  const { likes } = commentData;

  const [hasLiked, setHasLiked] = useState(false);

  const likeComment = async () => await likeCommentMutation(commentId);

  const deleteComment = async () => await deleteCommentMutation(commentId);

  const checkIfLikedComment = useCallback(async () => {
    const liked = await checkIfUserLikedComment(commentId);

    setHasLiked(!!liked?.doesUserLikeComment);
  }, [commentId]);

  useEffect(() => {
    if (likes.length > 0) {
      checkIfLikedComment();
    }
  }, [commentId, likes.length, checkIfLikedComment]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={likeComment}
            title="like"
            className="rounded-full bg-amber-50 p-2 text-stone-600 transition-all hover:text-stone-800 hover:shadow-md"
          >
            <Heart
              size={14}
              className={cn({
                "fill-amber-500 text-amber-500": hasLiked,
                "fill-none": !hasLiked,
              })}
            />
          </button>

          {!!likes.length && (
            <span className="text-sm text-stone-600">{likes.length}</span>
          )}
        </div>
        <button
          title="reply"
          type="button"
          className="text-stone-500 hover:text-stone-600"
          onClick={() => setShowReplies(!showReplies)}
        >
          <MessagesSquare size={14} />
        </button>
      </div>
      {isMatch && !commentData.deleted && (
        <div>
          <button
            type="button"
            className="text-stone-600"
            title="delete comment"
            onClick={deleteComment}
          >
            <Trash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentActions;
