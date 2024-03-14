"use client";
import React, { useOptimistic } from "react";
import Column from "./Column";
import { board, dataProps, optimisticArguments } from "@/lib/types";

const Board = ({ board, tasks }: { board: board[]; tasks: dataProps[] }) => {
  const [optimisticTasks, addOptimisticTasks] = useOptimistic(
    tasks,
    (state: dataProps[], optimisticState: optimisticArguments) => {
      switch (optimisticState.action) {
        case "changeBoard":
          return (
            state?.map((task) =>
              task?.id === optimisticState.id
                ? { ...task, boardName: optimisticState.boardName }
                : task
            ) || []
          );
        case "addTask":
          if (optimisticState.task == undefined) {
            return state;
          }
          return [...state, optimisticState.task];
      }

      return state;
    }
  );
  const filterArray = (item: dataProps, boardName: string) =>
    item.boardName === boardName;

  return (
    <div className="ml-4 flex gap-4">
      <Column
        filteredData={optimisticTasks.filter((item) =>
          filterArray(item, "Ongoing")
        )}
        addOptimisticTasks={addOptimisticTasks}
        boardName={"Ongoing"}
        cards={optimisticTasks}
      />
      <Column
        filteredData={optimisticTasks.filter((item) =>
          filterArray(item, "Completed")
        )}
        addOptimisticTasks={addOptimisticTasks}
        boardName={"Completed"}
        cards={optimisticTasks}
      />
      {/* {board.map((board: board) => (
        <Column
          filteredData={cards.filter((item) => filterArray(item, "done"))}
          setCards={setCards}
          boardName={board.boardName}
          cards={cards}
        />
      ))} */}
    </div>
  );
};

export default Board;
