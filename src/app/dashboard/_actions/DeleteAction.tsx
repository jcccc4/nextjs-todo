import { IconX } from "@tabler/icons-react";
import React from "react";
import { deleteAction } from "@/data-access/todoActions";
import { dataProps, optimisticArguments } from "@/lib/types";
import Button from "@/components/ui/Button";

function DeleteAction({
  task,
  tasks,
  setOptimisticTasks,
}: {
  task: dataProps;
  tasks: dataProps[];
  setOptimisticTasks: (data: optimisticArguments) => void;
}) {
  //add prompt that it is deleted
  const deleteTask = async () => {
    setOptimisticTasks({
      task,
      action: "deleteTask",
    });
    await deleteAction(tasks, task);
  };

  return (
    <form action={deleteTask} className="w-6 h-6">
      <Button type="submit">Delete</Button>
    </form>
  );
}

export default DeleteAction;