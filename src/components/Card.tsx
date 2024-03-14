import React from "react";

const Card = ({
  description,
  id,
}: {
  description: string | null;
  id: string;
}) => {
  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(id));
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
