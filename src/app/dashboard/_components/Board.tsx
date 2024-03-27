"use client";
import React, { useOptimistic } from "react";
import Column from "./Column";
import { dataProps, optimisticArguments } from "@/lib/types";
import {
  optimisticAddTask,
  optimisticDeleteTask,
  optimisticChangeBoard,
} from "@/app/dashboard/_actions/_optimisticActions/optimisticActions";

const Board = ({
  tasks,
  boards,
}: {
  tasks: dataProps[];
  boards: {
    id: string;
    boardName: string;
    email: string | null;
  }[];
}) => {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks.sort((a, b) => a.order - b.order),
    (state: dataProps[], optimisticState: optimisticArguments) => {
      switch (optimisticState.action) {
        case "changeBoard":
          return optimisticChangeBoard(state, optimisticState);
        case "addTask":
          return optimisticAddTask(state, optimisticState);
        case "deleteTask":
          return optimisticDeleteTask(state, optimisticState);
      }
      return state;
    }
  );

  const filterArray = (item: dataProps, boardName: string) =>
    item.boardName === boardName;

  return (
    <div className="ml-4 flex gap-4">
      {boards.map((board, index) => (
        <Column
          key={`${board}${index}`}
          filteredData={optimisticTasks.filter((item) =>
            filterArray(item, board.boardName)
          )}
          setOptimisticTasks={setOptimisticTasks}
          boardName={board.boardName}
          cards={optimisticTasks}
        />
      ))}
    </div>
  );
};

export default Board;
