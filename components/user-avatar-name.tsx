import BlurImage from "./blur-image";

type Props = {
  image: string | undefined;
  name: string | undefined;
};
const UserAvatarAndName = ({ image, name }: Props) => {
  if (!image && !name) return null;
  return (
    <div className="flex items-center">
      <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-8 md:w-8">
        {image ? (
          <BlurImage
            alt={name ?? "User Avatar"}
            height={80}
            src={image}
            width={80}
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
