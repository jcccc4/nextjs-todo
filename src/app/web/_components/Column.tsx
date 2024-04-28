import React, { useState, useTransition } from "react";
import Habit from "./Habit";
import { BoardProps, habit } from "@/lib/types";
import AddTodo from "@/app/web/_actions/AddAction";
import HabitModal from "./HabitModal";
import { Button } from "@/components/ui/Button";

const Column = ({
  filteredData,
  setOptimisticTasks,
  boardName,
  cards,
}: BoardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHabitModalVisible, setIsHabitModalVisible] = useState(false);

  const onTaskClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onAddTaskClick = () => {
    setIsHabitModalVisible(!isHabitModalVisible);
  };

  return (
    <div
      className="w-64 h-96 border border-blue-700"
      draggable="true"
      onDragLeave={(e) =>
        (e.currentTarget as HTMLDivElement).classList.remove("border-red-500")
      }
    >
      <h2 className="mx-1 my-2">{boardName}</h2>
      <ul
        className="flex flex-col gap-2"
        key={`${boardName}-${filteredData.length}`}
      >
        {filteredData.map((item: habit, index: number) => {
          return (
            <div key={`${item.id}${index}`}>
              <Habit
                metadata={item}
                filteredTasks={filteredData}
                onClick={onTaskClick}
              />
            </div>
          );
        })}
        <Button type="button" onClick={onAddTaskClick}>
          Add Card
        </Button>
        {isHabitModalVisible && (
          <div className="fixed top-0 left-0 bg-stone-500/60 h-full w-full flex justify-center items-center">
            <AddTodo
              boardName={boardName}
              setOptimisticTasks={setOptimisticTasks}
              taskLength={filteredData.length}
              setIsHabitModalVisible={setIsHabitModalVisible}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Column;
