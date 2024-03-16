import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/components/Board";
import { createBoard, getBoard, getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getBoard();
  // if (data.length === 0) {
  //   await createBoard("Ongoing", session?.user.email || "");
  //   await createBoard("Completed", session?.user.email || "");
  // }
  const tasks = await getData();
  if (session) {
    return <Board board={data} tasks={tasks} />;
  }
}

export default Page;
