"use client";
import React, { useOptimistic } from "react";
import Column from "./Column";
import { dataProps, optimisticArguments } from "@/lib/types";

const Board = ({ tasks }: { tasks: dataProps[] }) => {
  const [optimisticTasks, addOptimisticTasks] = useOptimistic(
    tasks.sort((a, b) => a.order - b.order),
    (state: dataProps[], optimisticState: optimisticArguments) => {
      switch (optimisticState.action) {
        case "changeBoard":
          const newBoard = state
            .map((data) => {
              if (
                optimisticState.data &&
                optimisticState.data.id &&
                optimisticState.newOrder &&
                data.id === optimisticState.data.id
              ) {
                return {
                  ...data,
                  boardName: optimisticState.newBoardName,
                  order: optimisticState.newOrder,
                };
              }

              if (
                optimisticState.data &&
                data.boardName === optimisticState.data.boardName &&
                data.order > optimisticState.data.order
              ) {
                return { ...data, order: --data.order };
              }

              return data;
            })
            .sort((a, b) => a.order - b.order);

          return newBoard;
        case "addTask":
          if (optimisticState.data == undefined) {
            return state;
          }
          return [...state, optimisticState.data];
      }

      return state;
    }
  );
  const filterArray = (item: dataProps, boardName: string) =>
    item.boardName === boardName;
  //Create an array of unique board name to filter it
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
    </div>
  );
};

export default Board;
