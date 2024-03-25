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
          const remainingData = state.filter(
            (data) => data.boardName !== optimisticState.boardName
          );
          const mappingData = state
            .filter((data) => data.boardName === optimisticState.boardName)
            .sort((a, b) => a.order - b.order)
            .map((data, index) => {
              if (optimisticState.formerOrder !== undefined) {
                return { ...data, order: optimisticState.formerOrder + index };
              }
              return data;
            });
          console.log([...remainingData, ...mappingData]);
          return [...remainingData, ...mappingData];
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
  //Create an array of unique board names
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
