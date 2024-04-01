"use client";
import React, { useRef, useState } from "react";
import { editContentAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

function EditContentAction({ task }: { task: dataProps }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(task.description.trim());
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    formRef?.current?.requestSubmit();
  };

  return (
    <form
      action={editContentAction}
      ref={formRef}
      className="w-full flex h-6  "
    >
      <input type="hidden" name="editId" value={task.id} />
      <textarea
        name="editValue"
        defaultValue={value}
        className="focus:outline-none "
        onChange={handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        placeholder={isFocused ? "" : "Description"}
      />
    </form>
  );
}

export default EditContentAction;
