import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/components/Board";
import { getBoard, getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const tasks = await getData(); // remove getBoard and make filter it
  if (session) {
    return <Board tasks={tasks} />;
  }
}

export default Page;
