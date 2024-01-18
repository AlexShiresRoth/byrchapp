import React from "react";

type Props = {
  children: React.ReactNode;
};

const H1 = ({ children }: Props) => {
  return <h1 className="text-8xl font-extrabold text-black">{children}</h1>;
};

export default H1;
