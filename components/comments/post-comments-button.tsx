"use client";
import { MessageCircle } from "lucide-react";

type Props = {
  setOpen: (open: boolean) => void;
  open: boolean;
};

const PostCommentsButton = ({ setOpen, open }: Props) => {
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        title="comment toggle"
        className="fixed bottom-5 right-5 rounded-full bg-amber-300 p-4 shadow-md"
      >
        <MessageCircle width={24} />
      </button>
    </>
  );
};

export default PostCommentsButton;
