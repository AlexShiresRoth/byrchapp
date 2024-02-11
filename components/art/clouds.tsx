export const CloudSmall = () => {
  return (
    <div className="absolute bottom-[60vh] left-4 -z-10 block animate-cloud opacity-80">
      <div className="relative flex  justify-center">
        <span className="absolute -bottom-10 left-6 h-16 w-16 rounded-full bg-slate-100" />
        <span className="absolute bottom-0 left-0 top-0 h-12 w-28 rounded-full bg-slate-100" />
      </div>
    </div>
  );
};

export const CloudMedium = () => {
  return (
    <div className="absolute bottom-[50vh] left-4 -z-10 block animate-cloud2 opacity-80">
      <div className="relative flex  justify-center">
        <span className="absolute -bottom-10 left-8 h-20 w-20 rounded-full bg-slate-100" />
        <span className="absolute bottom-0 left-0 top-0 h-16 w-36 rounded-full bg-slate-100" />
      </div>
    </div>
  );
};

export const Cloud = () => {
  return (
    <div className="absolute bottom-[70vh] left-4 -z-10 block animate-cloud3 opacity-80">
      <div className="relative flex  justify-center">
        <span className="absolute -bottom-10 left-7 h-16 w-14 rounded-full bg-slate-100" />
        <span className="absolute bottom-0 left-0 top-0 h-16 w-28 rounded-full bg-slate-100" />
      </div>
    </div>
  );
};
