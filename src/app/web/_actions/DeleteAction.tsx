import React from "react";
import { deleteAction } from "@/data-access/todoActions";
import { habit, optimisticArguments } from "@/lib/types";
import { Button } from "@/components/ui/Button";

function DeleteAction({
  task,
  tasks,
  setOptimisticTasks,
}: {
  task: habit;
  tasks: habit[];
  setOptimisticTasks: (data: optimisticArguments) => void;
}) {
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
