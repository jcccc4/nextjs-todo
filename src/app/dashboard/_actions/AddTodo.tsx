"use client";

import { createAction } from "@/data-access/todoActions";
import { optimisticArguments } from "@/lib/types";

function AddTodo({
  boardName,
  addOptimisticTasks,
}: {
  boardName: string;
  addOptimisticTasks: (data: optimisticArguments) => void;
}) {
  const createTask = async (formData: FormData) => {
    const content = formData.get("input") as string;
    const boardName = formData.get("boardName") as string;

    addOptimisticTasks({
      boardName: boardName,
      action: "addTask",
      task: {
        id: Number(),
        content,
        email: "",
        isCompleted: false,
        boardName,
      },
    });
    await createAction(formData);
  };
  return (
    <form action={createTask} className=" mx-2">
      <input name="boardName" type="hidden" value={boardName} />
      <input
        id="createTask"
        name="input"
        type="text"
        className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Add Task"
      />
    </form>
  );
}

export default AddTodo;
