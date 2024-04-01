"use client";
import React, { useRef, useState } from "react";
import { editTitleAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

function EditTitleAction({ task }: { task: dataProps }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(task.title.trim());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "value");
    setValue(e.target.value);
    formRef?.current?.requestSubmit();
  };

  return (
    <form action={editTitleAction} ref={formRef} className="w-full flex h-6  ">
      <input type="hidden" name="editId" value={task.id} />
      <h1 className="font-bold text-lg">
        <input
          name="editValue"
          defaultValue={value}
          className="focus:outline-none "
          onChange={handleChange}
        />
      </h1>
    </form>
  );
}

export default EditTitleAction;
