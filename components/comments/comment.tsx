import { Comment, User } from "@prisma/client";
import { formatDistance, subDays } from "date-fns";
import BlurImage from "../blur-image";

type CommentWithUser = Comment & { user: User };

type Props = {
  commentData: CommentWithUser;
};

const Comment = ({ commentData }: Props) => {
  console.log("commentData", commentData);

  return (
    <div
      datatype={`comment-${commentData.id}`}
      className="flex w-full flex-col items-center border-t border-stone-100"
    >
      <div className="flex w-11/12 flex-col gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <BlurImage
              width={30}
              height={30}
              src={commentData.user.image as string}
              alt={commentData.user.name as string}
              className="rounded-full"
            />
            <p datatype={`commenter-name-${commentData.user.name}`}>
              {commentData.user.name}
            </p>
          </div>
          <p
            datatype={`comment-date-${commentData.createdAt}`}
            className="text-sm text-stone-400"
          >
            {formatDistance(
              subDays(new Date(commentData.createdAt), 0),
              new Date(),
              {
                addSuffix: true,
              },
            )}
          </p>
        </div>
        <p>{commentData.content}</p>
      </div>
    </div>
  );
};

export default Comment;
