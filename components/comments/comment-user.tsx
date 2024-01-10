import { formatDistance, subDays } from "date-fns";
import UserAvatarAndName from "../user-avatar-name";
import { CommentWithUser } from "./comment";
type Props = {
  commentData: CommentWithUser;
};

const CommentUser = ({ commentData }: Props) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        {!!commentData?.user && (
          <>
            {!!commentData.user.image && (
              <UserAvatarAndName
                image={commentData.user.image}
                name={commentData.user.name}
              />
            )}
          </>
        )}
      </div>
      <p
        datatype={`comment-date-${commentData.createdAt}`}
        className="text-xs text-stone-400"
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
  );
};

export default CommentUser;
