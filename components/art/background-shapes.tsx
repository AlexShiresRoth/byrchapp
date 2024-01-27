"use client";
import { ReactNode } from "react";
import {
  BuildingFour,
  BuildingOne,
  BuildingThree,
  BuildingTwo,
  Tower,
  TowerTwo,
} from "./buildings";
import FlyingCar, { FlyingCar2, FlyingCar3 } from "./flying-car";
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

const BackgroundShapes = () => {
  return (
    <Canvas>
      {/* Cars */}
      <FlyingCar />
      <FlyingCar2 />
      <FlyingCar3 />
      {/* Buildings */}
      <BuildingOne xCoord="left-2" />
      <BuildingTwo xCoord="left-[6.5vw]" />
      <BuildingThree xCoord="left-[12vw]" />
      <BuildingFour xCoord="left-[82vw]" />
      <Tower xCoord="left-[90.5vw]" />
      <TowerTwo xCoord="left-[75vw]" />
      {/* Trees */}
      <TreeBig xCoord="-right-2" />
      <TreeBig xCoord="-left-1" />
      <Tree xCoord="left-[7vw]" />
      <Tree xCoord="left-[68vw]" />
      <Tree xCoord="left-[72vw]" />
      <Tree xCoord="left-[80vw]" />
      <Tree xCoord="left-[92vw]" />
      <TreeBig xCoord="left-[70vw]" />
      <Shrub xCoord="left-[13.5vw]" />
      <Shrub xCoord="left-[89.5vw]" />
      <Shrub xCoord="left-[83.5vw]" />
    </Canvas>
  );
};

export default BackgroundShapes;
