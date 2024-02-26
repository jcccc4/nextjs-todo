import React from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  return (
    <div>
      <div>Ongoing</div>
      <TodoItem boardName={"Ongoing"} />
      <div>Completed</div>
      <TodoItem boardName={"Completed"} />
    </div>
  );
}

export default TodoList;
