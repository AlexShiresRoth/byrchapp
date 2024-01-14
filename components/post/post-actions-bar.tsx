import { MessageCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  commentAction: Dispatch<SetStateAction<boolean>>;
  showComments: boolean;
  commentsCount?: number;
};

const PostActionsBar = ({
  commentAction,
  showComments,
  commentsCount = 0,
}: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full border-b border-t border-stone-100 p-4 md:w-6/12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              title="comment"
              onClick={() => commentAction(!showComments)}
              className="flex items-center gap-2 text-stone-400"
            >
              <MessageCircle size={20} />
              <span className="">
                {/* @TODO will want to handle large numbers */}
                {commentsCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActionsBar;
