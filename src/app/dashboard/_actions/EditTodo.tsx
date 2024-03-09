"use client";
import React, { useEffect, useRef, useState } from "react";
import { editAction } from "@/data-access/todoActions";
import { Props } from "@/lib/types";

function EditTodo({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(data.content || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    formRef?.current?.requestSubmit();
  };

  return (
    <form action={editAction} ref={formRef} className="w-6 h-6">
      <input type="hidden" name="editId" value={data.id} />
      <input
        name="editValue"
        defaultValue={value}
        className="focus:outline-none "
        onChange={handleChange}
      />
    </form>
  );
}

export default EditTodo;
