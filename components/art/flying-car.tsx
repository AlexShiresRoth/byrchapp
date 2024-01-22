const FlyingCar = () => {
  return (
    <span className="absolute bottom-[10%] z-10 flex h-4 w-14 animate-move rounded-b-sm rounded-t-lg  bg-indigo-500">
      <span className="absolute flex h-3 w-12 -translate-y-2 translate-x-1 justify-center rounded-tl-full rounded-tr-full bg-indigo-400">
        <span className="h-full w-1 bg-indigo-300"></span>
      </span>
      <span className="absolute top-2 h-[2px] w-full bg-indigo-400"></span>
      {/* <span className="absolute -right-1 bottom-1 z-10 block h-1 w-1 bg-yellow-200"></span> */}
    </span>
  );
};

export const FlyingCar2 = () => {
  return (
    <span className="absolute bottom-[20vh] left-0 z-10 flex h-4 w-14 animate-move rounded-b-sm  rounded-t-lg bg-red-500">
      <span className="absolute flex h-3 w-12 -translate-y-2 translate-x-1 justify-center rounded-tl-full rounded-tr-full bg-red-400">
        <span className="h-full w-1 bg-red-300"></span>
      </span>
      <span className="absolute top-2 h-[2px] w-full bg-red-400"></span>
      {/* <span className="absolute -right-1 bottom-1 z-10 block h-1 w-1 bg-yellow-200"></span> */}
    </span>
  );
};

export default FlyingCar;
