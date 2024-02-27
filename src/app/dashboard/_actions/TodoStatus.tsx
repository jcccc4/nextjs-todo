"use client";
import React, { useRef, useState } from "react";
import { statusAction } from "@/data-access/todoActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataProps } from "@/lib/types";

type Props = {
  data: dataProps;
};

function TodoStatus({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(data.isCompleted);

  const editTodoMutation = useMutation({
    mutationFn: statusAction,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const id = newTodo.get("editId") as string;
      queryClient.setQueryData(["posts"], (old: dataProps[]) => {
        let word = "";
        let test = old.filter((item: dataProps) => {
          if (item.id === Number(id)) {
            word = item.content || "";
          }
          return item.id !== Number(id);
        });
        console.log(test);
        return [
          ...test,
          {
            content: word,
            isCompleted: isChecked,
            boardName: isChecked ? "Completed" : "Ongoing",
          },
        ];
      });
    },
  });

  return (
    <form
      action={(formData) => editTodoMutation.mutate(formData)}
      ref={formRef}
      className="w-6 h-6"
    >
      <input type="hidden" name="editId" value={data.id} />
      <input
        name="editValue"
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          formRef.current?.requestSubmit();
        }}
      />
    </form>
  );
}

export default TodoStatus;
