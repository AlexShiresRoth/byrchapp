import { checkIfSessionMatchesUser } from "@/lib/actions";
import { Comment, Like, User } from "@prisma/client";
import { formatDistance, subDays } from "date-fns";
import BlurImage from "../blur-image";
import CommentActions from "./comment-actions";

export type CommentWithUser = Comment & { user: User } & { likes: Like[] };

type Props = {
  commentData: CommentWithUser;
  domain: string;
  slug: string;
};

const Comment = async ({ commentData, domain, slug }: Props) => {
  const { error, isMatch } = await checkIfSessionMatchesUser(
    commentData.user.id as string,
  );
  return (
    <div
      datatype={`comment-${commentData.id}`}
      className="flex w-full flex-col items-center border-t border-stone-100"
    >
      <div className="flex w-11/12 flex-col gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {!!commentData?.user && (
              <>
                {!!commentData.user.image && (
                  <BlurImage
                    width={30}
                    height={30}
                    src={commentData.user.image as string}
                    alt={commentData.user.name as string}
                    className="rounded-full"
                  />
                )}

                <p datatype={`commenter-name-${commentData.user.name}`}>
                  {commentData.user.name}
                </p>
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

        <div datatype="comment-content-container" className="py-2">
          <p>{commentData.content}</p>
        </div>

        <CommentActions
          isMatch={isMatch as boolean}
          commentId={commentData.id}
          commentData={commentData}
          domain={domain}
          slug={slug}
        />
      </div>
    </div>
  );
};

export default Comment;
