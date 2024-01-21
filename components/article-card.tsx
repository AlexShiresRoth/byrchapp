import { Post, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import UserAvatarAndName from "./user-avatar-name";

export type PostWithSite = Post & { site: { subdomain: string } } & {
  user: User;
};

type Props<T> = {
  data: T;
};

const ArticleCard = ({ data }: Props<PostWithSite>) => {
  return (
    <Link
      href={`${process.env.VERCEL_ENV === "development" ? "http" : "https"}://${
        data.site?.subdomain
      }.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`}
      key={data.id}
      className="flex w-full items-center gap-8"
    >
      {!!data.image && (
        <div>
          <Image
            src={data.image as string}
            width={200}
            height={200}
            alt={data.title as string}
            className="rounded"
          />
        </div>
      )}
      <div>
        <UserAvatarAndName image={data.user?.image} name={data.user?.name} />
        <h3 className="text-xl font-semibold text-stone-600">{data.title}</h3>
        <p className="text-stone-500">{data.description}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-stone-400">
            {format(new Date(data.createdAt), "PP")}
          </p>
          <span className="text-sm text-amber-400">{data.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
