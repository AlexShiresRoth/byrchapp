import { cn } from "@/lib/utils";

type Props = {
  xCoord: string;
};

const Shrub = (props: Props) => {
  return (
    <div
      className={cn("absolute bottom-0 z-20", {
        [props.xCoord]: true,
      })}
    >
      <span className="relative block h-12 w-2 bg-amber-800">
        <span className="absolute -left-[6px] bottom-4 h-10 w-5 rounded-full bg-emerald-500"></span>
      </span>
    </div>
  );
};

export default Shrub;
