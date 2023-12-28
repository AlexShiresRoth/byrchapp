"use client";
import { getCommmentReplies } from "@/lib/actions";
import { useCallback, useContext, useEffect, useState } from "react";
import Comment, { CommentWithUser } from "./comment";
import { CommentContext } from "./comment-reply-wrapper";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import UserAvatarAndName from "../user-avatar-name";

type Props = {
  reply: CommentWithUser;
  slug: string;
  domain: string;
};

// @TOOD need to do the same thing for comments here
// @TODO should componentize avatar and name
const RepliesModal = ({ reply, slug, domain }: Props) => {
  const { showReplyModal, toggleReplyModal } = useContext(CommentContext);
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
            className="relative mx-auto my-8 flex w-full max-w-3xl flex-col rounded-lg bg-white p-6 shadow-2xl"
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
            <div className="my-2 rounded  bg-amber-50 p-4">
              <p>{commentWithReplies?.content}</p>
              <UserAvatarAndName
                image={commentWithReplies?.user.image}
                name={commentWithReplies?.user.name}
              />
            </div>
            <div className="flex flex-col space-y-4">
              {commentWithReplies?.replies?.length &&
                commentWithReplies?.replies.map((reply) => {
                  console.log("reply", reply);
                  return (
                    <div
                      key={reply.id}
                      className="my-2 flex flex-col space-y-2 border-l border-slate-200 pl-4"
                    >
                      <p className="text-sm text-gray-800">{reply.content}</p>
                      <div className="flex items-center space-x-2">
                        <UserAvatarAndName
                          image={reply.user?.image}
                          name={reply.user?.name}
                        />
                      </div>
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
