import React from "react";
import { dataProps } from "@/lib/types";

const Card = ({
  metadata,
  onClick,
}: {
  metadata: dataProps;
  filteredTasks: dataProps[];
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(metadata.id));
    event.dataTransfer.setData("order", String(metadata.order));
    event.dataTransfer.setData("boardName", String(metadata.boardName));
  };

  return (
    <li
      className="mx-2 px-2 border border-black flex justify-between"
      draggable="true"
      onClick={onClick}
      onDragStart={onDragStart}
    >
      {metadata.title}
    </li>
  );
};

export default Card;
