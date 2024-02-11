import React from "react";

type Props = {
  children: React.ReactNode;
};

const H1 = ({ children }: Props) => {
  return (
    <h1 className="text-4xl font-extrabold text-black md:text-6xl">
      {children}
    </h1>
  );
};

export default H1;
