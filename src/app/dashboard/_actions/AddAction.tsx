"use client";
import { HabitFrequency } from "@prisma/client";
import { createAction } from "@/data-access/todoActions";
import { addTodoProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

function AddAction({
  boardName,
  setOptimisticTasks,
  taskLength,
}: addTodoProps) {
  const { data: session } = useSession();
  const createTask = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const title = formData.get("input") as string;
    const email = formData.get("email") as string;
    const order = taskLength + 1;
    const task = {
      id,
      order,
      title,
      frequency: HabitFrequency.DAILY,
      email,
    };
    setOptimisticTasks({
      action: "addTask",
      task,
    });

    await createAction(task);
  };
  return (
    <form action={createTask} className=" mx-2">
      <input name="boardName" type="hidden" value={boardName} />
      <input name="id" type="hidden" value={uuidv4()} />
      <input name="email" type="hidden" value={session?.user.email || ""} />
      <input name="email" type="hidden" value={session?.user.email || ""} />
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

export default AddAction;
