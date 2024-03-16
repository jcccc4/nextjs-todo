import React from "react";
import Card from "./Card";
import { dataProps, optimisticArguments } from "@/lib/types";
import { changeBoard } from "@/data-access/todoActions";
import AddTodo from "@/app/dashboard/_actions/AddTodo";
type Props = {
  filteredData: dataProps[];
  addOptimisticTasks: (data: optimisticArguments) => void;
  boardName: string;
  cards: dataProps[];
};
const Column = ({ filteredData, addOptimisticTasks, boardName,cards }: Props) => {
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).classList.add("border-red-500");

    e.preventDefault();
  };
  const onDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    boardName: string
  ) => {
    (e.currentTarget as HTMLDivElement).classList.remove("border-red-500");
    console.log(filteredData);
    let id = e.dataTransfer.getData("id");
    const order = filteredData.length + 1;
    const isBoardSame =cards.some((item) =>item.id=== id&& item.boardName === boardName);
    if(!isBoardSame){
    addOptimisticTasks({
      id,
      boardName,
      action: "changeBoard",
      order,
    });

    await changeBoard(id, boardName, order);}
  };

  return (
    <div
      className="w-64 h-96 border border-blue-700"
      onDragOver={onDragOver}
      onDragLeave={(e) =>
        (e.currentTarget as HTMLDivElement).classList.remove("border-red-500")
      }
      onDrop={(e) => onDrop(e, boardName || "")}
    >
      <h2 className="mx-1 my-2">{boardName}</h2>
      <ul
        className="flex flex-col gap-2"
        key={`${boardName}-${filteredData.length}`}
      >
        {filteredData
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map((item: dataProps) => (
            <Card description={item.content} id={item.id} key={item.id} />
          ))}
        <AddTodo
          boardName={boardName}
          addOptimisticTasks={addOptimisticTasks}
          taskLength={filteredData.length}
        />
      </ul>
    </div>
  );
};

export default Column;
