import React from "react";
import AddTodo from "./_actions/AddTodo";
import TodoList from "./TodoList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Card from "@/components/Card";

async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div >
        <AddTodo />
        <div className="flex gap-4 border border-blue-800">
          <Card number={1}/>
          <Card number={2}/>
          <Card number={3}/>
          <Card number={4}/>
        </div>
        {/* <TodoList /> */}
      </div>
    );
  }
}

export default Page;
