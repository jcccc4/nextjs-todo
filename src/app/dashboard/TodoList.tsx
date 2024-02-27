"use client";
import React from "react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/data-access/todoActions";

function TodoList() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getData });
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
