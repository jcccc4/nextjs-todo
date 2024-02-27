import { dataProps } from "@/lib/types";
import React from "react";
import TodoStatus from "./_actions/TodoStatus";
import EditTodo from "./_actions/EditTodo";
import DeleteTodo from "./_actions/DeleteTodo";

function TodoItem({
  boardName,
  data,
}: {
  boardName: string;
  data: dataProps[] | undefined;
}) {
  return (
    <ul className="max-w-sm mx-auto flex flex-col gap-4">
      {data
        ?.filter((item) => item.boardName === boardName)
        .map((data: dataProps, index: number) => (
          <li
            key={data.id}
            className="w-full h-10 px-4 flex items-center justify-between border-4 border-sky-500"
          >
            <div className="flex items-center justify-between">
              <TodoStatus data={data} />
              <EditTodo data={data} />
            </div>
            <DeleteTodo data={data} index={index} />
          </li>
        ))}
    </ul>
  );
}

export default TodoItem;
