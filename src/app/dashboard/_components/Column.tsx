import React, { useTransition } from "react";
import Card from "./Card";
import { BoardProps, dataProps, optimisticArguments } from "@/lib/types";
import { changeBoard } from "@/data-access/todoActions";
import AddTodo from "@/app/dashboard/_actions/AddTodo";

const Column = ({
  filteredData,
  setOptimisticTasks,
  boardName,
  cards,
}: BoardProps) => {
  const [_, startTransition] = useTransition();
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).classList.add("border-red-500");

    e.preventDefault();
  };
  const onDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    boardName: string
  ) => {
    (e.currentTarget as HTMLDivElement).classList.remove("border-red-500");
    const id = e.dataTransfer.getData("id");
    const task = cards.find((item) => item.id === id);
    const newOrder = filteredData.length + 1;
    const datas = {
      task,
      newBoardName: boardName,
      newOrder,
      cards,
    };
    const isBoardSame = cards.some(
      (item) => item.id === id && item.boardName === boardName
    );
    if (!isBoardSame && task) {
      startTransition(() =>
      setOptimisticTasks({
          task,
          newBoardName: boardName,
          newOrder,
          action: "changeBoard",
        })
      );

      await changeBoard(datas);
    }
  };

  return (
    <div
      className="w-64 h-96 border border-blue-700"
      draggable="true"
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
        {filteredData.map((item: dataProps) => {
          const metadata = {
            content: item.content,
            id: item.id,
            order: item.order,
            board: boardName,
          };
          return (
            <Card
              key={item.id}
              metadata={metadata}
              setOptimisticTasks={setOptimisticTasks}
              filteredTasks={filteredData}
            />
          );
        })}
        <AddTodo
          boardName={boardName}
          setOptimisticTasks={setOptimisticTasks}
          taskLength={filteredData.length}
        />
      </ul>
    </div>
  );
};

export default Column;
