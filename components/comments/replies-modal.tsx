"use client";
import { checkIfSessionMatchesUser, getCommmentReplies } from "@/lib/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { CommentWithUser } from "./comment";
import CommentActions from "./comment-actions";
import CommentContent from "./comment-content";
import CommentReplies from "./comment-replies";
import { CommentContext } from "./comment-reply-wrapper";
import CommentUser from "./comment-user";

type Props = {
  reply: CommentWithUser;
  slug: string;
  domain: string;
};

const RepliesModal = ({ reply, slug, domain }: Props) => {
  const { showReplyModal, toggleReplyModal } = useContext(CommentContext);
  const [commentWithReplies, setCWR] = useState<CommentWithUser>();
  const [isMatch, setIsMatch] = useState(false);

  const fetchReplies = useCallback(async () => {
    const { comment } = await getCommmentReplies(slug, reply.id);
    return setCWR(comment as CommentWithUser);
  }, [reply.id, slug]);

  const handleSession = useCallback(async () => {
    const { error, isMatch } = await checkIfSessionMatchesUser(
      reply.user.id as string,
    );

    setIsMatch(isMatch as boolean);
    if (error) {
      toast.error(error);
      return;
    }
  }, [reply.user.id]);

  useEffect(() => {
    if (showReplyModal && !commentWithReplies) {
      fetchReplies();
    }
  }, [showReplyModal, commentWithReplies, fetchReplies]);

  useEffect(() => {
    if (showReplyModal) {
      handleSession();
    }
  }, [showReplyModal, handleSession]);

  if (!showReplyModal) return null;

  return createPortal(
    <AnimatePresence>
      {showReplyModal && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative mx-auto my-8 flex w-11/12 max-w-3xl flex-col rounded-lg bg-white p-6 shadow-2xl md:w-full"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Replies</h2>
              <button
                type="button"
                title="Close"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => toggleReplyModal(false)}
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.707 5.293a1 1 0 010 1.414L7.414 18H10a1 1 0 110 2H6a1 1 0 01-1-1v-4a1 1 0 112 0v2.586l11.293-11.293a1 1 0 011.414 0z" />
                </svg>
              </button>
            </div>
            <h3>Original comment</h3>
            <div className="my-2 rounded bg-stone-100 p-4">
              <>
                <CommentUser commentData={reply} />
                <CommentContent commentData={reply} />
                <CommentActions
                  isMatch
                  commentData={reply}
                  commentId={reply.id}
                  allowReply={false}
                />
              </>
            </div>
            <CommentReplies
              slug={slug}
              commentId={reply.id as string}
              replyToCommentUser={reply.user.name as string}
            />
            <div className="flex flex-col space-y-4">
              {commentWithReplies?.replies?.length &&
                commentWithReplies?.replies.map((reply) => {
                  return (
                    <div
                      key={reply.id}
                      className="my-2 border-l border-stone-200 pl-4"
                    >
                      <CommentUser commentData={reply} />
                      <CommentContent commentData={reply} />
                      <CommentActions
                        isMatch
                        commentData={reply}
                        commentId={reply.id}
                        allowReply={false}
                      />
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default RepliesModal;
