"use client";
import { getCommmentReplies } from "@/lib/actions";
import { useCallback, useContext, useEffect, useState } from "react";
import { CommentWithUser } from "./comment";
import { CommentContext } from "./comment-reply-wrapper";

type Props = {
  reply: CommentWithUser;
  slug: string;
};

// @TODO  get replies replies from id
const RepliesModal = ({ reply, slug }: Props) => {
  const { showReplyModal } = useContext(CommentContext);
  const [commentWithReplies, setCWR] = useState<CommentWithUser>();

  // @TODO not positive we need to refetch replies, i'm tired so not thinking good
  const fetchReplies = useCallback(async () => {
    const { comment } = await getCommmentReplies(slug, reply.id);
    return setCWR(comment as CommentWithUser);
  }, [reply.id, slug]);

  useEffect(() => {
    if (showReplyModal && !commentWithReplies) {
      fetchReplies();
    }
  }, [showReplyModal, commentWithReplies, fetchReplies]);
  if (!showReplyModal) return null;
  console.log("replies?", commentWithReplies);

  return <div className="fixed top-0">RepliesModal</div>;
};

export default RepliesModal;
