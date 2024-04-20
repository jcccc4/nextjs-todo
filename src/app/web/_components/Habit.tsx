import React from "react";
import { habit } from "@/lib/types";

const Habit = ({
  metadata,
  onClick,
}: {
  metadata: habit;
  filteredTasks: habit[];
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  return (
    <li
      className="mx-2 px-2 border border-black flex justify-between"
      draggable="true"
      onClick={onClick}
    >
      {metadata.title}
    </li>
  );
};

export default Habit;
