import React from "react";
import { habit } from "@/lib/types";

const Card = ({
  metadata,
  onClick,
}: {
  metadata: habit;
  filteredTasks: habit[];
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  // const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
  //   event.dataTransfer.setData("id", String(metadata.id));
  //   event.dataTransfer.setData("order", String(metadata.order));

  // };

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

export default Card;
