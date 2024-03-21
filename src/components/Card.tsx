import React from "react";

const Card = ({
  description,
  id,
  order,
  board,
}: {
  description: string | null;
  id: string;
  order: number;
  board:string;
}) => {
  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(id));
    event.dataTransfer.setData("order", String(order));
    event.dataTransfer.setData("boardName", String(board));
  };

  return (
    <li
      className="mx-2 px-2 border border-black"
      draggable="true"
      onDragStart={onDragStart}
    >
      {description}
    </li>
  );
};

export default Card;
