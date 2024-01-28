import { cn } from "@/lib/utils";
interface WindowProps<T> {
  color: T;
  bottomColor: T;
}

interface WindowColumnProps extends WindowProps<string> {
  rows: number;
  columns: number;
}

export const SmallWindow = (props: WindowProps<string>) => (
  <span
    className={cn("h-4 w-4 border-b-4", {
      [props.color]: true,
      [props.bottomColor]: true,
    })}
  ></span>
);

export const WindowGrid = (props: WindowProps<string>) => (
  <>
    <span className="-ml-[7px] block h-3 w-[85px] rounded-sm bg-gray-800"></span>
    <div className="grid w-full grid-cols-3 justify-items-center gap-1">
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
    </div>
  </>
);

export const WindowColumns = (props: WindowColumnProps) => (
  <div className="flex w-full flex-col items-center gap-2">
    {Array.from({ length: props.rows }).map((_, i) => (
      <div
        key={(i * 9 * 100) / 36}
        className="flex w-full items-center justify-between"
      >
        {Array.from({ length: props.columns }).map((_, j) => (
          <SmallWindow
            color={props.color}
            bottomColor={props.bottomColor}
            key={j * i + j}
          />
        ))}
      </div>
    ))}
  </div>
);

export const DoorWay = (props: WindowProps<string>) => (
  <div className="absolute bottom-0 left-0 flex w-full justify-around gap-1 px-1">
    <span className={cn("h-3 w-3", { [props.color]: true })} />
    <span
      className={cn("h-5 w-2 border-b-4", {
        [props.color]: true,
        [props.bottomColor]: true,
      })}
    />
    <span className={cn("h-3 w-3", { [props.color]: true })} />
  </div>
);

export const DoorWayTwo = (props: WindowProps<string>) => (
  <div className="absolute bottom-0 left-0 flex w-full flex-col gap-1 px-1">
    <div className="w-full">
      <span
        className={cn("block h-3 w-full rounded-t-full", {
          [props.color]: true,
        })}
      />
    </div>
    <div className="flex w-full justify-around gap-1">
      <span
        className={cn("h-3 w-5 border-b-4", {
          [props.color]: true,
          [props.bottomColor]: true,
        })}
      />
      <span
        className={cn("h-5 w-3 border-b-4", {
          [props.color]: true,
          [props.bottomColor]: true,
        })}
      />
      <span
        className={cn("h-3 w-5 border-b-4", {
          [props.color]: true,
          [props.bottomColor]: true,
        })}
      />
    </div>
  </div>
);

export const DoorWayThree = (
  props: WindowProps<string> & { accent: string },
) => (
  <div className="absolute bottom-0 left-0 flex w-full flex-col gap-1">
    <span
      className={cn("mb-2 h-[3px] w-full", {
        [props.accent]: true,
      })}
    />
    <div className="flex w-full justify-center gap-1">
      <span
        className={cn("h-9 w-6 rounded-tl-full border-b-4", {
          [props.color]: true,
          [props.bottomColor]: true,
        })}
      />
      <span
        className={cn("h-9 w-6 rounded-tr-full border-b-4", {
          [props.color]: true,
          [props.bottomColor]: true,
        })}
      />
    </div>
  </div>
);

type BuildingProps = {
  xCoord: string;
  windowColor: string;
  bottomColor: string;
  borderColor?: string;
};

export const BuildingOne = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative ml-4 flex h-64 w-20 flex-col gap-1 bg-black p-1">
      <span className="absolute bottom-[100%] left-0 h-6 w-full rounded-tr-full bg-black" />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <WindowGrid color={props.windowColor} bottomColor={props.bottomColor} />
      <DoorWay color={props.windowColor} bottomColor={props.bottomColor} />
    </span>
  </div>
);

export const BuildingTwo = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span
      className={cn(
        "relative ml-8 flex h-60 w-16 flex-col items-center  border-t-4  bg-black p-2",
        { [props.borderColor as string]: true },
      )}
    >
      <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
      <WindowColumns
        color={props.windowColor}
        bottomColor={props.bottomColor}
        rows={8}
        columns={2}
      />
      <DoorWayTwo color={props.windowColor} bottomColor={props.bottomColor} />
    </span>
  </div>
);

export const BuildingThree = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative flex h-48 w-20 flex-col  gap-2  bg-black p-2">
      <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
      <WindowColumns
        color={props.windowColor}
        bottomColor={props.bottomColor}
        rows={7}
        columns={3}
      />
      <DoorWay color={props.windowColor} bottomColor={props.bottomColor} />
    </span>
  </div>
);

export const BuildingFour = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0 flex items-end", {
      [props.xCoord]: true,
    })}
  >
    <div className="flex w-10 flex-col items-end">
      <span className="flex h-16 w-1/2 flex-col rounded-tl-full bg-black p-2">
        <span
          className={cn("h-full w-4 rounded-tl-lg", {
            [props.windowColor]: true,
          })}
        ></span>
      </span>
      <span className="flex h-20 w-8 flex-col  gap-2 rounded-tl-lg bg-black p-2">
        <span
          className={cn("border-t-lg h-full w-6", {
            [props.windowColor]: true,
          })}
        ></span>
      </span>
    </div>
    <div className="flex min-w-min flex-col items-center">
      <div className="flex w-full flex-col items-center">
        <span
          className={cn("flex h-6 w-14 items-center justify-center rounded", {
            [props.windowColor]: true,
          })}
        >
          <p className="text-sm font-bold uppercase text-black">Byrch</p>
        </span>
        <span className="flex w-full justify-around">
          <span className="h-3 w-2  bg-black"></span>
          <span className="h-3 w-2  bg-black"></span>
        </span>
      </div>
      <span
        className={cn("h-2 w-full rounded-t-lg", { [props.windowColor]: true })}
      ></span>
      <span className="h-4 w-full bg-black"></span>
      <span className={cn("h-1 w-full ", { [props.windowColor]: true })}></span>
      <span className="h-4 w-full bg-black"></span>
      <span className="relative flex h-56 flex-col items-center  gap-2 bg-black p-2">
        <WindowColumns
          color={props.windowColor}
          bottomColor={props.bottomColor}
          rows={8}
          columns={4}
        />
        <DoorWay color={props.windowColor} bottomColor={props.bottomColor} />
      </span>
    </div>
    <div className="flex w-10 flex-col items-start">
      <span className="flex h-16 w-1/2 flex-col items-center rounded-tr-full bg-black p-2">
        <span
          className={cn("-ml-1.5 h-full w-3 rounded-tr-lg", {
            [props.windowColor]: true,
          })}
        ></span>
      </span>
      <span className="flex h-20 w-8 flex-col  gap-2 rounded-tr-lg bg-black p-2">
        <span
          className={cn("border-t-lg -ml-1.5 h-full w-6 ", {
            [props.windowColor]: true,
          })}
        ></span>
      </span>
    </div>
  </div>
);

export const BuildingFive = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <div className="flex flex-col items-end">
      <span className="relative mr-6 flex h-10 w-14 flex-col items-end gap-2 rounded-t-lg border-t-8 border-t-slate-400 bg-slate-600 p-2">
        <span className="block h-1 w-3/4 rounded bg-slate-400" />
        <span className="block h-1 w-3/4 rounded bg-slate-400" />
        {/* <span className="block h-1 w-3/4 rounded bg-slate-400" /> */}
      </span>
      <span className="relative flex h-64 w-32 flex-col gap-2 rounded-t-md  border-t-8 border-t-slate-400  bg-black p-2">
        <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
        <span className="absolute bottom-[100%] right-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
        <WindowColumns
          color={props.windowColor}
          bottomColor={props.bottomColor}
          rows={8}
          columns={4}
        />
        <DoorWayTwo color={props.windowColor} bottomColor={props.bottomColor} />
      </span>
    </div>
  </div>
);

export const BuildingSix = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0 flex items-end", {
      [props.xCoord]: true,
    })}
  >
    <div className="flex w-28 flex-col items-center">
      <span className="relative flex h-56 w-full flex-col items-center  gap-2 bg-black p-2">
        <WindowColumns
          color="bg-emerald-400"
          bottomColor="border-b-emerald-600"
          rows={7}
          columns={4}
        />
        <DoorWayThree
          accent="bg-emerald-500"
          color="bg-emerald-400"
          bottomColor="border-b-emerald-600"
        />
      </span>
    </div>
  </div>
);

export const Tower = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0 -z-10", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative  flex h-[287px] w-20 flex-col  gap-2  border-t-4 border-t-gray-500 bg-black py-2">
      <span
        className={cn(
          "absolute bottom-[100%] left-0 h-16 w-[100%] rounded-tl-full border-b-4 border-t-4  bg-gray-800",
          {
            [props.borderColor as string]: true,
          },
        )}
      />
      <span className="absolute bottom-[100%] right-5 h-20 w-1 border-t-4 border-t-white bg-gray-400" />
      <span className="absolute bottom-[100%] right-7 h-20 w-1 border-t-4 border-t-orange-500 bg-gray-400" />
      <WindowColumns
        color={props.windowColor}
        bottomColor={props.bottomColor}
        rows={11}
        columns={6}
      />
    </span>
  </div>
);

export const TowerTwo = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0 -z-10 flex flex-col items-center", {
      [props.xCoord]: true,
    })}
  >
    <span className="border-t-blue h-9 w-1 border-t-2 bg-black/90"></span>
    <span className="h-6 w-1/4  border-t-2 border-t-blue-400 bg-black/90"></span>
    <span className="h-4 w-3/4  bg-black/90"></span>
    <span className="relative flex h-[387px] w-24 flex-col gap-2  border-t-4 border-t-gray-500 bg-black py-2">
      <WindowColumns
        color={props.windowColor}
        bottomColor={props.bottomColor}
        rows={13}
        columns={4}
      />
      <DoorWayThree
        color={props.windowColor}
        bottomColor={props.bottomColor}
        accent={props.borderColor as string}
      />
    </span>
  </div>
);
