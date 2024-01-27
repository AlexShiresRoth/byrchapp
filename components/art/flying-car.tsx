const FlyingCar = () => {
  return (
    <span className="absolute bottom-[10%] z-10 flex h-4 w-16 animate-move rounded-b-md rounded-t-lg  bg-indigo-500">
      <span className="absolute -top-[100%] flex h-4 w-8 translate-x-1/2 justify-center rounded-t-full border-b-4 border-t-4 border-white border-b-indigo-600 bg-indigo-400"></span>
      <span className="absolute top-2 h-[1.5px] w-full bg-indigo-400"></span>
      {/* <span className="absolute -right-1 bottom-1 z-10 block h-1 w-1 bg-yellow-200"></span> */}
    </span>
  );
};

export const FlyingCar2 = () => {
  return (
    <span className="absolute bottom-[20vh] left-0 z-10 flex h-4 w-14 animate-move2 rounded-b-sm  rounded-t-lg bg-red-500">
      <span className="absolute flex h-3 w-12 -translate-y-2 translate-x-1 justify-center rounded-tl-full rounded-tr-full bg-red-400">
        <span className="h-full w-1 bg-red-300"></span>
      </span>
      <span className="absolute top-2 h-[2px] w-full bg-red-400"></span>
      {/* <span className="absolute -right-1 bottom-1 z-10 block h-1 w-1 bg-yellow-200"></span> */}
    </span>
  );
};
export const FlyingCar3 = () => {
  return (
    <span className="absolute  bottom-[40vh] z-10 flex  animate-move3 flex-col items-center">
      <span className="flex h-4 w-8 justify-center rounded-tl-full rounded-tr-full bg-slate-300"></span>
      <span className="flex h-4 w-14  items-center justify-between rounded-md rounded-t-lg bg-emerald-500 px-1">
        <div className="flex items-center gap-1">
          <span className="roudned-full h-1 w-1 bg-emerald-300"></span>
          <span className="roudned-full h-1 w-1 bg-emerald-300"></span>
          <span className="roudned-full h-1 w-1 bg-emerald-300"></span>
        </div>
      </span>
      {/* <span className="absolute -right-1 bottom-1 z-10 block h-1 w-1 bg-yellow-200"></span> */}
    </span>
  );
};

export default FlyingCar;
