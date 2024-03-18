import React from "react";

const Card = ({
  description,
  id,
  order,
}: {
  description: string | null;
  id: string;
  order: number;
}) => {
  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(id));
    event.dataTransfer.setData("order", String(order));
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
