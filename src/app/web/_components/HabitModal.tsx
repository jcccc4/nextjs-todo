import React, { useRef } from "react";

const HabitModal = ({
  show,
  handleClick,
}: {
  show: boolean;
  handleClick: () => void;
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  if (show) {
    formRef.current?.classList.remove("hidden");
    formRef.current?.classList.add("flex");
  } else {
    formRef.current?.classList.add("hidden");
  }
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex justify-center items-center"
      }
    >
      <div
        ref={formRef}
        className={" bg-zinc-950/80 w-full h-full "}
        onClick={handleClick}
      ></div>
      <div className="fixed m-auto  bg-white w-[600px] h-[500px] z-10">
        qwer
      </div>
    </div>
  );
};

export default HabitModal;
