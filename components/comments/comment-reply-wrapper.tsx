"use client";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const CommentContext = React.createContext({
  showReplies: false,
  setShowReplies: (val: boolean) => {},
});

const CommentReplyWrapper = ({ children }: Props) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <CommentContext.Provider value={{ showReplies, setShowReplies }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentReplyWrapper;
