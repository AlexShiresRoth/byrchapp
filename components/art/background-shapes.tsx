"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Shrub from "./shrub";
import Tree from "./tree";
import TreeBig from "./tree-big";

type Props<T> = {
  children: T;
};

/***
 * @@todo: Decide between using canvas and just plain html css
 */
const Canvas = ({ children }: Props<ReactNode>) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // const draw = useCallback(
  //   (ctx: CanvasRenderingContext2D | null | undefined) => {
  //     if (!ctx) return;
  //     ctx.fillStyle = "#000000";
  //     ctx.beginPath();
  //     // Draw the building
  //     ctx.fillStyle = "#000";
  //     ctx.fillRect(50, 0, 50, 300);

  //     // Draw windows
  //     ctx.fillStyle = "#F59E0B";
  //     for (let j = 0; j < 10; j++) {
  //       const x = 55;
  //       const y = 10 + j * 22;
  //       ctx.fillRect(x, y, 15, 15);
  //     }
  //     for (let j = 0; j < 10; j++) {
  //       const x = 80;
  //       const y = 10 + j * 22;
  //       ctx.fillRect(x, y, 15, 15);
  //     }

  //     ctx.fill();
  //   },
  //   [],
  // );

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");

  //   //Our draw come here
  //   draw(context);
  // }, [draw]);

  return (
    <div
      id="canvas"
      className="absolute bottom-0 left-0 z-0 flex h-full w-full items-end border-b-4 border-b-gray-900"
    >
      {children}
    </div>
  );
};

type WindowProps = {
  color: "bg-amber-500" | "bg-rose-400";
  bottomColor: string;
};

const SmallWindow = (props: WindowProps) => (
  <span
    className={cn("h-4 w-4 border-b-4", {
      [props.color]: true,
      [props.bottomColor]: true,
    })}
  ></span>
);

const WindowGrid = (props: WindowProps) => (
  <>
    <span className="-ml-[7px] block h-3 w-[85px] rounded-sm bg-gray-800"></span>
    <div className="grid w-full grid-cols-3 justify-items-center gap-1">
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
      <SmallWindow color={props.color} bottomColor={props.bottomColor} />
    </div>
  </>
);

const BuildingOne = () => (
  <span className="relative ml-4 flex h-64 w-20 flex-col gap-1 bg-black p-1">
    <span className="absolute bottom-[100%] left-0 h-6 w-full rounded-tr-full bg-black" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <WindowGrid color="bg-rose-400" bottomColor="border-b-gray-600" />
    <div className="absolute bottom-0 left-0 flex w-full justify-around gap-1 px-1">
      <span className="h-3 w-3 bg-rose-400" />
      <span className="h-5 w-2 border-b-4 border-b-gray-500 bg-rose-400" />
      <span className="h-3 w-3 bg-rose-400" />
    </div>
  </span>
);

const BackgroundShapes = () => {
  return (
    <Canvas>
      <BuildingOne />
      <TreeBig xCoord="-left-1" />
      <Tree xCoord="left-[7vw]" />
      <TreeBig xCoord="left-[20vw]" />
      <Shrub xCoord="left-[13.5vw]" />
      <span className="relative ml-8 grid h-60 w-16 grid-cols-2 items-center justify-items-center gap-1   bg-black p-1">
        <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
      </span>
      <span className="relative ml-6 grid h-48 w-20 grid-cols-2 items-center justify-items-center gap-1  bg-black p-1">
        <span className="absolute bottom-[100%] left-4 h-4 w-1 border-t-4 border-t-red-700 bg-black" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
        <span className="h-4 w-4  bg-amber-400" />
      </span>
    </Canvas>
  );
};

export default BackgroundShapes;
