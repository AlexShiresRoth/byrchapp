import { cn } from "@/lib/utils";

type Props = {
  xCoord: string;
};

const Tree = (props: Props) => {
  return (
    <span
      className={cn("absolute bottom-0 z-20 h-16 w-4 bg-amber-800", {
        [props.xCoord]: true,
      })}
    >
      <span className="absolute -left-2 -top-4 h-10 w-10 rounded-full bg-emerald-500" />
      <span className="absolute right-[1px] top-1 h-10 w-10 rounded-full bg-emerald-600" />
      <span className="absolute left-[4px] top-1 h-10 w-10 rounded-full bg-emerald-400" />
    </span>
  );
};

export default Tree;
