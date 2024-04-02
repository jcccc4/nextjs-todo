import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/app/dashboard/_components/Board";
import { getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const tasks = await getData();
  // Revive it on Todo Integration
  // const boards = await getBoard();

  if (session) {
    // if (boards.length === 0 && typeof session.user.email === 'string') {
    //   await createBoard("Unnamed", session.user.email);
    // }
    return <Board tasks={tasks} />;
  }
}

export default Page;
