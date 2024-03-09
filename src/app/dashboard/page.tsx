import React from "react";
import AddTodo from "./_actions/AddTodo";
import TodoList from "./TodoList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <AddTodo />
        <TodoList />
      </>
    );
  }
}

export default Page;
