"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useState } from "react";
import PostCommentsButton from "./post-comments-button";

type Props = {
  children: React.ReactNode;
};

const PostCommentClientWrapper = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PostCommentsButton setOpen={setOpen} open={open} />
      <div
        className={cn(
          `${
            open ? "translate-x-0" : "translate-x-full"
          } fixed right-0 top-0 z-10 flex min-h-full flex-col bg-white shadow-2xl transition-transform`,
        )}
      >
        <div datatype="comments-header" className="m-6">
          <button
            title="close comments"
            onClick={() => setOpen(!open)}
            className="rounded-full bg-stone-100 p-2"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default PostCommentClientWrapper;
