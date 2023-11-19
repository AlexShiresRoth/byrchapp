"use client";
import { addReplyToComment } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import LoadingDots from "../icons/loading-dots";
import { CommentWithUser } from "./comment";
import { CommentContext } from "./comment-reply-wrapper";

type Props = {
  slug: string;
  commentId: string;
  replyToCommentUser: string;
  children?: React.ReactNode;
};

const CommentReplies = ({
  slug,
  commentId,
  replyToCommentUser,
  children,
}: Props) => {
  const { setShowReplies, showReplies } = useContext(CommentContext);
  const [comment, setComment] = useState<CommentWithUser | null>(null);
  const [addingReply, setAddingReply] = useState(false);
  const [replyTake, setReplyTake] = useState(5);
  const [replySkip, setReplySkip] = useState(0);
  const [replyData, setReplyData] = useState("");

  const handleReply = async () => {
    try {
      setAddingReply(true);
      const { error, comment } = await addReplyToComment(commentId, replyData);

      if (error || !comment) {
        toast.error(error);
        setAddingReply(false);
        return;
      }
      setAddingReply(false);
    } catch (error) {
      console.log(error);
      setAddingReply(false);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const { error, comment } = await getCommmentReplies(
  //       slug,
  //       commentId,
  //       replySkip,
  //       replyTake,
  //     );

  //     if (!!comment && !error) {
  //       setComment(comment as CommentWithUser);
  //     }
  //   })();
  // }, [showReplies, slug, commentId, replySkip, replyTake]);

  if (!showReplies) return null;

  return (
    <div className="mt-2 border-l border-l-stone-200 pl-4">
      <p className="mb-1 text-xs text-stone-400">
        Replying to {replyToCommentUser}
      </p>
      <div className="flex flex-col gap-2">
        <ReactTextareaAutosize
          value={replyData}
          name="reply"
          onChange={(e) => setReplyData(e.target.value)}
          placeholder="Add a reply..."
          className={cn(
            `w-full rounded border-0 bg-stone-100 transition-min-height`,
          )}
        />
        <div className="flex w-full justify-end">
          {!addingReply && (
            <button
              type="button"
              className="rounded bg-stone-800 px-2 py-1 text-sm text-stone-100"
              onClick={handleReply}
            >
              Add
            </button>
          )}
          {addingReply && <LoadingDots />}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommentReplies;
