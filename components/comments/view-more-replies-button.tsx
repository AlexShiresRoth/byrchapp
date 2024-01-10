"use client";
import { useContext } from "react";
import { CommentContext } from "./comment-reply-wrapper";

type Props = {
  replyId: string;
};
const ViewMoreRepliesButton = ({ replyId }: Props) => {
  const { toggleReplyModal, showReplyModal } = useContext(CommentContext);

  return (
    <div className="flex w-full justify-center" key={replyId}>
      <button
        type="button"
        className="text-sm text-stone-400"
        onClick={() => toggleReplyModal(!showReplyModal)}
      >
        View more replies
      </button>
    </div>
  );
};

export default ViewMoreRepliesButton;
