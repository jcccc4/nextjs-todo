"use client";

import { createAction } from "@/data-access/todoActions";
import { addTodoProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

function AddTodo({ boardName, addOptimisticTasks, taskLength }: addTodoProps) {
  const { data: session } = useSession();
  const createTask = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const content = formData.get("input") as string;
    const boardName = formData.get("boardName") as string;
    const email = session?.user.email || "";
    const order = taskLength + 1;
    addOptimisticTasks({
      boardName: boardName,
      action: "addTask",
      task: {
        id: id,
        order,
        content,
        email: email,
        boardName,
      },
    });
    await createAction(formData, { email, order });
  };
  return (
    <form action={createTask} className=" mx-2">
      <input name="boardName" type="hidden" value={boardName} />
      <input name="id" type="hidden" value={uuidv4()} />
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
