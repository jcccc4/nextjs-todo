import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, onClick, type }: Props) => {
  return (
    <button
      type={type}
      className="flex px-6 h-10 items-center border border-black rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
