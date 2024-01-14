import { cn } from "@/lib/utils";
import BlurImage from "./blur-image";

type Props = {
  image: string | undefined | null;
  name: string | undefined | null;
  imageSize?: "small" | "medium" | "large";
};
const UserAvatarAndName = ({ image, name, imageSize = "small" }: Props) => {
  if (!image && !name) return null;

  const classNames = cn(
    "relative inline-block  overflow-hidden rounded-full align-middle",
    { "md:h-6 md:w-6": imageSize === "small" },
    { "md:h-8 md:w-8": imageSize === "medium" },
    { "md:h-10 md:w-10": imageSize === "large" },
  );
  return (
    <div className="flex flex-wrap items-center">
      <div className={classNames}>
        {image ? (
          <BlurImage
            alt={name ?? "User Avatar"}
            src={image}
            height={
              imageSize === "small" ? 30 : imageSize === "medium" ? 80 : 100
            }
            width={
              imageSize === "small" ? 30 : imageSize === "medium" ? 80 : 100
            }
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
