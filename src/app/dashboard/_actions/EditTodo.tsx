"use client";
import React, { useRef, useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { editAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

function EditTodo({ task }: { task: dataProps }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(task.content || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    formRef?.current?.requestSubmit();
  };

  return (
    <form action={editAction} ref={formRef} className="w-full flex h-6  ">
      <input type="hidden" name="editId" value={task.id} />
      <input
        name="editValue"
        defaultValue={value}
        className="focus:outline-none "
        onChange={handleChange}
      />
      <IconEdit stroke={2} />
    </form>
  );
}

export default EditTodo;
