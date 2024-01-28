"use client";
import { ReactNode } from "react";
import {
  BuildingFive,
  BuildingFour,
  BuildingOne,
  BuildingSix,
  BuildingThree,
  BuildingTwo,
  Tower,
  TowerTwo,
} from "./buildings";
import { Cloud, CloudMedium, CloudSmall } from "./clouds";
import FlyingCar, { FlyingCar2, FlyingCar3 } from "./flying-car";
import Shrub from "./shrub";
import Tree from "./tree";
import TreeBig from "./tree-big";

type Props<T> = {
  children: T;
};

const Canvas = ({ children }: Props<ReactNode>) => {
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
      {/* Clouds */}
      <CloudSmall />
      <CloudMedium />
      <Cloud />
      {/* Cars */}
      <FlyingCar />
      <FlyingCar2 />
      <FlyingCar3 />
      {/* Buildings */}
      <BuildingOne
        xCoord="left-2"
        windowColor="bg-rose-400"
        bottomColor="border-b-gray-600"
      />
      <BuildingTwo
        xCoord="left-[6.5vw]"
        windowColor="bg-indigo-500"
        bottomColor="border-b-emerald-300"
        borderColor="border-indigo-500"
      />
      <BuildingThree
        xCoord="left-[14vw]"
        windowColor="bg-amber-400"
        bottomColor="border-b-amber-600"
      />
      <BuildingFour
        xCoord="left-[82vw]"
        windowColor="bg-orange-400"
        bottomColor="border-b-orange-600"
      />
      <BuildingFive
        xCoord="left-[65vw]"
        windowColor="bg-sky-400"
        bottomColor="border-b-sky-500"
      />
      <BuildingSix
        xCoord="left-[20vw]"
        windowColor="bg-emerald-400"
        bottomColor="border-b-emerald-600"
      />
      <BuildingOne
        xCoord="left-[50.5vw]"
        windowColor="bg-teal-400"
        bottomColor="border-b-gray-500"
      />
      <Tower
        xCoord="left-[58vw]"
        windowColor="bg-stone-900"
        bottomColor="border-b-violet-400"
        borderColor="border-violet-400"
      />{" "}
      <BuildingTwo
        xCoord="left-[37.5vw]"
        windowColor="bg-blue-500"
        bottomColor="border-b-blue-300"
        borderColor="border-blue-500"
      />{" "}
      <BuildingThree
        xCoord="left-[45vw]"
        windowColor="bg-green-400"
        bottomColor="border-b-green-300"
        borderColor="border-green-500"
      />
      <BuildingFour
        xCoord="left-[28vw]"
        windowColor="bg-fuchsia-400"
        bottomColor="border-b-fuchsia-600"
      />
      <Tower
        xCoord="left-[92.5vw]"
        windowColor="bg-gray-800"
        bottomColor="border-b-emerald-300"
        borderColor="border-emerald-300"
      />
      <TowerTwo
        xCoord="left-[75vw]"
        windowColor="bg-gray-800"
        bottomColor="border-blue-300"
        borderColor="bg-blue-300"
      />
      {/* Trees */}
      <TreeBig xCoord="-right-2" />
      <TreeBig xCoord="-left-1" />
      <Tree xCoord="left-[7vw]" />
      <Tree xCoord="left-[64vw]" />
      <TreeBig xCoord="left-[60vw]" />
      <TreeBig xCoord="left-[20vw]" />
      <Tree xCoord="left-[74vw]" />
      <Tree xCoord="left-[80vw]" />
      <Tree xCoord="left-[92vw]" />
      <Tree xCoord="left-[44vw]" />
      <Tree xCoord="left-[30vw]" />
      <Tree xCoord="left-[36vw]" />
      <Tree xCoord="left-[57vw]" />
      <Shrub xCoord="left-[13.5vw]" />
      <Shrub xCoord="left-[89vw]" />
      <Shrub xCoord="left-[83.5vw]" />
      <Shrub xCoord="left-[39.5vw]" />
      <Shrub xCoord="left-[51.5vw]" />
    </Canvas>
  );
};

export default BackgroundShapes;
