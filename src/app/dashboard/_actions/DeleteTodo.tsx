import { IconX } from "@tabler/icons-react";
import React from "react";
import { deleteAction } from "@/data-access/todoActions";

type Props = {
  data: { id: number; content: string | null; email: string | null };
  index: number;
};

function DeleteTodo({ data }: Props) {
  return (
    <form action={deleteAction} className="w-6 h-6">
      <input type="hidden" name="inputId" value={data.id} />
      <button type="submit">
        <IconX />
      </button>
    </form>
  );
}

export default DeleteTodo;
