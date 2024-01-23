import { cn } from "@/lib/utils";

type Props = {
  xCoord: string;
};

const TreeBig = (props: Props) => {
  return (
    <span
      className={cn("absolute bottom-0 z-20 h-24 w-5 bg-amber-900", {
        [props.xCoord]: true,
      })}
    >
      <span className="absolute -left-4 -top-4 h-14 w-16 rounded-full bg-emerald-500" />
      <span className="absolute -right-[2px] top-1 h-12 w-14 rounded-full bg-emerald-600" />
      <span className="absolute left-[4px] top-1 h-12 w-14 rounded-full bg-emerald-400" />
      <span className="absolute -left-4 top-4 h-14 w-16 rounded-full bg-emerald-500" />
    </span>
  );
};

export default TreeBig;
