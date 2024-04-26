import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/app/web/_components/Board";
import { getData } from "@/data-access/todoActions";

async function Page() {
 const tasks = await getData();

  // return <Board tasks={tasks} />;
  return<div>
    <h1>Habit</h1>
  </div>
}

export default Page;
