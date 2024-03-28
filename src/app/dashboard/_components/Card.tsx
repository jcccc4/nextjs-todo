import React, { useState } from "react";
import DeleteTodo from "../_actions/DeleteTodo";
import { dataProps, optimisticArguments } from "@/lib/types";
import EditTodo from "../_actions/EditTodo";
import { IconEdit } from "@tabler/icons-react";
import CardModal from "./CardModal";

const Card = ({
  metadata,
  filteredTasks,
  setOptimisticTasks,
}: {
  metadata: dataProps;
  filteredTasks: dataProps[];
  setOptimisticTasks: (data: optimisticArguments) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("id", String(metadata.id));
    event.dataTransfer.setData("order", String(metadata.order));
    event.dataTransfer.setData("boardName", String(metadata.boardName));
  };
  const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <li
      className="mx-2 px-2 border border-black flex justify-between"
      draggable="true"
      onClick={onClick}
      onDragStart={onDragStart}
    >
      {metadata.content}
      {/* <EditTodo task={metadata} /> */}
      <CardModal show={isModalVisible} />
      <IconEdit stroke={2} />
      {/* <DeleteTodo
          id={metadata.id}
          tasks={filteredTasks}
          setOptimisticTasks={setOptimisticTasks}
        /> */}
    </li>
  );
};

export default Card;
