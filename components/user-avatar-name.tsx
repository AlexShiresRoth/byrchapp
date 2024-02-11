import { cn } from "@/lib/utils";
import BlurImage from "./blur-image";

type Props = {
  image: string | undefined | null;
  name: string | undefined | null;
  imageSize?: "small" | "medium" | "large" | "x-large";
};
const UserAvatarAndName = ({ image, name, imageSize = "small" }: Props) => {
  if (!image && !name) return null;

  const classNames = cn(
    "relative inline-block overflow-hidden rounded-full align-middle",
    { "h-6 w-6": imageSize === "small" },
    { "h-8 w-8": imageSize === "medium" },
    { "h-10 w-10": imageSize === "large" },
    { "h-16 w-16": imageSize === "x-large" },
  );

  const imageClassNames = cn("object-cover w-full h-full");
  return (
    <div className="flex flex-wrap items-center">
      <div className={classNames}>
        {image ? (
          <BlurImage
            alt={name ?? "User Avatar"}
            src={image}
            fill={true}
            className={imageClassNames}
          />
        ) : (
          <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
            ?
          </div>
        )}
      </div>
      {name && (
        <div className="text-md ml-3 inline-block align-middle dark:text-white md:text-lg">
          <span className="text-sm text-stone-500">{name}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatarAndName;
