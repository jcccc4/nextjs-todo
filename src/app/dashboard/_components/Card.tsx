import React from "react";
import DeleteTodo from "../_actions/DeleteTodo";
import { dataProps, optimisticArguments } from "@/lib/types";

const Card = ({
  metadata,
  filteredTasks,
  setOptimisticTasks
}: {
  metadata: {
    content: string | null;
    id: string;
    order: number;
    board: string;
  };
  filteredTasks: dataProps[];
  setOptimisticTasks:(data: optimisticArguments) => void
}) => {
  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(metadata.id));
    event.dataTransfer.setData("order", String(metadata.order));
    event.dataTransfer.setData("boardName", String(metadata.board));
  };

  return (
    <li
      className="mx-2 px-2 border border-black flex justify-between"
      draggable="true"
      onDragStart={onDragStart}
    >
      <div>{metadata.content}</div>
      <DeleteTodo id={metadata.id} order={metadata.order} tasks={filteredTasks} setOptimisticTasks={setOptimisticTasks} />
    </li>
  );
};

export default Card;
