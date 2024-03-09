"use client";
import React, { useRef, useState } from "react";
import { statusAction } from "@/data-access/todoActions";
import { dataProps } from "@/lib/types";

type Props = {
  data: dataProps;
};

function TodoStatus({ data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(data.isCompleted);

  return (
    <form
      action={statusAction}
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
