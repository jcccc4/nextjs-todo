import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/app/dashboard/_components/Board";
import { getBoard, getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const tasks = await getData();
  const boards = await getBoard();
  if (session) {
    return <Board tasks={tasks} boards={boards}/>;
  }
}

export default Page;
