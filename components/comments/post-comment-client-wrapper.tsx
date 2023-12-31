"use client";
import { addCommentToPost } from "@/lib/actions";
import { cn, toDateString } from "@/lib/utils";
import { Post } from "@prisma/client";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import LoadingDots from "../icons/loading-dots";
import PostActionsBar from "../post/post-actions-bar";
import UserAvatarAndName from "../user-avatar-name";

type Props = {
  children: React.ReactNode;
  postData: Post;
  commentsCount?: number;
};

const PostCommentClientWrapper = ({
  children,
  postData,
  commentsCount,
}: Props) => {
  const session = useSession();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [data, setData] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addCommentToPost({
        postId: postData.id,
        content: data as string,
      });
      setIsLoading(false);
      setData("");
      setShowCommentInput(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <PostActionsBar
        commentAction={setOpen}
        showComments={open}
        commentsCount={commentsCount}
      />
      {open && (
        <div className="flex w-full flex-col md:w-6/12">
          <div className="flex w-full flex-col items-center py-6">
            <div className="flex w-full flex-col gap-6">
              <div
                datatype="comments-header"
                className="flex items-center justify-between"
              >
                <button
                  title="close comments"
                  onClick={() => setOpen(!open)}
                  className="rounded-full bg-stone-100 p-2"
                >
                  <X size={16} />
                </button>
              </div>
              <div
                datatype="new-comment-box"
                className={cn(
                  `w-full rounded border border-stone-100 p-4 ${
                    showCommentInput ? "shadow-xl" : "shadow-none"
                  }`,
                )}
              >
                {showCommentInput && (
                  <p className="pb-2 text-sm text-stone-500">
                    {toDateString(new Date())}
                  </p>
                )}
                <TextareaAutosize
                  value={data}
                  name="comment"
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Add a comment..."
                  onClick={() => setShowCommentInput(true)}
                  className={cn(
                    `w-full rounded border-0 bg-stone-100 transition-min-height ${
                      showCommentInput ? "min-h-[100px]" : "min-h-[50px]"
                    }`,
                  )}
                />
                {showCommentInput && (
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <UserAvatarAndName
                        image={session.data?.user?.image as string}
                        name={session.data?.user?.name as string}
                      />
                    </div>
                    <div
                      datatype="new-comment-box-buttons"
                      className="mt-1 flex items-center gap-4"
                    >
                      <button
                        className="text-sm"
                        onClick={() => setShowCommentInput(false)}
                      >
                        Cancel
                      </button>
                      {isLoading ? (
                        <LoadingDots />
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={!data}
                          className="rounded bg-black p-1 px-2 text-sm text-white transition-colors hover:bg-stone-700"
                        >
                          Comment
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

export default PostCommentClientWrapper;
