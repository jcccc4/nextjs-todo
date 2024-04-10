import { habit, optimisticArguments } from "@/lib/types";
import React, { useRef } from "react";
import DeleteAction from "../_actions/DeleteAction";
import EditTitleAction from "../_actions/EditTitleAction";

const HabitModal = ({
  show,
  onClick,
  task,
  setOptimisticTasks,
  tasks,
}: {
  show: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => void;
  task: habit;
  tasks: habit[];
  setOptimisticTasks: (data: optimisticArguments) => void;
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  if (show) {
    formRef.current?.classList.add("flex");
    formRef.current?.classList.remove("hidden");
  } else {
    formRef.current?.classList.add("hidden");
  }
  return (
    <div
      ref={formRef}
      className="hidden fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.3)] justify-center items-center"
    >
      <section
        className="fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.6)]"
        onClick={onClick}
      ></section>
      <section className="relative  h-5/6 w-full max-w-[768px] bg-white opacity-100 p-4 flex flex-col gap-4">
        {/* <EditTitleAction task={task} /> */}
        <DeleteAction
          task={task}
          tasks={tasks}
          setOptimisticTasks={setOptimisticTasks}
        />
      </section>
    </div>
  );
};

export default HabitModal;
