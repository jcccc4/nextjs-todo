import React, { useState, useTransition } from "react";
import Card from "./Card";
import { BoardProps, habit } from "@/lib/types";
import AddTodo from "@/app/dashboard/_actions/AddAction";
import CardModal from "./CardModal";
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
              <Card
                metadata={item}
                filteredTasks={filteredData}
                onClick={onTaskClick}
              />
              <CardModal
                show={isModalVisible}
                onClick={onTaskClick}
                task={item}
                tasks={cards}
                setOptimisticTasks={setOptimisticTasks}
              />
            </div>
          );
        })}
        <Button type="button" onClick={onAddTaskClick}>
          Add Card
        </Button>
        {isHabitModalVisible && (
          <AddTodo
            boardName={boardName}
            setOptimisticTasks={setOptimisticTasks}
            taskLength={filteredData.length}
          />
        )}
      </ul>
    </div>
  );
};

export default Column;
