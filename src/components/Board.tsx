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
            state?.map((task) => {
              if (
                task?.id === optimisticState.id &&
                optimisticState.boardName !== task.boardName
              ) {
                const order =
                  state.filter(
                    (state) => state.boardName === optimisticState.boardName
                  ).length + 1;
    
                return { ...task, order, boardName: optimisticState.boardName };
              }
              return task;
            }) || []
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
          filteredData={optimisticTasks.filter((item) =>
            filterArray(item, board.boardName )
          )}
          addOptimisticTasks={addOptimisticTasks}
          boardName={board.boardName || ""}
          cards={optimisticTasks}
        />
      ))} */}
    </div>
  );
};

export default Board;
