import React from "react";
import AddTodo from "./_actions/AddTodo";
import TodoList from "./TodoList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/components/Board";
import { getBoard, getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getBoard();
  const tasks = await getData();
  if (session) {
    return (
      <div>
        <AddTodo />
        <Board board={data} tasks={tasks} />
        {/* <TodoList /> */}
      </div>
    );
  }
}

export default Page;
