"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PostCommentsButton from "./post-comments-button";

type Props = {
  children: React.ReactNode;
};

const PostCommentClientWrapper = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <PostCommentsButton setOpen={setOpen} open={open} />
      <div
        className={cn(
          `${
            open ? "translate-x-0" : "translate-x-full"
          } fixed right-0 top-0 z-10 flex max-h-full  min-h-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform`,
        )}
      >
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex w-11/12 flex-col gap-6">
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
              <TextareaAutosize
                placeholder="Add a comment..."
                onClick={() => setShowCommentInput(true)}
                className={cn(
                  `w-full rounded border-0 bg-stone-100 transition-min-height ${
                    showCommentInput ? "min-h-[100px]" : "min-h-[50px]"
                  }`,
                )}
              />
              {showCommentInput && (
                <div className="flex items-center justify-between">
                  <div></div>
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
                    <button className="rounded bg-black p-1 text-sm text-white">
                      Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default PostCommentClientWrapper;
