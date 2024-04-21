"use client";
import React, { useOptimistic } from "react";
import Column from "./Column";
import { habit, optimisticArguments } from "@/lib/types";
import {
  optimisticAddTask,
  optimisticDeleteTask,
} from "@/app/web/_actions/_optimisticActions/optimisticActions";

const Board = ({ tasks }: { tasks: habit[] }) => {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks.sort((a, b) => a.order - b.order),
    (state: habit[], optimisticState: optimisticArguments) => {
      switch (optimisticState.action) {
        case "addTask":
          return optimisticAddTask(state, optimisticState);
        case "deleteTask":
          return optimisticDeleteTask(state, optimisticState);
      }
      return state;
    }
  );

  return (
    <div className="ml-4 flex gap-4">
      <Column
        key={`HabitBoard`}
        filteredData={optimisticTasks}
        setOptimisticTasks={setOptimisticTasks}
        boardName={"Habits"}
        cards={optimisticTasks}
      />
    </div>
  );
};

export default Board;
