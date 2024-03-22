"use client";
import React, { useOptimistic } from "react";
import Column from "./Column";
import { dataProps, optimisticArguments } from "@/lib/types";

const Board = ({ tasks }: { tasks: dataProps[] }) => {
  const [optimisticTasks, addOptimisticTasks] = useOptimistic(
    tasks,
    (state: dataProps[], optimisticState: optimisticArguments) => {
      switch (optimisticState.action) {
        case "changeBoard":
          return (
            state
              ?.sort((item, comparator) => item.order - comparator.order)
              .map((task, index) => {
                if (
                  optimisticState?.order !== undefined &&
                  optimisticState?.order >= task.order &&
                  optimisticState.boardName === task.boardName
                ) {
                  return {
                    ...task,
                    order: index + 1,
                    boardName: optimisticState.boardName,
                  };
                }

                if (
                  task?.id === optimisticState.id &&
                  optimisticState.boardName !== task.boardName
                ) {
                  const order =
                    state.filter(
                      (state) => state.boardName === optimisticState.boardName
                    ).length + 1;

                  return {
                    ...task,
                    order,
                    boardName: optimisticState.boardName,
                  };
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
      //Create an array of unique board names
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
