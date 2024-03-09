import React from "react";
import TodoItem from "./TodoItem";
import { getData } from "@/data-access/todoActions";

async function TodoList() {
  const data = await getData();
  return (
    <div>
      <div>Ongoing</div>
      <TodoItem boardName={"Ongoing"} data={data} />
      <div>Completed</div>
      <TodoItem boardName={"Completed"} data={data} />
    </div>
  );
}

export default TodoList;
