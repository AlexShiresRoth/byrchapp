const FlyingCar = () => {
  return (
    <span className="absolute bottom-[10%] z-10 flex h-4 w-16 animate-move rounded-b-md rounded-t-lg  bg-indigo-500">
      <span className="absolute -top-[100%] flex h-4 w-8 translate-x-1/2 justify-center rounded-t-full border-b-4 border-t-4 border-white border-b-indigo-600 bg-indigo-400"></span>
      <div className="flex items-center justify-end gap-1 px-1">
        <span className="roudned-full h-1 w-1 bg-indigo-300"></span>
        <span className="roudned-full h-1 w-1 bg-indigo-300"></span>
        <span className="roudned-full h-1 w-1 bg-indigo-300"></span>
      </div>
    </span>
  );
};

export const FlyingCar2 = () => {
  return (
    <span className="absolute  bottom-[20vh] z-10 flex  animate-move2 flex-col items-center">
      <span className="flex h-4 w-8 justify-center rounded-tl-full rounded-tr-full border-t-2 border-t-slate-200 bg-slate-300"></span>
      <span className="flex h-4 w-14  items-center justify-between rounded-md rounded-t-lg bg-red-500 px-1">
        <div className="flex items-center justify-center gap-1">
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
          <span className="roudned-full h-1 w-1 bg-red-300"></span>
        </div>
      </span>
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
    </span>
  );
};

export default FlyingCar;
