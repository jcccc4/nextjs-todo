import { IconX } from "@tabler/icons-react";
import React from "react";
import { deleteAction } from "@/data-access/todoActions";
import { dataProps, optimisticArguments } from "@/lib/types";

function DeleteTodo({
  id,
  order,
  tasks,
  setOptimisticTasks,
}: {
  id: string;
  order: number;
  tasks: dataProps[];
  setOptimisticTasks: (data: optimisticArguments) => void;
}) {
  const deleteTask = async (formData: FormData) => {
    const task = tasks.find((single) => single.id === id);
    console.log(task);
    if (task) {
      const argument = {
        task,
        action: "deleteTask",
      };
      setOptimisticTasks(argument);
      await deleteAction(formData, tasks);
    }
  };

  return (
    <form
      action={(formData: FormData) => deleteTask(formData)}
      className="w-6 h-6"
    >
      <input type="hidden" name="inputId" value={id} />
      <button type="submit">
        <IconX />
      </button>
    </form>
  );
}

export default DeleteTodo;
