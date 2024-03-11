import React from "react";
import TodoItem from "./TodoItem";
import { getData } from "@/data-access/todoActions";

async function TodoList() {
  const data = await getData();
  return (
    <div className="w-full border border-blue-400">
      <div>Ongoing</div>
      <TodoItem boardName={"Ongoing"} data={data} />
    </div>
  );
}

export default TodoList;
