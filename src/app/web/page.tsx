import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Board from "@/app/web/_components/Board";
import { getData } from "@/data-access/todoActions";

async function Page() {
  const session = await getServerSession(authOptions);
  const tasks = await getData();

  if (session) {
    return <Board tasks={tasks} />;
  }
}

export default Page;