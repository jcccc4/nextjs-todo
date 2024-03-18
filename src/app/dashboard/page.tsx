import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/components/Board";
import { getBoard, getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getBoard();
  const tasks = await getData();
  if (session) {
    return <Board board={data} tasks={tasks} />;
  }
}

export default Page;
