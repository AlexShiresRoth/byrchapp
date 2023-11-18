"use client";
import { getCommmentReplies } from "@/lib/actions";
import { useCallback, useContext, useEffect, useState } from "react";
import { CommentContext } from "./comment-reply-wrapper";

type Props = {
  slug: string;
  commentId: string;
};

const CommentReplies = ({ slug, commentId }: Props) => {
  const { setShowReplies, showReplies } = useContext(CommentContext);
  const [replyTake, setReplyTake] = useState(5);
  const [replySkip, setReplySkip] = useState(0);

  const getCommentReplies = useCallback(async () => {
    const { error, comment } = await getCommmentReplies(
      slug,
      commentId,
      replySkip,
      replyTake,
    );

    if (!comment || error) return;
    if (comment.replies?.length) {
      setReplySkip(replySkip + replyTake);
    }
  }, [commentId, replySkip, replyTake, slug]);

  useEffect(() => {
    if (showReplies) {
      getCommentReplies();
    }
  }, [getCommentReplies, showReplies]);

  // @TODO need reply box
  // @TODO need reply list

  return <div>CommentReplies</div>;
};

export default CommentReplies;
