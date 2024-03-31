import { dataProps, optimisticArguments } from "@/lib/types";
import React, { useRef } from "react";
import DeleteAction from "../_actions/DeleteAction";
import EditTitlteAction from "../_actions/EditTitleAction";
import EditTitleAction from "../_actions/EditTitleAction";
import EditContentAction from "../_actions/EditContentAction";

const CardModal = ({
  show,
  onClick,
  task,
  setOptimisticTasks,
  tasks,
}: {
  show: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => void;
  task: dataProps;
  tasks: dataProps[];
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
      className="hidden fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.6)] justify-center items-center"
    >
      <section
        className="fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.6)]"
        onClick={onClick}
      ></section>
        <section className="relative  h-5/6 w-full max-w-[768px] bg-white opacity-100 ">
          <EditTitleAction task={task} />
          <EditContentAction task={task} />
        <DeleteAction
          task={task}
          tasks={tasks}
          setOptimisticTasks={setOptimisticTasks}
        />
      </section>
    </div>
  );
};

export default CardModal;
