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
      <div key={i} className="flex w-full items-center justify-between">
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
};

export const BuildingOne = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative ml-4 flex h-64 w-20 flex-col gap-1 bg-black p-1">
      <span className="absolute bottom-[100%] left-0 h-6 w-full rounded-tr-full bg-black" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
      <DoorWay color="bg-rose-400" bottomColor="border-b-gray-600" />
    </span>
  </div>
);

export const BuildingTwo = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative ml-8 flex h-60 w-16 flex-col items-center  border-t-4 border-indigo-500 bg-black p-2">
      <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
      <WindowColumns
        color="bg-indigo-500"
        bottomColor="border-b-emerald-400"
        rows={8}
        columns={2}
      />
      <DoorWayTwo color="bg-indigo-500" bottomColor="border-b-emerald-400" />
    </span>
  </div>
);

export const BuildingThree = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0", {
      [props.xCoord]: true,
    })}
  >
    <span className="relative ml-6 flex h-48 w-20 flex-col  gap-2  bg-black p-2">
      <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
      <WindowColumns
        color="bg-amber-400"
        bottomColor="border-b-amber-600"
        rows={7}
        columns={3}
      />
      <DoorWay color="bg-amber-400" bottomColor="border-b-amber-600" />
    </span>
  </div>
);

export const BuildingFour = (props: BuildingProps) => (
  <div
    className={cn("absolute bottom-0 flex items-end", {
      [props.xCoord]: true,
    })}
  >
    <div className="flex flex-col items-end">
      <span className="relative flex h-16 w-4 flex-col rounded-tl-full bg-black p-2">
        <span className="h-full w-6 rounded-tl-lg bg-orange-400"></span>
      </span>
      <span className="relative flex h-20 w-8 flex-col  gap-2 rounded-tl-lg bg-black p-2">
        <span className="border-t-lg h-full w-6 bg-orange-400"></span>
      </span>
    </div>
    <div className="flex flex-col items-center">
      <span className="h-2 w-full rounded-t-lg bg-orange-400"></span>
      <span className="h-4 w-full bg-black"></span>
      <span className="h-1 w-full bg-orange-400"></span>
      <span className="h-4 w-full bg-black"></span>
      <span className="relative flex h-56 w-20 flex-col items-center  gap-2  bg-black p-2">
        <WindowColumns
          color="bg-orange-400"
          bottomColor="border-b-orange-600"
          rows={8}
          columns={4}
        />
        <DoorWay color="bg-orange-400" bottomColor="border-b-orange-600" />
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
    <span className="relative ml-6 flex h-[287px] w-20 flex-col  gap-2  border-t-4 border-t-gray-500 bg-black py-2">
      <span className="absolute bottom-[100%] left-0 h-16 w-[100%] rounded-tl-full border-b-4 border-t-4 border-emerald-300 border-b-emerald-300 bg-gray-800" />
      <span className="absolute bottom-[100%] right-5 h-20 w-1 border-t-4 border-t-white bg-gray-400" />
      <span className="absolute bottom-[100%] right-7 h-20 w-1 border-t-4 border-t-orange-500 bg-gray-400" />
      <WindowColumns
        color="bg-gray-800"
        bottomColor="border-emerald-300"
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
        color="bg-gray-800"
        bottomColor="border-blue-300"
        rows={13}
        columns={4}
      />
      <DoorWayThree
        color="bg-gray-800"
        bottomColor="border-blue-300"
        accent="bg-blue-300"
      />
    </span>
  </div>
);
